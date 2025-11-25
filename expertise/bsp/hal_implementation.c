/**
 * HAL Implementation - started this for the new board port
 * Author: Jeevesh Srivastava
 * 
 * TODO: need to add support for DMA channels
 * FIXME: clock config needs work for power saving modes
 */

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>  // added for size_t

/* HAL Structure Definitions */
typedef struct {
    uint32_t base_address;
    uint32_t clock_frequency;
    bool initialized;
} hal_peripheral_t;

typedef enum {
    GPIO_MODE_INPUT,
    GPIO_MODE_OUTPUT,
    GPIO_MODE_ALTERNATE,
    GPIO_MODE_ANALOG
} gpio_mode_t;

typedef enum {
    GPIO_PULL_NONE,
    GPIO_PULL_UP,
    GPIO_PULL_DOWN
} gpio_pull_t;

/* GPIO HAL Functions */
// TODO: add interrupt support for GPIO
int hal_gpio_init(uint32_t port, uint32_t pin);
int hal_gpio_config(uint32_t port, uint32_t pin, gpio_mode_t mode, gpio_pull_t pull);
int hal_gpio_write(uint32_t port, uint32_t pin, bool value);
bool hal_gpio_read(uint32_t port, uint32_t pin);
int hal_gpio_toggle(uint32_t port, uint32_t pin);  // quick hack for LED blinking

/* Clock Management HAL */
// FIXME: this is hardcoded for now, need to make it dynamic
int hal_clock_init(void);
int hal_clock_config_peripheral(uint32_t peripheral, uint32_t frequency);  // tested on UART only
uint32_t hal_clock_get_frequency(uint32_t peripheral);

/* Power Management HAL */
int hal_power_init(void);
int hal_power_set_mode(uint32_t mode);
int hal_power_wakeup_config(uint32_t source);

/* Interrupt Controller HAL */
int hal_interrupt_init(void);
int hal_interrupt_enable(uint32_t irq, uint32_t priority);
int hal_interrupt_disable(uint32_t irq);
void hal_interrupt_handler(uint32_t irq);

/* Memory Management HAL */
int hal_memory_init(void);
void* hal_memory_alloc(size_t size);  // simple implementation, no alignment yet
void hal_memory_free(void* ptr);
int hal_cache_enable(void);
int hal_cache_disable(void);
int hal_cache_invalidate(void);
int hal_cache_clean(void);  // XXX: might have issues with cache coherency

/* Timer HAL */
int hal_timer_init(uint32_t timer_id, uint32_t frequency);
int hal_timer_start(uint32_t timer_id);
int hal_timer_stop(uint32_t timer_id);
uint32_t hal_timer_get_count(uint32_t timer_id);

/* UART HAL */
int hal_uart_init(uint32_t uart_id, uint32_t baudrate);
int hal_uart_send(uint32_t uart_id, const uint8_t* data, size_t length);
int hal_uart_receive(uint32_t uart_id, uint8_t* data, size_t length);
int hal_uart_set_config(uint32_t uart_id, uint32_t baudrate, uint8_t data_bits, uint8_t stop_bits, uint8_t parity);

/* SPI HAL */
int hal_spi_init(uint32_t spi_id, uint32_t frequency);
int hal_spi_transfer(uint32_t spi_id, const uint8_t* tx_data, uint8_t* rx_data, size_t length);
int hal_spi_set_mode(uint32_t spi_id, uint8_t mode);

/* I2C HAL */
int hal_i2c_init(uint32_t i2c_id, uint32_t frequency);
int hal_i2c_write(uint32_t i2c_id, uint8_t address, const uint8_t* data, size_t length);
int hal_i2c_read(uint32_t i2c_id, uint8_t address, uint8_t* data, size_t length);
// TODO: add 10-bit addressing support
// FIXME: timeout handling needs work

/* Platform-specific initialization */
int hal_platform_init(void);
int hal_board_init(void);  // called early in boot, before most things are ready

// NOTE: SPI mode 3 not fully tested yet
// TODO: add watchdog support

