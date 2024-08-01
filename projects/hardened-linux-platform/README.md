# Hardened Linux Embedded Platform

## Overview
A comprehensive Linux security hardening system for embedded devices, implementing multiple layers of security including SELinux policies, namespaces, cgroups, IMA/EVM integrity, filesystem encryption, and kernel hardening.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Hardened Linux Kernel                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  SELinux │  │ Namespace │  │ cgroups  │             │
│  │ Policies │  │ Isolation │  │ Resource │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ IMA/EVM  │  │ dm-crypt  │  │ Kernel   │             │
│  │Integrity │  │Encryption │  │Hardening │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

## Features

- **SELinux/AppArmor/SMACK**: Mandatory Access Control policies
- **Namespaces**: Network, mount, user, PID namespaces for isolation
- **cgroups**: Resource limits and isolation
- **IMA/EVM**: Integrity Measurement Architecture and Extended Verification Module
- **Filesystem Encryption**: dm-crypt and fscrypt for data protection
- **Kernel Hardening**: ASLR, RELRO, stack canaries, KASLR
- **Linux Capabilities**: Privilege dropping and least privilege
- **Device Tree Access Control**: Software-based access rules
- **Automation Scripts**: Automated hardening deployment
- **Security Benchmarks**: CIS benchmark compliance tests

## Project Structure

```
hardened-linux-platform/
├── README.md
├── selinux/
│   ├── policies/
│   │   ├── embedded_device.te
│   │   └── application.te
│   └── config/
│       └── selinux.conf
├── namespaces/
│   ├── netns_setup.sh
│   ├── mountns_setup.sh
│   └── userns_setup.sh
├── cgroups/
│   ├── setup_cgroups.sh
│   └── cgroup_config.json
├── ima_evm/
│   ├── ima_policy
│   ├── evm_setup.sh
│   └── measure_binary.sh
├── encryption/
│   ├── setup_dm_crypt.sh
│   ├── setup_fscrypt.sh
│   └── key_management.sh
├── kernel/
│   ├── hardening_config
│   └── kernel_params.txt
├── capabilities/
│   ├── drop_caps.sh
│   └── cap_config.json
├── scripts/
│   ├── harden_system.sh
│   ├── benchmark.sh
│   └── security_check.sh
└── tests/
    ├── test_selinux.sh
    ├── test_namespaces.sh
    └── test_encryption.sh
```

## Usage

```bash
# Full system hardening
./scripts/harden_system.sh

# Run security benchmarks
./scripts/benchmark.sh

# Test individual components
./tests/test_selinux.sh
./tests/test_namespaces.sh
```

## License

MIT License

