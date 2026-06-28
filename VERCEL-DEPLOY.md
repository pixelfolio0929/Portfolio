# Vercel Deployment Instructions

## Prerequisites
- A Vercel account (free)
- Your code hosted on GitHub, GitLab, or Bitbucket

## Deployment Steps

1. **Push your code to a Git repository**
   Make sure all your code is pushed to a Git repository.

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/sign in
   - Click "New Project"
   - Import your Git repository

3. **Configure Project**
   - Vercel will automatically detect this is a Next.js project
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site automatically

## Benefits of Vercel for Next.js
- Zero configuration required
- Automatic optimizations
- Global CDN
- Instant cache invalidation
- Atomic deployments
- Built-in CI/CD
- Serverless functions support
- Automatic HTTPS

## Custom Domain
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables

Your site will be live at: `your-project.vercel.app`