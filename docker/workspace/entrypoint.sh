#!/usr/bin/env bash

if ! sha1sum -c package-lock.json &> /dev/null; then
    echo "Invalid install.lock, updating dependencies."

    rm -rf ./*/*/node_modules
    rm -rf ./node_modules

    npm ci 
    sha1sum package-lock.json > install.lock
else
    echo "Valid install.lock, skipping dependency update."
fi

npm run build:packages

tail -f /dev/null
