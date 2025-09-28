#!/bin/sh
echo "Building TypeScript..."
npm run build
echo "Starting backend server..."
node dist/index.js