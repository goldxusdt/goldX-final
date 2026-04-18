# Deployment Troubleshooting & Build Error Fixes

## Common Vercel Build Errors and Solutions

### Error 1: "Command not found: build"

**Cause:** package.json has placeholder build scripts

**Solution:** ✅ FIXED - Updated package.json with proper build scripts:
```json
{
  "scripts": {
    "dev": "vite --config vite.config.dev.ts",
    "build": "tsc -b && vite build --config vite.config.prod.ts",
    "preview": "vite preview --config vite.config.prod.ts"
  }
}
```

### Error 2: "Module not found: Can't resolve 'vite'"

**Cause:** Vite package is missing from dependencies.

**Solution:** Run `npm install` and ensure `vite` is in your `package.json`.

### Error 3: "Environment variables not defined"

**Cause:** Missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

**Solution:** Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`: https://gkmvncioffmvzxhuaohv.supabase.co
   - `VITE_SUPABASE_ANON_KEY`: [your key]
3. Redeploy

### Error 4: "TypeScript errors in build"

**Cause:** Strict TypeScript checking

**Solution:** Run type check locally first:
```bash
npm run type-check
```

Fix any TypeScript errors before deploying.

### Error 5: "Out of memory" during build

**Cause:** Large bundle size or memory-intensive build

**Solution:** 
1. Optimize build in vite.config.prod.ts (already configured with code splitting)
2. In Vercel, increase memory limit in project settings
3. Use dynamic imports for large components

### Error 6: "Failed to load module"

**Cause:** Incorrect import paths or missing dependencies

**Solution:**
1. Check all imports use correct paths
2. Verify all dependencies are in package.json
3. Use absolute imports with @ alias

### Error 7: "404 on page refresh"

**Cause:** SPA routing not configured

**Solution:** ✅ FIXED - Updated vercel.json with proper rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] Run `npm run lint` - all checks pass
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] Test build locally: `npm run build`
- [ ] Test preview: `npm run preview`

### 2. Environment Variables
- [ ] Create .env file with all required variables
- [ ] Add environment variables to deployment platform
- [ ] Verify Supabase credentials are correct
- [ ] Update VITE_APP_URL to production domain

### 3. Supabase Configuration
- [ ] All migrations applied
- [ ] RLS policies enabled
- [ ] Edge Functions deployed
- [ ] Secrets configured
- [ ] Storage buckets created
- [ ] Cron jobs scheduled

### 4. Security
- [ ] No sensitive data in code
- [ ] No API keys in frontend code
- [ ] RLS policies tested
- [ ] Admin routes protected
- [ ] CORS configured correctly

### 5. Performance
- [ ] Images optimized
- [ ] Code splitting configured
- [ ] Lazy loading implemented
- [ ] Bundle size acceptable (<500KB initial)

---

## Step-by-Step Deployment Guide

### Vercel Deployment

**Step 1: Prepare Project**
```bash
cd /path/to/project

# Install dependencies
npm install

# Test build
npm run build

# Test preview
npm run preview
```

**Step 2: Deploy to Vercel**

Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

Option B: Using GitHub Integration
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables
6. Click Deploy

**Step 3: Configure Environment Variables**
```bash
vercel env add VITE_SUPABASE_URL production
# Enter: https://gkmvncioffmvzxhuaohv.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Enter: [your anon key]

vercel env add VITE_APP_NAME production
# Enter: Gold X Usdt

vercel env add VITE_APP_URL production
# Enter: https://your-domain.vercel.app
```

**Step 4: Verify Deployment**
1. Check build logs for errors
2. Visit deployed URL
3. Test authentication
4. Test deposit/withdrawal flows
5. Check admin panel access

### Netlify Deployment

**Step 1: Prepare Project**
```bash
cd /path/to/project
npm install
npm run build
```

**Step 2: Deploy to Netlify**

Option A: Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

Option B: Using Drag & Drop
1. Build project: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist` folder

Option C: Using Git Integration
1. Push code to GitHub
2. Go to https://app.netlify.com/start
3. Connect your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables
6. Click Deploy

**Step 3: Configure Environment Variables**
```bash
netlify env:set VITE_SUPABASE_URL "https://gkmvncioffmvzxhuaohv.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your_anon_key"
netlify env:set VITE_APP_NAME "Gold X Usdt"
netlify env:set VITE_APP_URL "https://your-site.netlify.app"
```

**Step 4: Configure Redirects**

Already configured in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Build Optimization

### 1. Reduce Bundle Size

**Check current bundle size:**
```bash
npm run build
# Check dist folder size
du -sh dist
```

**Optimize imports:**
```typescript
// ❌ Bad - imports entire library
import _ from 'lodash';

// ✅ Good - imports only what's needed
import { debounce } from 'lodash';
```

**Use dynamic imports:**
```typescript
// ❌ Bad - loads immediately
import AdminPanel from '@/components/AdminPanel';

// ✅ Good - loads on demand
const AdminPanel = lazy(() => import('@/components/AdminPanel'));
```

