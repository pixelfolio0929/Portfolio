# Portfolio Website Deployment Guide

This guide explains how to deploy your portfolio website using various methods.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Quick Start

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Deploy using drag-and-drop method:
   ```bash
   npm run deploy:dragdrop
   ```

3. Upload the generated `deploy` folder to Netlify:
   - Visit [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `deploy` folder
   - Your site will be live shortly

## Deployment Methods

### 1. Drag-and-Drop Deployment (Netlify)

This is the simplest method for deploying to Netlify:

```bash
npm run deploy:dragdrop
```

The script will:
- Clean previous builds
- Build the Next.js application
- Generate static files in the `deploy` directory
- Copy all public assets
- Display deployment instructions

### 2. GitHub Pages Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

### 3. Netlify Programmatic Deployment

Build specifically for Netlify:

```bash
npm run build:netlify
```

## Environment Variables

For the contact form to work, you need to set up email credentials:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

Note: For Gmail, you need to use an App Password, not your regular password. Generate one at: https://myaccount.google.com/apppasswords

## Build Process Details

The deployment script (`deploy.js`) performs the following steps:

1. **Clean Build Artifacts**
   - Removes `.next` directory
   - Removes `deploy` directory

2. **Build Application**
   - Runs `next build` with static export configuration
   - Generates static HTML, CSS, and JavaScript files

3. **Copy Public Assets**
   - Copies all files from `public` directory to `deploy`
   - Includes images, PDFs, and redirect configuration

4. **Verify Build**
   - Checks that `deploy` directory was created successfully
   - Lists contents and shows total size

## Troubleshooting

### Dependency Installation Issues

If you encounter peer dependency conflicts:

```bash
npm install --legacy-peer-deps
```

### Build Failures

If the build fails:

1. Ensure Node.js version is 18 or higher
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install --legacy-peer-deps
   ```

### Missing Assets

If assets are missing after deployment:

1. Verify `public` directory contents
2. Check that the copy function in `deploy.js` is working
3. Ensure `_redirects` file is present for client-side routing

## Deployment Verification

After deployment, verify that:

1. All pages load correctly
2. Images and assets display properly
3. Contact form submits successfully
4. Theme toggle works
5. Mobile responsiveness is maintained

## Custom Domain Setup

### Netlify

1. Go to your site settings in Netlify
2. Navigate to "Domain Management"
3. Add your custom domain
4. Follow Netlify's DNS configuration instructions

### GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages"
3. Under "Custom domain", enter your domain
4. Update your DNS records with your DNS provider

## Support

For issues with deployment, check:
1. This documentation
2. Console output during build process
3. Netlify/GitHub Pages documentation

If you continue to have issues, please open an issue with:
- Error messages
- Steps you've taken
- Environment information (Node.js version, OS, etc.)