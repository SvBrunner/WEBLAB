#!/bin/sh
set -eu

# ensure assets exists
mkdir -p /app/dist/assets

# write runtime env file
cat > /app/dist/assets/env.js <<EOF
window.__env = window.__env || {};
window.__env.API_BASE_URL = "${API_BASE_URL}";
EOF

# serve SPA
exec http-server dist -p 8080 -a 0.0.0.0 -c no-store --gzip --brotli -s
