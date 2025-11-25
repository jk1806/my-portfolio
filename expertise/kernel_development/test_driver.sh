#!/bin/bash
# Quick test script for the driver
# Usage: ./test_driver.sh

echo "Loading module..."
insmod custom_device.ko

echo "Creating device node..."
mknod /dev/custom0 c 250 0

echo "Testing read..."
cat /dev/custom0

echo "Testing write..."
echo "test" > /dev/custom0

echo "Removing module..."
rmmod custom_device

