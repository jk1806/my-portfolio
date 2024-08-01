#!/usr/bin/env python3
"""
OTA Update Server
Handles secure firmware updates for embedded devices
"""

import os
import sys
import json
import hashlib
import argparse
from flask import Flask, request, jsonify, send_file
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend
import base64

app = Flask(__name__)

# Configuration
FIRMWARE_DIR = "firmware_updates"
KEYS_DIR = "keys"
MAX_FIRMWARE_SIZE = 512 * 1024  # 512 KB

class OTAServer:
    def __init__(self, port=8080):
        self.port = port
        self.firmware_versions = {}
        self.load_firmware_versions()
    
    def load_firmware_versions(self):
        """Load firmware version information"""
        version_file = os.path.join(FIRMWARE_DIR, "versions.json")
        if os.path.exists(version_file):
            with open(version_file, 'r') as f:
                self.firmware_versions = json.load(f)
    
    def save_firmware_versions(self):
        """Save firmware version information"""
        version_file = os.path.join(FIRMWARE_DIR, "versions.json")
        os.makedirs(FIRMWARE_DIR, exist_ok=True)
        with open(version_file, 'w') as f:
            json.dump(self.firmware_versions, f, indent=2)
    
    def get_firmware_info(self, version=None):
        """Get firmware information"""
        if version is None:
            # Return latest version
            if not self.firmware_versions:
                return None
            latest = max(self.firmware_versions.keys(), key=int)
            version = latest
        
        if version not in self.firmware_versions:
            return None
        
        info = self.firmware_versions[version].copy()
        info['version'] = version
        return info
    
    def verify_firmware_signature(self, firmware_path, signature_path):
        """Verify firmware signature"""
        try:
            # Load public key
            pub_key_path = os.path.join(KEYS_DIR, "boot_public_key.pem")
            with open(pub_key_path, 'rb') as f:
                public_key = serialization.load_pem_public_key(
                    f.read(), backend=default_backend())
            
            # Read firmware
            with open(firmware_path, 'rb') as f:
                firmware_data = f.read()
            
            # Read signature
            with open(signature_path, 'rb') as f:
                signature = f.read()
            
            # Verify signature
            public_key.verify(
                signature,
                firmware_data,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except Exception as e:
            print(f"Signature verification failed: {e}")
            return False

@app.route('/api/firmware/info', methods=['GET'])
def get_firmware_info():
    """Get firmware information"""
    version = request.args.get('version')
    server = app.config['ota_server']
    info = server.get_firmware_info(version)
    
    if info is None:
        return jsonify({'error': 'Firmware not found'}), 404
    
    return jsonify(info)

@app.route('/api/firmware/download', methods=['GET'])
def download_firmware():
    """Download firmware"""
    version = request.args.get('version')
    server = app.config['ota_server']
    info = server.get_firmware_info(version)
    
    if info is None:
        return jsonify({'error': 'Firmware not found'}), 404
    
    firmware_path = os.path.join(FIRMWARE_DIR, info['filename'])
    if not os.path.exists(firmware_path):
        return jsonify({'error': 'Firmware file not found'}), 404
    
    return send_file(firmware_path, as_attachment=True)

@app.route('/api/firmware/update', methods=['POST'])
def update_firmware():
    """Upload new firmware"""
    if 'firmware' not in request.files:
        return jsonify({'error': 'No firmware file'}), 400
    
    firmware_file = request.files['firmware']
    version = request.form.get('version')
    
    if not version:
        return jsonify({'error': 'Version required'}), 400
    
    # Save firmware
    os.makedirs(FIRMWARE_DIR, exist_ok=True)
    filename = f"firmware_v{version}.bin"
    firmware_path = os.path.join(FIRMWARE_DIR, filename)
    firmware_file.save(firmware_path)
    
    # Calculate hash
    with open(firmware_path, 'rb') as f:
        firmware_data = f.read()
        sha256_hash = hashlib.sha256(firmware_data).hexdigest()
    
    # Update version info
    server = app.config['ota_server']
    server.firmware_versions[version] = {
        'filename': filename,
        'size': len(firmware_data),
        'sha256': sha256_hash,
        'timestamp': os.path.getmtime(firmware_path)
    }
    server.save_firmware_versions()
    
    return jsonify({
        'success': True,
        'version': version,
        'sha256': sha256_hash
    })

def main():
    parser = argparse.ArgumentParser(description='OTA Update Server')
    parser.add_argument('--port', type=int, default=8080, help='Server port')
    parser.add_argument('--host', default='0.0.0.0', help='Server host')
    args = parser.parse_args()
    
    # Initialize server
    server = OTAServer(port=args.port)
    app.config['ota_server'] = server
    
    print(f"Starting OTA Server on {args.host}:{args.port}")
    app.run(host=args.host, port=args.port, debug=True)

if __name__ == '__main__':
    main()

