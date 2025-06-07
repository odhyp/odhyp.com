#!/bin/bash

IP=$(ipconfig | grep "IPv4" | awk -F: '{gsub(/ /, "", $2); print $2}' | head -n 1)
echo "Local IP: $IP"

hugo server --bind 0.0.0.0 --baseURL "http://$IP:1313" --disableFastRender
