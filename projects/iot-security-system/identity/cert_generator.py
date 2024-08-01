#!/usr/bin/env python3
"""Generate X.509 certificates for IoT device identity"""

from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend
import datetime

def generate_device_certificate(device_id, ca_key, ca_cert):
    """Generate a device certificate signed by CA"""
    # Generate device key
    device_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )
    
    # Create certificate
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "US"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "CA"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "IoT Devices"),
        x509.NameAttribute(NameOID.COMMON_NAME, f"device-{device_id}"),
    ])
    
    cert = x509.CertificateBuilder().subject_name(
        subject
    ).issuer_name(
        ca_cert.subject
    ).public_key(
        device_key.public_key()
    ).serial_number(
        x509.random_serial_number()
    ).not_valid_before(
        datetime.datetime.utcnow()
    ).not_valid_after(
        datetime.datetime.utcnow() + datetime.timedelta(days=365)
    ).add_extension(
        x509.SubjectAlternativeName([
            x509.DNSName(f"device-{device_id}.local"),
        ]),
        critical=False,
    ).sign(ca_key, hashes.SHA256(), default_backend())
    
    return cert, device_key

if __name__ == '__main__':
    print("Device certificate generator")
    # Implementation continues...

