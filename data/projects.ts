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
  {
    id: '6',
    title: 'ARM Architecture & Embedded Systems',
    description:
      'Comprehensive ARM architecture implementations including Cortex-M/A processors, MMU management, cache optimization, TrustZone security, NEON SIMD, and low-level system programming.',
    technologies: ['ARM', 'Cortex-M', 'Cortex-A', 'MMU', 'Cache', 'TrustZone', 'NEON', 'Assembly', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/arm_architecture',
    tagColor: 'purple',
  },
  {
    id: '7',
    title: 'Boot Systems & Architecture',
    description:
      'Complete boot system implementations including U-Boot, SPL/TPL, secure boot, DFU, fastboot, boot ROM, device tree, FIT/ITB, initramfs, and boot hardening mechanisms.',
    technologies: ['U-Boot', 'SPL/TPL', 'Secure Boot', 'DFU', 'Fastboot', 'Device Tree', 'FIT', 'Initramfs', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/boot_systems',
    tagColor: 'green',
  },
  {
    id: '8',
    title: 'Kernel Development & Linux Systems',
    description:
      'Linux kernel development including device drivers, memory management, process management, system calls, file systems, kernel modules, debugging, and embedded Linux configurations.',
    technologies: ['Linux Kernel', 'Device Drivers', 'Memory Management', 'System Calls', 'Kernel Modules', 'Yocto', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/kernel_systems',
    tagColor: 'blue',
  },
  {
    id: '9',
    title: 'Device Drivers & Hardware Interfacing',
    description:
      'Low-level device driver development with zero-copy DMA, scatter-gather operations, interrupt handling, PCIe device drivers, and hardware abstraction layers (HAL).',
    technologies: ['Device Drivers', 'DMA', 'Interrupts', 'PCIe', 'HAL', 'Hardware Interfacing', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/device_drivers',
    tagColor: 'purple',
  },
  {
    id: '10',
    title: 'Networking Stacks & IoT Protocols',
    description:
      'Complete networking stack implementations including L2/L3/L4 OSI layers, Ethernet, IP, TCP, lwIP stack, MQTT, CoAP, HTTP/2, WebSockets, QUIC, and TLS/DTLS.',
    technologies: ['lwIP', 'TCP/IP', 'MQTT', 'CoAP', 'HTTP/2', 'WebSockets', 'QUIC', 'TLS/DTLS', 'C', 'Python'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/networking_stacks',
    tagColor: 'green',
  },
  {
    id: '11',
    title: 'Wireless Protocols & RF Hardware',
    description:
      'Wireless protocol implementations including BLE, LoRaWAN, Zigbee, Thread, Matter, NB-IoT, Wi-Fi coexistence, and RF hardware design with antenna optimization and EMI/EMC considerations.',
    technologies: ['BLE', 'LoRaWAN', 'Zigbee', 'Thread', 'Matter', 'NB-IoT', '802.11', 'RF Hardware', 'Antenna Design', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/wireless_protocols',
    tagColor: 'blue',
  },
  {
    id: '12',
    title: 'Automotive Protocols & Systems',
    description:
      'Automotive embedded systems with ISO 26262 compliance, AUTOSAR architecture, UDS diagnostics, DoIP, SOME/IP, FlexRay, MOST, Ethernet AVB/TSN, and ISO 21434 cybersecurity.',
    technologies: ['ISO 26262', 'AUTOSAR', 'UDS', 'DoIP', 'SOME/IP', 'FlexRay', 'MOST', 'AVB/TSN', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/automotive_protocols',
    tagColor: 'purple',
  },
  {
    id: '13',
    title: 'RTOS Systems & Real-Time Programming',
    description:
      'Real-time operating system implementations including FreeRTOS, Zephyr, ThreadX with real-time scheduling, task management, inter-task communication, and real-time performance optimization.',
    technologies: ['FreeRTOS', 'Zephyr', 'ThreadX', 'RTOS', 'Real-Time', 'Scheduling', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/rtos_systems',
    tagColor: 'green',
  },
  {
    id: '14',
    title: 'PCIe Systems & High-Speed Interfaces',
    description:
      'PCIe protocol implementations for PCIe 4.0/5.0/6.0 including link training, error recovery, device enumeration, and high-speed data transfer optimization.',
    technologies: ['PCIe', 'PCIe 4.0', 'PCIe 5.0', 'PCIe 6.0', 'Link Training', 'Error Recovery', 'C'],
    githubUrl: 'https://github.com/jk1806/Portfolio/tree/main/pcie_systems',
    tagColor: 'blue',
  },
]

