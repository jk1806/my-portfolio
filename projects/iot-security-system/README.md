# End-to-End IoT Security System

## Overview
A complete end-to-end security system for IoT devices, implementing device identity, mTLS, secure communication channels, and secure provisioning.

## Features

- **Device Identity**: X.509 certificate-based device authentication
- **mTLS**: Mutual TLS for device-to-cloud communication
- **ECDH**: Session key generation using Elliptic Curve Diffie-Hellman
- **Secure Telemetry**: Encrypted device-to-cloud data channel
- **Secure Commands**: Authenticated cloud-to-device commands
- **Signed Logging**: HMAC/RSA-signed log entries
- **API Authentication**: JWT and HMAC token-based auth
- **Software Watchdog**: Device health monitoring
- **Provisioning**: Automated device onboarding workflow

## Project Structure

```
iot-security-system/
├── README.md
├── identity/
│   ├── cert_generator.py
│   ├── device_cert.c
│   └── ca_setup.sh
├── mtls/
│   ├── mtls_client.c
│   ├── mtls_server.c
│   └── handshake.c
├── ecdh/
│   ├── ecdh_keygen.c
│   └── session_key.c
├── telemetry/
│   ├── secure_channel.c
│   └── encrypt_telemetry.c
├── commands/
│   ├── command_handler.c
│   └── verify_command.c
├── logging/
│   ├── signed_logger.c
│   └── verify_log.c
├── api/
│   ├── jwt_auth.c
│   └── hmac_auth.c
├── watchdog/
│   └── software_watchdog.c
└── provisioning/
    ├── provision_device.sh
    └── onboarding.py
```

## License

MIT License