### 2. Image Optimization

**Use WebP format:**
```bash
# Convert images to WebP
cwebp input.png -o output.webp
```

**Optimize images:**
```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize
imagemin public/images/* --out-dir=public/images/optimized
```

### 3. Code Splitting

Already configured in `vite.config.prod.ts`:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
        supabase: ['@supabase/supabase-js'],
        ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
      }
    }
  }
}
```

---

## Monitoring Deployment

### 1. Check Build Logs

**Vercel:**
```bash
vercel logs
```

**Netlify:**
```bash
netlify logs
```

### 2. Monitor Performance

**Lighthouse Audit:**
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

### 3. Error Tracking

**Set up Sentry (Optional):**
```bash
npm install @sentry/react

# In main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

---

## Rollback Strategy

### Vercel Rollback

**Option 1: Via Dashboard**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Option 2: Via CLI**
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Netlify Rollback

**Via Dashboard:**
1. Go to Deploys
2. Find previous working deploy
3. Click "Publish deploy"

### Git Rollback

```bash
# Revert to previous commit
git revert HEAD

# Push changes
git push origin main

# Trigger new deployment
```

---

## Common Runtime Errors

### Error: "Failed to fetch"

**Cause:** CORS or network issues

**Solution:**
1. Check Supabase URL is correct
2. Verify network connectivity
3. Check browser console for CORS errors
4. Ensure Supabase project is not paused

### Error: "Invalid API key"

**Cause:** Wrong or expired Supabase key

**Solution:**
1. Verify VITE_SUPABASE_ANON_KEY in environment variables
2. Check key in Supabase dashboard (Settings → API)
3. Redeploy with correct key

### Error: "Row Level Security policy violation"

**Cause:** Missing or incorrect RLS policies

**Solution:**
1. Check RLS policies in Supabase dashboard
2. Verify user authentication
3. Test policies in SQL editor
4. See BACKEND_SERVICE_DOCUMENTATION.md for correct policies

### Error: "Storage bucket not found"

**Cause:** KYC documents bucket not created

**Solution:**
```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('kyc-documents', 'kyc-documents', false);

-- Add RLS policies
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'kyc-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## Performance Optimization

### 1. Enable Caching

**Vercel (already configured in vercel.json):**
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Enable Compression

**Vercel:** Automatic gzip/brotli compression

**Netlify:** Automatic compression

**Custom Server (Nginx):**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

### 3. Optimize Database Queries

**Add indexes:**
```sql
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
```

**Use pagination:**
```typescript
// ❌ Bad - loads all transactions
const { data } = await supabase
  .from('transactions')
  .select('*');

// ✅ Good - loads paginated
const { data } = await supabase
  .from('transactions')
  .select('*')
  .range(0, 9)
  .order('created_at', { ascending: false });
```

---

## Security Hardening

### 1. Environment Variables

**Never commit .env files:**
```bash
# Add to .gitignore
.env
.env.local
.env.production
```

**Use different keys for different environments:**
- Development: Use test Supabase project
- Production: Use production Supabase project

### 2. Content Security Policy

**Add CSP headers in vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://gkmvncioffmvzxhuaohv.supabase.co"
        }
      ]
    }
  ]
}
```

### 3. Rate Limiting

**Implement in Edge Functions:**
```typescript
// In Edge Function
const rateLimitKey = `rate_limit:${email}`;
const attempts = await redis.get(rateLimitKey) || 0;

if (attempts > 5) {
  return new Response(
    JSON.stringify({ error: 'Too many requests' }),
    { status: 429 }
  );
}

await redis.setex(rateLimitKey, 3600, attempts + 1);
```

---

## Testing Checklist

### Before Deployment
- [ ] All pages load correctly
- [ ] Authentication works (signup, login, logout)
- [ ] Deposit flow works
- [ ] Withdrawal flow works
- [ ] Referral system works
- [ ] Admin panel accessible
- [ ] KYC upload works
- [ ] Support tickets work
- [ ] Email notifications send
- [ ] Mobile responsive
- [ ] Dark mode works

### After Deployment
- [ ] Production URL loads
- [ ] SSL certificate valid
- [ ] All API calls work
- [ ] Database connections work
- [ ] Edge Functions work
- [ ] File uploads work
- [ ] Email sending works
- [ ] Cron jobs running
- [ ] No console errors
- [ ] Performance acceptable

---

## Support Resources

### Documentation
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev
- Supabase Docs: https://supabase.com/docs

### Community
- Vercel Discord: https://vercel.com/discord
- Netlify Community: https://answers.netlify.com
- Supabase Discord: https://discord.supabase.com

### Monitoring Tools
- Vercel Analytics: Built-in
- Netlify Analytics: Built-in
- Google Analytics: https://analytics.google.com
- Sentry: https://sentry.io

---

**Document Version:** 1.0  
**Last Updated:** 2026-03-13  
**Maintained By:** Gold X Usdt Development Team
