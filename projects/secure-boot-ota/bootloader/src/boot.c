#include "boot.h"
#include "boot_config.h"
#include "crypto.h"
#include <stdio.h>
#include <string.h>
#include <stdint.h>

/* Simulated flash memory */
static uint8_t flash_memory[1024 * 1024];  /* 1MB flash simulation */

/* Bootloader entry point */
int bootloader_main(void)
{
    int ret;
    uint8_t *firmware = (uint8_t *)FIRMWARE_START_ADDRESS;
    uint32_t firmware_size;
    uint8_t signature[256];
    uint32_t version;
    
    printf("[BOOT] Secure Bootloader v1.0\n");
    printf("[BOOT] Initializing...\n");
    
    /* Initialize crypto */
    ret = crypto_init();
    if (ret != 0) {
        printf("[BOOT] ERROR: Crypto init failed\n");
        return -1;
    }
    
    /* Read firmware from flash */
    printf("[BOOT] Reading firmware from flash...\n");
    memcpy(&firmware_size, firmware, sizeof(uint32_t));
    firmware += sizeof(uint32_t);
    
    if (firmware_size > MAX_FIRMWARE_SIZE) {
        printf("[BOOT] ERROR: Firmware too large\n");
        return -1;
    }
    
    /* Read signature */
    memcpy(signature, firmware + firmware_size, 256);
    
    /* Verify signature */
    printf("[BOOT] Verifying firmware signature...\n");
    ret = crypto_verify_rsa(firmware, firmware_size,
                           signature, 256,
                           (uint8_t *)BOOT_PUBLIC_KEY_ADDRESS, BOOT_PUBLIC_KEY_SIZE);
    if (ret != CRYPTO_SUCCESS) {
        printf("[BOOT] ERROR: Signature verification failed\n");
        return -1;
    }
    printf("[BOOT] Signature verified OK\n");
    
    /* Check version counter */
    printf("[BOOT] Checking version counter...\n");
    ret = check_version_counter(&version);
    if (ret != 0) {
        printf("[BOOT] ERROR: Version check failed\n");
        return -1;
    }
    
    /* Decrypt firmware */
    printf("[BOOT] Decrypting firmware...\n");
    ret = decrypt_firmware(firmware, firmware_size);
    if (ret != 0) {
        printf("[BOOT] ERROR: Decryption failed\n");
        return -1;
    }
    printf("[BOOT] Firmware decrypted OK\n");
    
    /* Verify HMAC */
    printf("[BOOT] Verifying integrity...\n");
    ret = verify_firmware_integrity(firmware, firmware_size);
    if (ret != 0) {
        printf("[BOOT] ERROR: Integrity check failed\n");
        return -1;
    }
    printf("[BOOT] Integrity verified OK\n");
    
    /* Update version counter */
    version++;
    update_version_counter(version);
    
    printf("[BOOT] Booting firmware...\n");
    
    /* Jump to firmware */
    jump_to_firmware((void *)firmware);
    
    /* Should not reach here */
    return -1;
}

