#!/bin/bash
export VITE_PORT=5000
npx vite --port 5000 --host 0.0.0.0 "$@"
