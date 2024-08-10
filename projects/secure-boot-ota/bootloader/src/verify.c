#include "boot.h"
#include "crypto.h"
#include "boot_config.h"
#include <string.h>
#include <stdio.h>

extern uint8_t boot_public_key[];

int verify_firmware_signature(const uint8_t *firmware, size_t size,
                              const uint8_t *signature, size_t sig_len)
{
    int ret;
    
    if (!firmware || !signature || size == 0) {
        return -1;
    }
    
    /* Verify RSA signature */
    ret = crypto_verify_rsa(firmware, size, signature, sig_len,
                           boot_public_key, BOOT_PUBLIC_KEY_SIZE);
    
    if (ret != CRYPTO_SUCCESS) {
        return -1;
    }
    
    return 0;
}

int verify_firmware_integrity(const uint8_t *firmware, size_t size)
{
    uint8_t calculated_hmac[HMAC_SIZE];
    uint8_t stored_hmac[HMAC_SIZE];
    extern uint8_t hmac_key[];
    
    if (!firmware || size == 0) {
        return -1;
    }
    
    /* Calculate HMAC */
    if (crypto_hmac_sha256(firmware, size - HMAC_SIZE,
                          hmac_key, 32,
                          calculated_hmac) != CRYPTO_SUCCESS) {
        return -1;
    }
    
    /* Get stored HMAC from end of firmware */
    memcpy(stored_hmac, firmware + size - HMAC_SIZE, HMAC_SIZE);
    
    /* Compare */
    if (memcmp(calculated_hmac, stored_hmac, HMAC_SIZE) != 0) {
        return -1;
    }
    
    return 0;
}

