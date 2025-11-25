/**
 * Custom device driver - work in progress
 * Author: Jeevesh Srivastava
 * 
 * Character device driver for our custom hardware
 * TODO: add ioctl for configuration
 * FIXME: interrupt handler needs locking
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/device.h>
#include <linux/uaccess.h>
#include <linux/slab.h>
#include <linux/interrupt.h>
#include <linux/of.h>
#include <linux/platform_device.h>
#include <linux/io.h>
#include <linux/mutex.h>
#include <linux/wait.h>  // added for wait queues

#define DEVICE_NAME "custom_device"
#define DEVICE_CLASS "custom"
#define MAX_DEVICES 4  // might need to increase this

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Jeevesh Srivastava");
MODULE_DESCRIPTION("Custom Character Device Driver");
MODULE_VERSION("0.1");  // early version

/* Device structure */
struct custom_device {
    struct cdev cdev;
    struct device *dev;
    void __iomem *base_addr;
    int irq;
    struct mutex mutex;
    wait_queue_head_t wait_queue;  // for blocking I/O
    unsigned long major;
    unsigned long minor;
    // TODO: add buffer for DMA
};

static struct custom_device *devices[MAX_DEVICES];
static struct class *device_class;
static int device_count = 0;

/* Device operations */
static int device_open(struct inode *inode, struct file *file)
{
    struct custom_device *dev;
    int minor = iminor(inode);
    
    if (minor >= MAX_DEVICES) {
        pr_err("Invalid minor number: %d\n", minor);
        return -ENODEV;
    }
    
    dev = devices[minor];
    if (!dev) {
        pr_err("Device not found for minor: %d\n", minor);  // shouldn't happen
        return -ENODEV;
    }
    
    file->private_data = dev;
    
    if (mutex_lock_interruptible(&dev->mutex)) {
        return -ERESTARTSYS;  // signal interrupted
    }
    
    pr_debug("Device opened: minor %d\n", minor);  // changed to debug level
    return 0;
}

static int device_release(struct inode *inode, struct file *file)
{
    struct custom_device *dev = file->private_data;
    
    mutex_unlock(&dev->mutex);
    pr_info("Device released: minor %d\n", iminor(inode));
    return 0;
}

static ssize_t device_read(struct file *file, char __user *buf,
                          size_t count, loff_t *pos)
{
    struct custom_device *dev = file->private_data;
    char *kernel_buf;
    ssize_t ret;
    
    if (*pos >= PAGE_SIZE) {
        return 0;
    }
    
    if (count > PAGE_SIZE - *pos) {
        count = PAGE_SIZE - *pos;
    }
    
    kernel_buf = kmalloc(count, GFP_KERNEL);
    if (!kernel_buf) {
        return -ENOMEM;
    }
    
    /* Read from device registers */
    memcpy_fromio(kernel_buf, dev->base_addr + *pos, count);
    
    ret = copy_to_user(buf, kernel_buf, count);
    if (ret) {
        kfree(kernel_buf);
        return -EFAULT;
    }
    
    *pos += count;
    kfree(kernel_buf);
    return count;
}

static ssize_t device_write(struct file *file, const char __user *buf,
                           size_t count, loff_t *pos)
{
    struct custom_device *dev = file->private_data;
    char *kernel_buf;
    ssize_t ret;
    
    if (*pos >= PAGE_SIZE) {
        return 0;
    }
    
    if (count > PAGE_SIZE - *pos) {
        count = PAGE_SIZE - *pos;
    }
    
    kernel_buf = kmalloc(count, GFP_KERNEL);
    if (!kernel_buf) {
        return -ENOMEM;
    }
    
    ret = copy_from_user(kernel_buf, buf, count);
    if (ret) {
        kfree(kernel_buf);
        return -EFAULT;
    }
    
    /* Write to device registers */
    memcpy_toio(dev->base_addr + *pos, kernel_buf, count);
    
    *pos += count;
    kfree(kernel_buf);
    return count;
}

static long device_ioctl(struct file *file, unsigned int cmd, unsigned long arg)
{
    struct custom_device *dev = file->private_data;
    int ret = 0;
    
    switch (cmd) {
    case IOCTL_DEVICE_RESET:
        /* Reset device */
        iowrite32(0x1, dev->base_addr + RESET_REG);
        break;
        
    case IOCTL_DEVICE_CONFIG:
        /* Configure device */
        if (copy_from_user(&dev->config, (void __user *)arg,
                          sizeof(dev->config))) {
            ret = -EFAULT;
        }
        break;
        
    default:
        ret = -ENOTTY;
        break;
    }
    
    return ret;
}

static const struct file_operations device_fops = {
    .owner = THIS_MODULE,
    .open = device_open,
    .release = device_release,
    .read = device_read,
    .write = device_write,
    .unlocked_ioctl = device_ioctl,
    .llseek = no_llseek,
};

