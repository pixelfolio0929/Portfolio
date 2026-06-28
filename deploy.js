#!/usr/bin/env node

/**
 * Comprehensive deployment script for drag-and-drop deployment to Netlify
 * This script generates the 'deploy' folder for easy deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive build process for Netlify deployment...');
console.log('');

// Helper function to copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true });
    console.log('  Removed .next directory');
  }
  
  if (fs.existsSync('deploy')) {
    fs.rmSync('deploy', { recursive: true });
    console.log('  Removed deploy directory');
  }
  console.log('');

  // Build the Next.js application with static export
  console.log('🏗️ Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('');

  // Ensure public assets are copied to deploy directory
  console.log('📂 Copying public assets...');
  if (fs.existsSync('public')) {
    copyDir('public', 'deploy');
    console.log('  Copied public assets to deploy directory');
  }
  console.log('');

  // Verify the deploy folder exists
  if (fs.existsSync('deploy')) {
    console.log('✅ Build completed successfully!');
    console.log('📁 The "deploy" folder has been generated and is ready for Netlify deployment.');
    
    // Show what's in the deploy folder
    console.log('');
    console.log('📋 Contents of the deploy folder:');
    const deployContents = fs.readdirSync('deploy');
    deployContents.forEach(item => {
      const stats = fs.statSync(path.join('deploy', item));
      if (stats.isDirectory()) {
        console.log(`  📁 ${item}/`);
      } else {
        console.log(`  📄 ${item}`);
      }
    });
    
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
    console.log('');
    console.log(`📊 Generated "deploy" folder size: ${sizeInMB} MB`);
    
    console.log('');
    console.log('🚀 Next steps for Netlify deployment:');
    console.log('1. Go to https://app.netlify.com/drop');
    console.log('2. Drag and drop the entire "deploy" folder to deploy');
    console.log('3. Your site will be live shortly!');
    
  } else {
    throw new Error('❌ "deploy" folder was not generated. Check build process.');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}