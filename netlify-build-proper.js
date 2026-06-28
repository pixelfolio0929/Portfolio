#!/usr/bin/env node

/**
 * Netlify build script for static site deployment
 * This script generates the 'deploy' folder for drag-and-drop deployment to Netlify
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify build process...');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true });
    console.log('Removed .next directory');
  }
  
  if (fs.existsSync('deploy')) {
    fs.rmSync('deploy', { recursive: true });
    console.log('Removed deploy directory');
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Build the Next.js application with static export
  console.log('🏗️ Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('📁 The "deploy" folder has been generated and is ready for Netlify deployment.');
  console.log('   You can now drag and drop the "deploy" folder to Netlify for deployment.');
  
  // Verify the deploy folder exists
  if (fs.existsSync('deploy')) {
    console.log('✅ Verification: "deploy" folder exists and ready for deployment');
    
    // Show the size of the deploy folder
    const getFileSizeInMB = (folderPath) => {
      const files = fs.readdirSync(folderPath);
      let totalSize = 0;
      
      files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          totalSize += getFileSizeInMB(filePath);
        } else {
          totalSize += stats.size;
        }
      });
      
      return Math.round(totalSize / (1024 * 1024) * 100) / 100; // Size in MB
    };
    
    const sizeInMB = getFileSizeInMB('deploy');
    console.log(`📊 Generated "deploy" folder size: ${sizeInMB} MB`);
  } else {
    throw new Error('❌ "deploy" folder was not generated. Check build process.');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}