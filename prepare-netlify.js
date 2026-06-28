#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📦 Preparing files for Netlify drag-and-drop deployment...');

// Create deploy directory if it doesn't exist
if (!fs.existsSync('deploy')) {
  fs.mkdirSync('deploy');
  console.log('✅ Created deploy directory');
}

// Copy all files from public to deploy
const publicDir = 'public';
const deployDir = 'deploy';

fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error('❌ Error reading public directory:', err);
    process.exit(1);
  }

  files.forEach(file => {
    const sourcePath = path.join(publicDir, file);
    const destPath = path.join(deployDir, file);
    
    // Copy file
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied ${file}`);
  });

  console.log('\n✅ Files prepared for Netlify deployment!');
  console.log('\n📁 The "deploy" folder is ready for drag-and-drop deployment to Netlify.');
  console.log('\n📋 To deploy to Netlify:');
  console.log('  1. Go to https://app.netlify.com');
  console.log('  2. Drag and drop the "deploy" folder to the deployment area');
  console.log('  3. Wait for deployment to complete');
  console.log('  4. Visit your site!');
});