#!/usr/bin/env bash

if ! sha1sum -c install.lock &> /dev/null; then
    echo "Invalid install.lock, updating dependencies."

    rm -rf ./*/*/node_modules
    rm -rf ./node_modules

    npm ci 
    sha1sum package-lock.json > install.lock
else
    echo "Valid install.lock, skipping dependency update."
fi

npm run build:packages || exit 1

tail -f /dev/null
