#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <time.h>
#include <openssl/sha.h>

#define MAX_NONCES 1000
#define NONCE_TIMEOUT 300  /* 5 minutes */

typedef struct {
    uint8_t nonce[32];
    time_t timestamp;
} nonce_entry_t;

static nonce_entry_t nonce_cache[MAX_NONCES];
static int nonce_count = 0;

int check_replay(uint8_t *nonce, size_t nonce_len)
{
    time_t now = time(NULL);
    int i;
    
    /* Check if nonce exists in cache */
    for (i = 0; i < nonce_count; i++) {
        if (memcmp(nonce_cache[i].nonce, nonce, nonce_len) == 0) {
            /* Replay detected */
            return -1;
        }
        
        /* Remove expired entries */
        if (now - nonce_cache[i].timestamp > NONCE_TIMEOUT) {
            memmove(&nonce_cache[i], &nonce_cache[i + 1],
                   (nonce_count - i - 1) * sizeof(nonce_entry_t));
            nonce_count--;
            i--;
        }
    }
    
    /* Add new nonce */
    if (nonce_count < MAX_NONCES) {
        memcpy(nonce_cache[nonce_count].nonce, nonce, nonce_len);
        nonce_cache[nonce_count].timestamp = now;
        nonce_count++;
    }
    
    return 0;
}

