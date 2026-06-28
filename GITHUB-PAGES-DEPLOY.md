# GitHub Pages Deployment Instructions

## Prerequisites
- A GitHub account
- Git installed on your computer

## Deployment Steps

1. **Prepare your repository**
   - Create a new repository on GitHub (public or private)
   - Initialize with a README if needed

2. **Update next.config.mjs for GitHub Pages**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     eslint: {
       ignoreDuringBuilds: true,
     },
     typescript: {
       ignoreBuildErrors: true,
     },
     images: {
       unoptimized: true,
     },
     // Enable static export for GitHub Pages
     output: 'export',
     // Set base path to your repository name (replace 'your-repo-name')
     basePath: '/your-repo-name',
     // Set asset prefix to your GitHub Pages URL (replace 'username')
     assetPrefix: '/your-repo-name/',
   }

   export default nextConfig
   ```

3. **Export your site**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**
   - Install gh-pages package:
     ```bash
     npm install gh-pages --save-dev
     ```
   
   - Add deployment scripts to package.json:
     ```json
     "scripts": {
       "build": "next build",
       "export": "next export",
       "deploy": "gh-pages -d deploy"
     }
     ```
   
   - Run deployment:
     ```bash
     npm run deploy
     ```

## Manual Deployment
1. Build and export your site:
   ```bash
   npm run build
   ```

2. Create a new branch named `gh-pages`:
   ```bash
   git checkout -b gh-pages
   ```

3. Commit and push the build files:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

4. Configure GitHub Pages:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "gh-pages" branch as source
   - Click "Save"

Your site will be live at: `https://username.github.io/your-repo-name/`