# Environment Variables Setup

## App Name Configuration

The application name displayed in the header logo can be configured using environment variables.

### Local Development

In your `.env.local` file, add:

```
NEXT_PUBLIC_APP_NAME=Ecspedia Dev
```

### Vercel Deployment

To set "Ecspedia" for production and dev environments on Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Key**: `NEXT_PUBLIC_APP_NAME`
   - **Value**: `Ecspedia`
   - **Environments**: Select **Production** and **Preview** (or specific branches)
4. Click **Save**
5. Redeploy your application for changes to take effect

### Default Behavior

If `NEXT_PUBLIC_APP_NAME` is not set, the app will default to "Ecspedia Dev".

## How it Works

The `Logo.tsx` component reads the environment variable:

```typescript
const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Ecspedia Dev';
```

This ensures:

- ✅ Local development shows "Ecspedia Dev" (or custom name)
- ✅ Production/Dev on Vercel shows "Ecspedia" (when configured)
- ✅ Fallback to "Ecspedia Dev" if variable is not set









