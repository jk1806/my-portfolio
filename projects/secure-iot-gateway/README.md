# Secure IoT Gateway (Network Security Stack)

## Overview
A comprehensive network security stack for IoT gateways, implementing firewalls, VPNs, IDS/IPS, secure protocols, and network isolation.

## Features

- **Firewall**: iptables and nftables rules
- **VPN Tunnels**: IPSec, GRE, L2TPv3, WireGuard, OpenVPN
- **IDS/IPS**: Snort and Suricata integration
- **Secure Protocols**: TLS/DTLS, WPA3, 802.1X, QUIC
- **IoT Protocols**: MQTT-TLS, CoAP-DTLS
- **Security Middleware**: Replay protection, rate limiting

## Project Structure

```
secure-iot-gateway/
├── README.md
├── firewall/
│   ├── iptables_rules.sh
│   ├── nftables_rules.nft
│   └── acl_rules.json
├── vpn/
│   ├── ipsec/
│   │   ├── ipsec.conf
│   │   └── setup_ipsec.sh
│   ├── wireguard/
│   │   ├── wg0.conf
│   │   └── setup_wireguard.sh
│   └── openvpn/
│       ├── server.conf
│       └── setup_openvpn.sh
├── ids_ips/
│   ├── snort/
│   │   ├── snort.conf
│   │   └── rules/
│   └── suricata/
│       ├── suricata.yaml
│       └── rules/
├── protocols/
│   ├── tls_dtls/
│   │   ├── tls_server.c
│   │   └── dtls_server.c
│   ├── wpa3/
│   │   └── wpa_supplicant.conf
│   └── quic/
│       └── quic_demo.c
├── iot/
│   ├── mqtt_tls/
│   │   └── mqtt_tls_broker.c
│   └── coap_dtls/
│       └── coap_dtls_server.c
├── middleware/
│   ├── replay_protection.c
│   └── rate_limiting.c
└── scripts/
    ├── setup_gateway.sh
    └── test_network.sh
```

## License

MIT License

