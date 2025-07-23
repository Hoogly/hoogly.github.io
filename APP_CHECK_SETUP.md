# Firebase App Check with reCAPTCHA v3 Setup Guide

## Overview
This guide will help you set up Firebase App Check with Google reCAPTCHA v3 to protect your Firestore collections from abuse.

## Prerequisites
- Firebase project with Firestore enabled
- Google Cloud Console access
- Domain registered for production use

## Step 1: Set up Google reCAPTCHA v3

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" to create a new site
3. Configure the site:
   - **Label**: Your app name (e.g., "Hoogly Chat App")
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - For development: `localhost`
     - For production: `your-domain.com`
4. Accept the Terms of Service
5. Click "Submit"
6. Copy the **Site Key** (you'll need this for the environment variable)

## Step 2: Configure Firebase App Check

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Project Settings** > **App Check**
4. Click "Get started" if this is your first time
5. Select your web app
6. Choose **reCAPTCHA v3** as the provider
7. Enter the Site Key from Step 1
8. Save the configuration

## Step 3: Generate Debug Token (for localhost)

1. In Firebase Console > App Check
2. Click on your web app
3. Scroll down to "Debug tokens"
4. Click "Add debug token"
5. Give it a name (e.g., "Localhost Development")
6. Copy the generated debug token

## Step 4: Create Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Firebase Configuration (your existing values)
PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# App Check Configuration (new)
PUBLIC_RECAPTCHA_V3_SITE_KEY=your_recaptcha_v3_site_key_from_step_1
PUBLIC_APP_CHECK_DEBUG_TOKEN=your_debug_token_from_step_3
```

## Step 5: Enable App Check Enforcement

1. In Firebase Console > App Check
2. Click on **Firestore Database**
3. Click "Enforce" to enable App Check protection
4. Confirm the enforcement

## Step 6: Test the Implementation

1. Start your development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Open your browser and navigate to your chat app
3. Open browser developer tools and check for:
   - No App Check errors in console
   - Successful message sending
   - reCAPTCHA badge should appear (usually bottom right)

## How It Works

- **Development**: Uses debug token for localhost, bypassing reCAPTCHA
- **Production**: Uses reCAPTCHA v3 to generate App Check tokens
- **Protection**: All Firestore operations now require valid App Check tokens
- **Automatic**: reCAPTCHA tokens are refreshed automatically

## Troubleshooting

### Common Issues:

1. **"App Check token is invalid"**
   - Verify your site key is correct
   - Ensure your domain is added to reCAPTCHA console
   - Check that App Check is enabled for your app

2. **reCAPTCHA not loading**
   - Verify site key in environment variables
   - Check browser console for JavaScript errors
   - Ensure domain is whitelisted in reCAPTCHA console

3. **Localhost not working**
   - Verify debug token is set correctly
   - Ensure `localhost` is added to reCAPTCHA domains
   - Check that debug token is active in Firebase console

### Debug Mode:
If you need to debug App Check tokens, you can enable debug logging:

```javascript
// Add this temporarily to your firebase.ts file
import { getAppCheck, onTokenChanged } from 'firebase/app-check'

if (typeof window !== 'undefined') {
  const appCheck = getAppCheck(firebaseApp)
  onTokenChanged(appCheck, (token) => {
    console.log('App Check token changed:', token)
  })
}
```

## Security Notes

- Never commit your `.env` file to version control
- Rotate debug tokens regularly
- Monitor App Check usage in Firebase Console
- Consider setting up alerts for failed App Check validations

## Next Steps

After setup:
1. Monitor App Check metrics in Firebase Console
2. Set up production environment variables
3. Consider implementing additional security rules
4. Test thoroughly in staging environment before production deployment 