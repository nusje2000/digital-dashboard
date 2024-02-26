#!/usr/bin/env bash

if ! sha1sum -c install.lock &> /dev/null; then
    echo "Invalid install.lock, updating dependencies."

    rm -rf ./*/*/node_modules
    rm -rf ./node_modules

    bun install --frozen-lockfile
    sha1sum bun.lockb > install.lock
else
    echo "Valid install.lock, skipping dependency update."
fi

tail -f /dev/null
