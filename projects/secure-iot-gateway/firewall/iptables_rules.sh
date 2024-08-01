#!/bin/bash
# iptables firewall rules for IoT gateway

# Flush existing rules
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X

# Default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow MQTT-TLS
iptables -A INPUT -p tcp --dport 8883 -j ACCEPT

# Allow CoAP-DTLS
iptables -A INPUT -p udp --dport 5684 -j ACCEPT

# Allow HTTPS
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Log dropped packets
iptables -A INPUT -j LOG --log-prefix "IPTABLES-DROPPED: " --log-level 4

echo "iptables rules applied"

