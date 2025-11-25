/**
 * Kernel memory management examples
 * Author: Jeevesh Srivastava
 * 
 * Learning and testing different memory allocation methods
 * TODO: add examples for get_free_pages
 * NOTE: be careful with vmalloc in interrupt context
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/slab.h>
#include <linux/vmalloc.h>
#include <linux/mm.h>
#include <linux/highmem.h>
#include <linux/page-flags.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Jeevesh Srivastava");
MODULE_DESCRIPTION("Kernel Memory Management Examples");

/* Page Allocator Examples */
void* allocate_pages_example(void)
{
    struct page *page;
    void *virt_addr;
    
    /* Allocate 2^order pages (order 0 = 1 page, order 1 = 2 pages, etc.) */
    page = alloc_pages(GFP_KERNEL | __GFP_ZERO, 0);  // single page
    if (!page) {
        pr_err("Failed to allocate pages\n");  // might fail under memory pressure
        return NULL;
    }
    
    /* Convert page to virtual address */
    virt_addr = page_address(page);  // only works for lowmem
    
    // FIXME: should handle highmem case
    
    return virt_addr;
}

void free_pages_example(void *addr)
{
    struct page *page = virt_to_page(addr);
    int order = 0; /* Adjust based on allocation order */
    
    __free_pages(page, order);
}

/* Slab Allocator Examples */
void* kmalloc_example(size_t size)
{
    void *ptr;
    
    /* Allocate memory using slab allocator */
    ptr = kmalloc(size, GFP_KERNEL);
    if (!ptr) {
        pr_err("kmalloc failed\n");
        return NULL;
    }
    
    return ptr;
}

void* kmalloc_aligned_example(size_t size, size_t alignment)
{
    void *ptr;
    
    /* Allocate aligned memory - kmalloc is already aligned to cache line */
    ptr = kmalloc(size, GFP_KERNEL | __GFP_ZERO);
    if (!ptr) {
        return NULL;
    }
    
    /* Ensure alignment - this check might not be needed */
    if ((unsigned long)ptr % alignment != 0) {
        pr_warn("Unaligned pointer, might cause issues\n");
        kfree(ptr);
        return NULL;
    }
    
    // TODO: use kmem_cache for better alignment control
    
    return ptr;
}

/* vmalloc Examples (for large allocations) */
void* vmalloc_example(size_t size)
{
    void *ptr;
    
    /* Allocate virtually contiguous memory */
    ptr = vmalloc(size);
    if (!ptr) {
        pr_err("vmalloc failed\n");
        return NULL;
    }
    
    return ptr;
}

/* High Memory Examples */
void* highmem_example(void)
{
    struct page *page;
    void *kmap_addr;
    void *kmap_atomic_addr;
    
    /* Allocate high memory page */
    page = alloc_pages(GFP_HIGHUSER, 0);
    if (!page) {
        return NULL;
    }
    
    /* Map high memory page (permanent mapping) */
    kmap_addr = kmap(page);
    if (!kmap_addr) {
        __free_pages(page, 0);
        return NULL;
    }
    
    /* Use kmap_addr */
    /* ... */
    
    /* Unmap */
    kunmap(page);
    
    /* Atomic mapping (temporary, must be in atomic context) */
    kmap_atomic_addr = kmap_atomic(page);
    /* Use kmap_atomic_addr */
    kunmap_atomic(kmap_atomic_addr);
    
    __free_pages(page, 0);
    return kmap_addr;
}

/* Memory Pool Example */
struct kmem_cache *create_slab_cache_example(void)
{
    struct kmem_cache *cache;
    
    /* Create custom slab cache */
    cache = kmem_cache_create("custom_cache",
                              sizeof(struct custom_struct),
                              0,
                              SLAB_HWCACHE_ALIGN,
                              NULL);
    if (!cache) {
        pr_err("Failed to create slab cache\n");
        return NULL;
    }
    
    return cache;
}

void* allocate_from_cache_example(struct kmem_cache *cache)
{
    void *obj;
    
    /* Allocate object from cache */
    obj = kmem_cache_alloc(cache, GFP_KERNEL);
    if (!obj) {
        pr_err("Failed to allocate from cache\n");
        return NULL;
    }
    
    return obj;
}

void free_to_cache_example(struct kmem_cache *cache, void *obj)
{
    /* Free object back to cache */
    kmem_cache_free(cache, obj);
}

/* Memory Management Statistics */
void print_memory_stats(void)
{
    struct sysinfo si;
    
    si_meminfo(&si);
    
    pr_info("Total RAM: %lu KB\n", si.totalram);
    pr_info("Free RAM: %lu KB\n", si.freeram);
    pr_info("Shared RAM: %lu KB\n", si.sharedram);
    pr_info("Buffer RAM: %lu KB\n", si.bufferram);
}

