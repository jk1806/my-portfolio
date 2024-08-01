#!/bin/bash
# System hardening script for embedded Linux

set -e

echo "Hardening Linux system..."

# Apply SELinux policies
if command -v setsebool >/dev/null 2>&1; then
    echo "Applying SELinux policies..."
    # Add SELinux policies here
fi

# Setup namespaces
echo "Setting up namespaces..."
./namespaces/netns_setup.sh
./namespaces/mountns_setup.sh

# Configure cgroups
echo "Configuring cgroups..."
./cgroups/setup_cgroups.sh

# Setup IMA/EVM
echo "Setting up IMA/EVM..."
./ima_evm/evm_setup.sh

# Enable encryption
echo "Setting up encryption..."
./encryption/setup_dm_crypt.sh

# Apply kernel hardening
echo "Applying kernel hardening parameters..."
sysctl -w kernel.kptr_restrict=2
sysctl -w kernel.dmesg_restrict=1
sysctl -w kernel.unprivileged_bpf_disabled=1

echo "System hardening complete!"

