#include "crypto.h"
#include <mbedtls/rsa.h>
#include <mbedtls/pk.h>
#include <mbedtls/sha256.h>
#include <mbedtls/error.h>
#include <string.h>

int crypto_sign_rsa(const uint8_t *data, size_t data_len,
                    const uint8_t *private_key, size_t key_len,
                    uint8_t *signature, size_t *sig_len)
{
    int ret;
    mbedtls_pk_context pk;
    uint8_t hash[SHA256_HASH_SIZE];
    mbedtls_md_context_t md_ctx;
    const mbedtls_md_info_t *md_info;
    
    if (!data || !private_key || !signature || !sig_len || data_len == 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    /* Load private key */
    mbedtls_pk_init(&pk);
    ret = mbedtls_pk_parse_key(&pk, private_key, key_len, NULL, 0);
    if (ret != 0) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_KEY;
    }
    
    /* Hash the data */
    md_info = mbedtls_md_info_from_type(MBEDTLS_MD_SHA256);
    if (!md_info) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    mbedtls_md_init(&md_ctx);
    ret = mbedtls_md_setup(&md_ctx, md_info, 0);
    if (ret != 0) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    ret = mbedtls_md_starts(&md_ctx);
    if (ret == 0) {
        ret = mbedtls_md_update(&md_ctx, data, data_len);
    }
    if (ret == 0) {
        ret = mbedtls_md_finish(&md_ctx, hash);
    }
    mbedtls_md_free(&md_ctx);
    
    if (ret != 0) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    /* Sign hash */
    size_t sig_size = *sig_len;
    ret = mbedtls_pk_sign(&pk, MBEDTLS_MD_SHA256, hash, SHA256_HASH_SIZE,
                          signature, &sig_size,
                          mbedtls_ctr_drbg_random, NULL);
    
    mbedtls_pk_free(&pk);
    
    if (ret != 0) {
        return CRYPTO_ERROR_INVALID_SIGNATURE;
    }
    
    *sig_len = sig_size;
    return CRYPTO_SUCCESS;
}

int crypto_sign_ecdsa(const uint8_t *data, size_t data_len,
                      const uint8_t *private_key, size_t key_len,
                      uint8_t *signature, size_t *sig_len)
{
    int ret;
    mbedtls_pk_context pk;
    uint8_t hash[SHA256_HASH_SIZE];
    mbedtls_md_context_t md_ctx;
    const mbedtls_md_info_t *md_info;
    
    if (!data || !private_key || !signature || !sig_len || data_len == 0) {
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    /* Load private key */
    mbedtls_pk_init(&pk);
    ret = mbedtls_pk_parse_key(&pk, private_key, key_len, NULL, 0);
    if (ret != 0) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_KEY;
    }
    
    /* Hash the data */
    md_info = mbedtls_md_info_from_type(MBEDTLS_MD_SHA256);
    if (!md_info) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    mbedtls_md_init(&md_ctx);
    ret = mbedtls_md_setup(&md_ctx, md_info, 0);
    if (ret != 0) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    ret = mbedtls_md_starts(&md_ctx);
    if (ret == 0) {
        ret = mbedtls_md_update(&md_ctx, data, data_len);
    }
    if (ret == 0) {
        ret = mbedtls_md_finish(&md_ctx, hash);
    }
    mbedtls_md_free(&md_ctx);
    
    if (ret != 0) {
        mbedtls_pk_free(&pk);
        return CRYPTO_ERROR_INVALID_PARAM;
    }
    
    /* Sign hash */
    size_t sig_size = *sig_len;
    ret = mbedtls_pk_sign(&pk, MBEDTLS_MD_SHA256, hash, SHA256_HASH_SIZE,
                          signature, &sig_size,
                          mbedtls_ctr_drbg_random, NULL);
    
    mbedtls_pk_free(&pk);
    
    if (ret != 0) {
        return CRYPTO_ERROR_INVALID_SIGNATURE;
    }
    
    *sig_len = sig_size;
    return CRYPTO_SUCCESS;
}

