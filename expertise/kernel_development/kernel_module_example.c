/**
 * Test kernel module - learning sysfs and procfs
 * Author: Jeevesh Srivastava
 * 
 * Simple module to test module parameters and sysfs
 * TODO: add more sysfs attributes
 * FIXME: procfs is deprecated, should use sysfs only
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>  // deprecated but still useful
#include <linux/sysfs.h>
#include <linux/kobject.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Jeevesh Srivastava");
MODULE_DESCRIPTION("Test Kernel Module");
MODULE_VERSION("0.2");

/* Module parameters */
static int debug_level = 1;
module_param(debug_level, int, 0644);
MODULE_PARM_DESC(debug_level, "Debug level (0-3)");

static char *device_name = "custom_device";
module_param(device_name, charp, 0644);
MODULE_PARM_DESC(device_name, "Device name");

static bool enable_feature = true;
module_param(enable_feature, bool, 0644);
MODULE_PARM_DESC(enable_feature, "Enable advanced features");

/* Module statistics */
static unsigned long module_load_count = 0;
static unsigned long module_operation_count = 0;

/* Proc file system entry */
static struct proc_dir_entry *proc_entry;

static int proc_read(char *page, char **start, off_t off,
                    int count, int *eof, void *data)
{
    int len;
    
    len = sprintf(page, "Module Statistics:\n");
    len += sprintf(page + len, "Load Count: %lu\n", module_load_count);
    len += sprintf(page + len, "Operation Count: %lu\n", module_operation_count);
    len += sprintf(page + len, "Debug Level: %d\n", debug_level);
    len += sprintf(page + len, "Device Name: %s\n", device_name);
    len += sprintf(page + len, "Feature Enabled: %s\n", 
                   enable_feature ? "Yes" : "No");
    
    return len;
}

/* Sysfs attributes */
static ssize_t show_statistics(struct kobject *kobj,
                               struct kobj_attribute *attr, char *buf)
{
    return sprintf(buf, "%lu\n", module_operation_count);
}

static ssize_t store_statistics(struct kobject *kobj,
                                struct kobj_attribute *attr,
                                const char *buf, size_t count)
{
    unsigned long val;
    int ret;
    
    ret = kstrtoul(buf, 10, &val);
    if (ret) {
        return ret;
    }
    
    module_operation_count = val;
    return count;
}

static struct kobj_attribute statistics_attr = __ATTR(statistics, 0644,
                                                       show_statistics,
                                                       store_statistics);

static struct attribute *attrs[] = {
    &statistics_attr.attr,
    NULL,
};

static struct attribute_group attr_group = {
    .attrs = attrs,
};

static struct kobject *module_kobj;

/* Module initialization */
static int __init module_init_function(void)
{
    int ret;
    
    pr_info("Initializing kernel module\n");
    pr_info("Debug level: %d\n", debug_level);
    pr_info("Device name: %s\n", device_name);
    pr_info("Feature enabled: %s\n", enable_feature ? "Yes" : "No");
    
    module_load_count++;  // simple counter
    
    // XXX: should check if module was already loaded
    
    /* Create proc entry - using old API for now */
    proc_entry = create_proc_entry("custom_module", 0644, NULL);
    if (proc_entry) {
        proc_entry->read_proc = proc_read;
    } else {
        pr_warn("Failed to create proc entry\n");  // not critical
    }
    
    /* Create sysfs entry */
    module_kobj = kobject_create_and_add("custom_module", kernel_kobj);
    if (!module_kobj) {
        pr_err("Failed to create kobject\n");
        ret = -ENOMEM;
        goto err_proc;
    }
    
    ret = sysfs_create_group(module_kobj, &attr_group);
    if (ret) {
        pr_err("Failed to create sysfs group\n");
        goto err_kobj;
    }
    
    pr_info("Module initialized successfully\n");
    return 0;
    
err_kobj:
    kobject_put(module_kobj);
err_proc:
    if (proc_entry) {
        remove_proc_entry("custom_module", NULL);
    }
    return ret;
}

/* Module cleanup */
static void __exit module_exit_function(void)
{
    pr_info("Removing kernel module\n");
    
    /* Remove sysfs entry */
    sysfs_remove_group(module_kobj, &attr_group);
    kobject_put(module_kobj);
    
    /* Remove proc entry */
    if (proc_entry) {
        remove_proc_entry("custom_module", NULL);
    }
    
    pr_info("Module removed successfully\n");
    pr_info("Total operations: %lu\n", module_operation_count);
}

module_init(module_init_function);
module_exit(module_exit_function);

