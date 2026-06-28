#!/usr/bin/env node

// Build script to generate the 'out' folder for deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building project for deployment...');

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

// Helper function to copy files recursively with filter
function copyDirWithFilter(src, dest, filter) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirWithFilter(srcPath, destPath, filter);
    } else {
      if (!filter || filter(entry.name)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

try {
  // Clean previous builds
  console.log('Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true });
  }

  // Build the Next.js application
  console.log('Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Export process - copy necessary files to out directory
  console.log('Exporting static files to out directory...');
  
  // Create out directory if it doesn't exist
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }
  
  // Copy static assets
  if (fs.existsSync('.next/static')) {
    console.log('  Copying static assets...');
    copyDir('.next/static', 'deploy/_next/static');
  }

  // Copy HTML files from app directory
  if (fs.existsSync('.next/server/app')) {
    console.log('  Copying app HTML files...');
    copyDirWithFilter('.next/server/app', 'out', (name) => name.endsWith('.html'));
  }

  // Copy client chunks if they exist
  if (fs.existsSync('.next/server/chunks')) {
    console.log('  Copying client chunks...');
    copyDir('.next/server/chunks', 'out/_next/server/chunks');
  }

  // Copy public assets
  if (fs.existsSync('public')) {
    console.log('  Copying public assets...');
    copyDir('public', 'out');
  }

  // Ensure we have an index.html file
  if (!fs.existsSync('out/index.html')) {
    // Look for index.html in subdirectories
    const findIndexHtml = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (let entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const result = findIndexHtml(fullPath);
          if (result) return result;
        } else if (entry.name === 'index.html') {
          return fullPath;
        }
      }
      return null;
    };
    
    const indexPath = findIndexHtml('out');
    if (indexPath) {
      fs.copyFileSync(indexPath, 'out/index.html');
      console.log('  Copied index.html to root');
    }
  }

  console.log('Build and export completed successfully!');
  console.log('The "out" folder is ready for deployment.');
  console.log('You can now drag and drop the "out" folder to Netlify.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}