# Vercel Deployment Guide

## Overview
Our application is deployed on Vercel, a platform optimized for Next.js applications. This document explains how our deployment is configured and how to manage it.

## Deployment Architecture

### Automatic Deployments
- **Production**: Automatically deploys when code is pushed to the `main` branch
- **Preview**: Creates preview deployments for pull requests
- **Development**: Can be deployed from any branch for testing

### Vercel Integration
Our project includes Vercel-specific packages:
- `@vercel/analytics` - Performance monitoring
- `@vercel/speed-insights` - Speed insights and optimization

## Configuration

### Next.js Configuration
Our `next.config.mjs` is minimal but can be extended for Vercel-specific optimizations:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel-specific optimizations can be added here
}

export default nextConfig
```

### Environment Variables
Vercel automatically reads environment variables from your project settings. Set these in your Vercel dashboard:

#### Required Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION

# Email Service
RESEND_API_KEY
```

#### Optional Environment Variables
```env
# Analytics (if using)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID
```

## Deployment Process

### 1. Automatic Deployment
1. Push code to `main` branch
2. Vercel automatically detects changes
3. Builds and deploys to production
4. Sends deployment notifications

### 2. Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from current directory
vercel

# Deploy to production
vercel --prod
```

### 3. Preview Deployments
- Every pull request gets a preview URL
- Perfect for testing before merging
- Automatically deleted when PR is closed

## Build Configuration

### Build Command
```bash
npm run build
```

### Output Directory
Vercel automatically detects Next.js and uses the `.next` directory

### Node.js Version
Vercel automatically detects the Node.js version from `package.json`

## Performance Optimizations

### Image Optimization
- Next.js Image component automatically optimizes images
- Vercel provides global CDN for fast image delivery

### Code Splitting
- Next.js automatically splits code by route
- Vercel optimizes bundle delivery

### Caching
- Static assets are cached globally
- API routes can implement custom caching strategies

## Monitoring and Analytics

### Vercel Analytics
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Speed Insights
```typescript
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## Domain Management

### Custom Domains
1. Add domain in Vercel dashboard
2. Configure DNS records as instructed
3. Vercel handles SSL certificates automatically

### Subdomains
- `www.yourdomain.com` - Main application
- `api.yourdomain.com` - API routes (if needed)

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check environment variables
   - Verify all dependencies are in `package.json`
   - Check for TypeScript errors

2. **Environment Variable Issues**
   - Ensure all required variables are set in Vercel
   - Check variable names match exactly

3. **Performance Issues**
   - Use Vercel Analytics to identify bottlenecks
   - Implement proper caching strategies
   - Optimize images and assets

### Debugging Deployments
```bash
# View deployment logs
vercel logs

# Check deployment status
vercel ls
```

## Best Practices

### 1. Environment Management
- Use different environment variables for staging/production
- Never commit sensitive data to repository
- Use Vercel's environment variable encryption

### 2. Performance
- Implement proper loading states
- Use Next.js Image optimization
- Implement proper caching strategies

### 3. Monitoring
- Set up deployment notifications
- Monitor performance metrics
- Set up error tracking

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://nextjs.org/docs/deployment#vercel-recommended)
- [Vercel Support](https://vercel.com/support)
