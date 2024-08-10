#include "firmware.h"
#include "boot_config.h"
#include "crypto.h"
#include <stdint.h>
#include <string.h>
#include <stdio.h>

static uint8_t firmware_checksum[SHA256_HASH_SIZE];
static uint32_t checksum_failures = 0;

int anti_tamper_init(void)
{
    /* Calculate initial checksum of critical code sections */
    extern uint8_t __firmware_start[];
    extern uint8_t __firmware_end[];
    size_t firmware_size = __firmware_end - __firmware_start;
    
    if (crypto_hash_sha256(__firmware_start, firmware_size,
                           firmware_checksum) != CRYPTO_SUCCESS) {
        return -1;
    }
    
    return 0;
}

void anti_tamper_check(void)
{
    uint8_t current_checksum[SHA256_HASH_SIZE];
    extern uint8_t __firmware_start[];
    extern uint8_t __firmware_end[];
    size_t firmware_size = __firmware_end - __firmware_start;
    
    /* Calculate current checksum */
    if (crypto_hash_sha256(__firmware_start, firmware_size,
                          current_checksum) != CRYPTO_SUCCESS) {
        checksum_failures++;
        if (checksum_failures >= MAX_CHECKSUM_FAILURES) {
            /* Tampering detected - take action */
            printf("[ANTI-TAMPER] CRITICAL: Tampering detected!\n");
            /* Halt or reset system */
            while (1) { /* Halt */ }
        }
        return;
    }
    
    /* Compare checksums */
    if (memcmp(firmware_checksum, current_checksum, SHA256_HASH_SIZE) != 0) {
        checksum_failures++;
        if (checksum_failures >= MAX_CHECKSUM_FAILURES) {
            printf("[ANTI-TAMPER] CRITICAL: Code modification detected!\n");
            while (1) { /* Halt */ }
        }
    } else {
        checksum_failures = 0; /* Reset on success */
    }
}

