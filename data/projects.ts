import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Secure Boot + Secure OTA Firmware System',
    description:
      'Complete software-only secure boot and OTA update system with firmware signing, encryption, rollback protection, and anti-tamper mechanisms. Includes bootloader, crypto library, OTA server/client, and QEMU simulation environment.',
    technologies: ['C', 'mbedTLS', 'Python', 'U-Boot', 'AES-GCM', 'RSA-2048', 'HMAC', 'CMake', 'QEMU'],
    githubUrl: 'https://github.com/jk1806/my-portfolio/tree/main/projects/secure-boot-ota',
    tagColor: 'green',
  },
  {
    id: '2',
    title: 'Hardened Linux Embedded Platform',
    description:
      'Comprehensive Linux security hardening system implementing SELinux/AppArmor policies, namespaces, cgroups, IMA/EVM integrity, filesystem encryption (dm-crypt/fscrypt), kernel hardening flags, and automated deployment scripts.',
    technologies: ['Linux', 'SELinux', 'Namespaces', 'cgroups', 'IMA/EVM', 'dm-crypt', 'Kernel Hardening', 'Shell Scripts'],
    githubUrl: 'https://github.com/jk1806/my-portfolio/tree/main/projects/hardened-linux-platform',
    tagColor: 'blue',
  },
  {
    id: '3',
    title: 'Secure IoT Gateway (Network Security Stack)',
    description:
      'Complete network security stack for IoT gateways with firewall rules (iptables/nftables), VPN tunnels (IPSec, WireGuard, OpenVPN), IDS/IPS (Snort/Suricata), secure protocols (TLS/DTLS, WPA3, QUIC), and IoT protocol security (MQTT-TLS, CoAP-DTLS).',
    technologies: ['iptables', 'nftables', 'WireGuard', 'OpenVPN', 'IPSec', 'Snort', 'Suricata', 'TLS/DTLS', 'WPA3', 'QUIC', 'MQTT', 'CoAP'],
    githubUrl: 'https://github.com/jk1806/my-portfolio/tree/main/projects/secure-iot-gateway',
    tagColor: 'purple',
  },
  {
    id: '4',
    title: 'End-to-End IoT Security System',
    description:
      'Complete end-to-end security system for IoT devices with X.509 certificate-based device identity, mutual TLS (mTLS), ECDH session key generation, secure telemetry channels, signed logging, JWT/HMAC API authentication, and automated provisioning workflow.',
    technologies: ['X.509', 'mTLS', 'ECDH', 'TLS', 'JWT', 'HMAC', 'RSA', 'Python', 'C'],
    githubUrl: 'https://github.com/jk1806/my-portfolio/tree/main/projects/iot-security-system',
    tagColor: 'green',
  },
  {
    id: '5',
    title: 'Embedded Security Testing & Analysis Toolkit',
    description:
      'Comprehensive security testing toolkit with static analysis (Cppcheck, clang-tidy), dynamic analysis (Valgrind, ASAN, UBSAN, MSAN), fuzzing (AFL, libFuzzer), penetration testing (Nmap, OpenVAS), reverse engineering (Ghidra, Radare2, Binwalk), and CI/CD integration.',
    technologies: ['Cppcheck', 'clang-tidy', 'Valgrind', 'ASAN', 'AFL', 'libFuzzer', 'Nmap', 'Ghidra', 'Radare2', 'Binwalk', 'GitHub Actions'],
    githubUrl: 'https://github.com/jk1806/my-portfolio/tree/main/projects/security-testing-toolkit',
    tagColor: 'blue',
  },
]

