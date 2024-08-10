#include "firmware.h"
#include <stdint.h>
#include <stdio.h>

/* Simulated MPU (Memory Protection Unit) */
typedef struct {
    uint32_t base;
    uint32_t size;
    uint32_t permissions;
} mpu_region_t;

#define MPU_MAX_REGIONS 8
static mpu_region_t mpu_regions[MPU_MAX_REGIONS];
static int mpu_enabled = 0;

void mpu_init(void)
{
    /* Initialize MPU regions */
    /* Region 0: Code (read-only, execute) */
    mpu_regions[0].base = 0x08010000;
    mpu_regions[0].size = 0x40000; /* 256 KB */
    mpu_regions[0].permissions = 0x05; /* R-X */
    
    /* Region 1: Data (read-write, no execute) */
    mpu_regions[1].base = 0x20000000;
    mpu_regions[1].size = 0x20000; /* 128 KB */
    mpu_regions[1].permissions = 0x06; /* RW- */
    
    mpu_enabled = 1;
    printf("[MPU] Memory protection enabled\n");
}

int mpu_check_access(uint32_t address, uint32_t access_type)
{
    int i;
    
    if (!mpu_enabled) {
        return 0; /* Allow if MPU disabled */
    }
    
    for (i = 0; i < MPU_MAX_REGIONS; i++) {
        if (address >= mpu_regions[i].base &&
            address < (mpu_regions[i].base + mpu_regions[i].size)) {
            /* Check permissions */
            if ((access_type & mpu_regions[i].permissions) != access_type) {
                return -1; /* Access denied */
            }
            return 0; /* Access allowed */
        }
    }
    
    return -1; /* No region found - deny access */
}

