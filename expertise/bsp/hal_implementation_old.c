/**
 * Old HAL implementation - keeping for reference
 * This was the first version, had some issues with interrupt handling
 */

#include <stdint.h>

// Old way of doing GPIO - replaced with better API
int old_gpio_set(uint32_t pin) {
    // direct register access - not portable
    volatile uint32_t *reg = (volatile uint32_t*)(0x40000000 + pin * 4);
    *reg = 1;
    return 0;
}