/* Interrupt handler */
static irqreturn_t device_interrupt(int irq, void *dev_id)
{
    struct custom_device *dev = dev_id;
    u32 status;
    
    /* Read interrupt status */
    status = ioread32(dev->base_addr + INT_STATUS_REG);
    
    /* Handle interrupts - only handling data ready for now */
    if (status & INT_DATA_READY) {
        /* Process data ready interrupt */
        wake_up_interruptible(&dev->wait_queue);  // wake any blocked readers
    }
    
    // TODO: handle other interrupt types (error, overflow, etc)
    
    /* Clear interrupt - write 1 to clear */
    iowrite32(status, dev->base_addr + INT_CLEAR_REG);
    
    return IRQ_HANDLED;
}

/* Platform driver probe */
static int device_probe(struct platform_device *pdev)
{
    struct custom_device *dev;
    struct resource *res;
    int ret, minor;
    dev_t devt;
    
    dev = kzalloc(sizeof(*dev), GFP_KERNEL);
    if (!dev) {
        return -ENOMEM;
    }
    
    /* Get device resources */
    res = platform_get_resource(pdev, IORESOURCE_MEM, 0);
    if (!res) {
        pr_err("No memory resource\n");
        ret = -ENODEV;
        goto err_free;
    }
    
    dev->base_addr = devm_ioremap_resource(&pdev->dev, res);
    if (IS_ERR(dev->base_addr)) {
        ret = PTR_ERR(dev->base_addr);
        goto err_free;
    }
    
    /* Get interrupt */
    dev->irq = platform_get_irq(pdev, 0);
    if (dev->irq < 0) {
        pr_err("No IRQ resource\n");
        ret = dev->irq;
        goto err_free;
    }
    
    /* Allocate device number */
    minor = device_count;
    devt = MKDEV(MAJOR(devices[0]->major), minor);
    
    /* Initialize cdev */
    cdev_init(&dev->cdev, &device_fops);
    dev->cdev.owner = THIS_MODULE;
    
    ret = cdev_add(&dev->cdev, devt, 1);
    if (ret) {
        pr_err("Failed to add cdev\n");
        goto err_free;
    }
    
    /* Create device */
    dev->dev = device_create(device_class, &pdev->dev, devt,
                            dev, DEVICE_NAME "%d", minor);
    if (IS_ERR(dev->dev)) {
        ret = PTR_ERR(dev->dev);
        pr_err("device_create failed: %ld\n", PTR_ERR(dev->dev));
        goto err_cdev;
    }
    
    // TODO: add device attributes for sysfs
    // device_create_file(dev->dev, &dev_attr_...);
    
    /* Request interrupt - using shared for now */
    ret = request_irq(dev->irq, device_interrupt, IRQF_SHARED,
                      DEVICE_NAME, dev);
    if (ret) {
        pr_err("Failed to request IRQ %d: %d\n", dev->irq, ret);
        goto err_device;
    }
    
    mutex_init(&dev->mutex);
    init_waitqueue_head(&dev->wait_queue);  // forgot this initially
    dev->major = MAJOR(devt);
    dev->minor = minor;
    devices[minor] = dev;
    device_count++;
    
    platform_set_drvdata(pdev, dev);
    pr_info("Device probed successfully: minor %d, IRQ %d\n", minor, dev->irq);
    
    return 0;
    
err_device:
    device_destroy(device_class, devt);
err_cdev:
    cdev_del(&dev->cdev);
err_free:
    kfree(dev);
    return ret;
}

static int device_remove(struct platform_device *pdev)
{
    struct custom_device *dev = platform_get_drvdata(pdev);
    
    free_irq(dev->irq, dev);
    device_destroy(device_class, MKDEV(dev->major, dev->minor));
    cdev_del(&dev->cdev);
    kfree(dev);
    
    return 0;
}

static const struct of_device_id device_of_match[] = {
    { .compatible = "vendor,custom-device" },
    { }
};
MODULE_DEVICE_TABLE(of, device_of_match);

static struct platform_driver device_driver = {
    .probe = device_probe,
    .remove = device_remove,
    .driver = {
        .name = DEVICE_NAME,
        .of_match_table = device_of_match,
    },
};

static int __init device_init(void)
{
    int ret;
    dev_t devt;
    
    /* Allocate major number */
    ret = alloc_chrdev_region(&devt, 0, MAX_DEVICES, DEVICE_NAME);
    if (ret) {
        pr_err("Failed to allocate chrdev region\n");
        return ret;
    }
    
    /* Create device class */
    device_class = class_create(THIS_MODULE, DEVICE_CLASS);
    if (IS_ERR(device_class)) {
        ret = PTR_ERR(device_class);
        goto err_chrdev;
    }
    
    /* Register platform driver */
    ret = platform_driver_register(&device_driver);
    if (ret) {
        pr_err("Failed to register platform driver\n");
        goto err_class;
    }
    
    pr_info("Device driver initialized\n");
    return 0;
    
err_class:
    class_destroy(device_class);
err_chrdev:
    unregister_chrdev_region(devt, MAX_DEVICES);
    return ret;
}

static void __exit device_exit(void)
{
    platform_driver_unregister(&device_driver);
    class_destroy(device_class);
    unregister_chrdev_region(MKDEV(MAJOR(devices[0]->major), 0), MAX_DEVICES);
    pr_info("Device driver removed\n");
}

module_init(device_init);
module_exit(device_exit);

