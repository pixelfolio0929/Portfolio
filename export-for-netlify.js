#!/usr/bin/env node

/**
 * Specific export script for Netlify deployment
 * This script ensures the 'deploy' folder is properly generated
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify export process...');
console.log('');

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

  // Run the Next.js build with export
  console.log('🏗️ Building and exporting Next.js application...');
  execSync('npx next build', { stdio: 'inherit' });
  console.log('');

  // Check if deploy directory was created
  if (fs.existsSync('deploy')) {
    console.log('✅ Export completed successfully!');
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
    console.log('⚠️  "deploy" folder was not automatically generated.');
    console.log('This might be because your Next.js configuration needs adjustment.');
    console.log('');
    console.log('Try these steps:');
    console.log('1. Check that your next.config.mjs has: output: "export"');
    console.log('2. Run "npx next build" manually');
    console.log('3. If still not working, check Next.js documentation for static exports');
  }

} catch (error) {
  console.error('❌ Export failed:', error.message);
  process.exit(1);
}