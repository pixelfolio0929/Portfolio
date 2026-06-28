#!/usr/bin/env node

/**
 * Simple build script to ensure deploy directory is created for Netlify deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting simple build process...');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true });
    console.log('  Removed .next directory');
  }
  
  // Run the Next.js build
  console.log('🏗️ Building Next.js application...');
  // Using npm instead of npx for better Windows compatibility
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}