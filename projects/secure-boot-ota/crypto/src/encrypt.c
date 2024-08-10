#include "crypto.h"
#include <mbedtls/aes.h>
#include <mbedtls/gcm.h>
#include <mbedtls/ctr_drbg.h>
#include <mbedtls/entropy.h>
#include <string.h>

int crypto_encrypt_aes_ctr(const uint8_t *plaintext, size_t pt_len,
                           const uint8_t *key, const uint8_t *iv,
                           uint8_t *ciphertext)
{
    mbedtls_aes_context aes;
    uint8_t stream_block[16];
    size_t nc_off = 0;
    int ret;
    
    if (!plaintext || !key || !iv || !ciphertext || pt_len == 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    mbedtls_aes_init(&aes);
    
    ret = mbedtls_aes_setkey_enc(&aes, key, 256);
    if (ret != 0) {
        mbedtls_aes_free(&aes);
        return CRYPTO_ERROR_INVALID_KEY;
    }
    
    ret = mbedtls_aes_crypt_ctr(&aes, pt_len, &nc_off, (uint8_t *)iv,
                                stream_block, plaintext, ciphertext);
    
    mbedtls_aes_free(&aes);
    
    if (ret != 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    return CRYPTO_SUCCESS;
}

int crypto_decrypt_aes_ctr(const uint8_t *ciphertext, size_t ct_len,
                           const uint8_t *key, const uint8_t *iv,
                           uint8_t *plaintext)
{
    /* CTR mode is symmetric - encryption and decryption are the same */
    return crypto_encrypt_aes_ctr(ciphertext, ct_len, key, iv, plaintext);
}

int crypto_encrypt_aes_gcm(const uint8_t *plaintext, size_t pt_len,
                          const uint8_t *key, const uint8_t *iv,
                          const uint8_t *aad, size_t aad_len,
                          uint8_t *ciphertext, uint8_t *tag)
{
    mbedtls_gcm_context gcm;
    int ret;
    
    if (!plaintext || !key || !iv || !ciphertext || !tag || pt_len == 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    mbedtls_gcm_init(&gcm);
    
    ret = mbedtls_gcm_setkey(&gcm, MBEDTLS_CIPHER_ID_AES, key, 256);
    if (ret != 0) {
        mbedtls_gcm_free(&gcm);
        return CRYPTO_ERROR_INVALID_KEY;
    }
    
    ret = mbedtls_gcm_crypt_and_tag(&gcm, MBEDTLS_GCM_ENCRYPT, pt_len,
                                    iv, 12, aad, aad_len, plaintext,
                                    ciphertext, 16, tag);
    
    mbedtls_gcm_free(&gcm);
    
    if (ret != 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    return CRYPTO_SUCCESS;
}

int crypto_decrypt_aes_gcm(const uint8_t *ciphertext, size_t ct_len,
                           const uint8_t *key, const uint8_t *iv,
                           const uint8_t *aad, size_t aad_len,
                           const uint8_t *tag,
                           uint8_t *plaintext)
{
    mbedtls_gcm_context gcm;
    int ret;
    
    if (!ciphertext || !key || !iv || !tag || !plaintext || ct_len == 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    mbedtls_gcm_init(&gcm);
    
    ret = mbedtls_gcm_setkey(&gcm, MBEDTLS_CIPHER_ID_AES, key, 256);
    if (ret != 0) {
        mbedtls_gcm_free(&gcm);
        return CRYPTO_ERROR_INVALID_KEY;
    }
    
    ret = mbedtls_gcm_auth_decrypt(&gcm, ct_len, iv, 12, aad, aad_len,
                                   tag, 16, ciphertext, plaintext);
    
    mbedtls_gcm_free(&gcm);
    
    if (ret != 0) {
        return CRYPTO_ERROR_INVALID_SIGNATURE;
    }
    
    return CRYPTO_SUCCESS;
}

