# Deployment Guide

## Deploy to Vercel (Recommended)

### Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default)
   - Directory? (Press Enter for current directory)

5. Your site will be deployed and you'll get a URL like:
   - `https://your-project-name.vercel.app`

### Using Vercel Website

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up/Login with GitHub
4. Click "Add New Project"
5. Import your repository
6. Click "Deploy"
7. Get your shareable link!

## Other Deployment Options

### Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Deploy!

### GitHub Pages (requires static export)

1. Update `next.config.js`:
```js
module.exports = {
  output: 'export',
}
```

2. Build:
```bash
npm run build
```

3. Deploy the `out` folder to GitHub Pages

## Custom Domain

After deployment, you can add a custom domain:
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain Management

