#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Export static files (since output: 'export' is configured)
echo "Exporting static files..."
npm run export

echo "Build completed successfully!"
echo "Upload the 'out' directory to Netlify for deployment."