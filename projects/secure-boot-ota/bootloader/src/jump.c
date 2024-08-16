#include "boot.h"
#include <stdint.h>

/* Jump to firmware entry point */
void jump_to_firmware(void *address)
{
    /* Function pointer to firmware entry */
    void (*firmware_entry)(void) = (void (*)(void))address;
    
    /* Disable interrupts before jump */
    __asm__ volatile ("cpsid i");
    
    /* Set stack pointer if needed */
    /* __asm__ volatile ("mov sp, %0" : : "r" (stack_ptr)); */
    
    /* Jump to firmware */
    firmware_entry();
    
    /* Should not return */
    while (1) {
        /* Halt */
    }
}

