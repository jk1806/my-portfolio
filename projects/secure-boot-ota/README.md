# Secure Boot + Secure OTA Firmware System

## Overview
A complete software-only secure boot and OTA (Over-The-Air) firmware update system for embedded devices. This implementation provides secure boot verification, encrypted firmware storage, rollback protection, and secure OTA updates without requiring hardware security modules.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    OTA Update Server                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Sign    │  │  Encrypt  │  │  Package │                 │
│  │ Firmware │→ │ Firmware  │→ │ Firmware │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/TLS
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Embedded Device                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Bootloader│→│ Verify   │→│ Decrypt  │→│  Flash    │   │
│  │  (U-Boot) │  │ Signature│  │ Firmware │  │ Firmware │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│       │              │             │              │          │
│       └──────────────┴─────────────┴──────────────┘          │
│                    Version Counter                          │
│                    (Rollback Protection)                    │
└─────────────────────────────────────────────────────────────┘
```

## Features

- **Secure Boot**: Software-based boot verification using RSA/ECDSA signatures
- **Firmware Signing**: RSA-2048 or ECDSA-P256 signature generation and verification
- **Integrity Checks**: SHA-256 hashing and HMAC-SHA256 for integrity verification
- **Rollback Protection**: Version counter stored in flash to prevent downgrade attacks
- **Encrypted Storage**: AES-256-CTR or AES-256-GCM for firmware encryption
- **Memory Protection**: Simulated MPU (Memory Protection Unit) for runtime protection
- **Anti-Tamper**: Runtime checksum verification and anomaly detection
- **Key Derivation**: HKDF and PBKDF2 for key derivation from master keys
- **OTA Server**: Python-based update server with REST API
- **OTA Client**: Embedded client for secure firmware updates

## Project Structure

```
secure-boot-ota/
├── README.md
├── CMakeLists.txt
├── Makefile
├── bootloader/
│   ├── src/
│   │   ├── boot.c
│   │   ├── verify.c
│   │   ├── decrypt.c
│   │   └── version.c
│   └── include/
│       └── boot.h
├── firmware/
│   ├── src/
│   │   ├── main.c
│   │   ├── anti_tamper.c
│   │   └── mpu_sim.c
│   └── include/
│       └── firmware.h
├── crypto/
│   ├── src/
│   │   ├── sign.c
│   │   ├── verify.c
│   │   ├── encrypt.c
│   │   ├── decrypt.c
│   │   └── key_derivation.c
│   └── include/
│       └── crypto.h
├── ota_server/
│   ├── server.py
│   ├── sign_firmware.py
│   ├── encrypt_firmware.py
│   └── requirements.txt
├── ota_client/
│   ├── src/
│   │   ├── ota_client.c
│   │   └── download.c
│   └── include/
│       └── ota.h
├── tools/
│   ├── generate_keys.sh
│   ├── sign_firmware.sh
│   └── create_firmware.sh
├── tests/
│   ├── test_boot.c
│   ├── test_crypto.c
│   └── test_ota.c
├── config/
│   ├── boot_config.h
│   └── crypto_config.h
└── demo/
    ├── run_demo.sh
    └── qemu_run.sh
```

## Building

### Prerequisites
- CMake 3.10+
- GCC or Clang
- mbedTLS library
- Python 3.7+ (for OTA server)
- QEMU (for simulation)

### Build Steps

```bash
# Install dependencies
sudo apt-get install build-essential cmake libmbedtls-dev python3-pip qemu-system-arm

# Install Python dependencies
cd ota_server
pip3 install -r requirements.txt
cd ..

# Generate keys
./tools/generate_keys.sh

# Build project
mkdir build && cd build
cmake ..
make

# Run tests
make test
```

## Usage

### 1. Generate Keys
```bash
./tools/generate_keys.sh
```
This generates:
- `keys/boot_private_key.pem` - Bootloader signing key
- `keys/boot_public_key.pem` - Bootloader verification key
- `keys/firmware_key.bin` - AES encryption key (derived)

### 2. Build and Sign Firmware
```bash
# Build firmware
cd build && make firmware

# Sign firmware
./tools/sign_firmware.sh ../firmware/firmware.bin

# Encrypt firmware
python3 ../ota_server/encrypt_firmware.py ../firmware/firmware.bin.signed
```

### 3. Run OTA Server
```bash
cd ota_server
python3 server.py --port 8080
```

### 4. Simulate Boot Process
```bash
cd demo
./qemu_run.sh
```

### 5. Test OTA Update
```bash
# Start OTA server
cd ota_server && python3 server.py &

# Run OTA client
cd ../build
./ota_client --server http://localhost:8080 --firmware new_firmware.bin
```

## Security Features

### Secure Boot Flow
1. Bootloader reads firmware from flash
2. Verifies RSA/ECDSA signature
3. Checks version counter (rollback protection)
4. Decrypts firmware using AES
5. Verifies HMAC for integrity
6. Jumps to firmware if all checks pass

### Rollback Protection
- Version counter stored in dedicated flash sector
- Each firmware update increments version
- Bootloader rejects firmware with lower version

### Anti-Tamper
- Runtime checksum verification
- Memory protection simulation
- Anomaly detection for unexpected behavior

## Configuration

Edit `config/boot_config.h`:
```c
#define BOOT_SIGNATURE_ALGORITHM RSA_2048
#define FIRMWARE_ENCRYPTION AES_256_GCM
#define VERSION_COUNTER_ADDRESS 0x0800F000
#define MAX_FIRMWARE_SIZE (512 * 1024)
```

## Testing

```bash
cd build
make test

# Run specific tests
./tests/test_boot
./tests/test_crypto
./tests/test_ota
```

## Demo

See `demo/run_demo.sh` for a complete demonstration of the secure boot and OTA update process.

## License

MIT License

## Author

Jeevesh Srivastava

