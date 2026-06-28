#!/usr/bin/env node

/**
 * Verification script to check if the build process creates the deploy directory correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build output...');

// Check if deploy directory exists
if (fs.existsSync('deploy')) {
  console.log('✅ "deploy" directory exists');
  
  // Check key files
  const keyFiles = ['index.html', '_next', '_redirects'];
  let allFound = true;
  
  keyFiles.forEach(file => {
    if (fs.existsSync(path.join('deploy', file))) {
      console.log(`✅ ${file} found`);
    } else {
      console.log(`❌ ${file} missing`);
      allFound = false;
    }
  });
  
  if (allFound) {
    console.log('🎉 Build verification successful! The "deploy" directory is ready for Netlify deployment.');
    console.log('');
    console.log('🚀 Next steps for Netlify deployment:');
    console.log('1. Go to https://app.netlify.com/drop');
    console.log('2. Drag and drop the entire "deploy" folder to deploy');
    console.log('3. Your site will be live shortly!');
  } else {
    console.log('⚠️  Some expected files are missing. Check the build process.');
  }
} else {
  console.log('❌ "deploy" directory not found. Run the build process first.');
  console.log('');
  console.log('To build for Netlify deployment, run one of these commands:');
  console.log('  Windows:   build-for-netlify.bat');
  console.log('  macOS/Linux: ./build-for-netlify.sh');
  console.log('  Any OS:    node build-for-netlify.js');
}