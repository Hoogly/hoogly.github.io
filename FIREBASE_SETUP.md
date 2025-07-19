# Firebase Environment Setup

This project now uses environment variables for Firebase configuration instead of hardcoded values.

## Setup Instructions

1. Create a `.env` file in the root directory of the project
2. Add the following environment variables with your Firebase project values:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.asia-southeast1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Getting Firebase Configuration Values

1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview" to open Project settings
4. Scroll down to the "Your apps" section
5. If you don't have a web app, click "Add app" and select the web icon (</>)
6. Copy the configuration values from the provided config object

## Security Notes

- The `.env` file is already included in `.gitignore` to prevent committing sensitive data
- Never commit your actual Firebase configuration values to version control
- Use different Firebase projects for development, staging, and production environments

## Development vs Production

- For development: Use your development Firebase project
- For production: Use your production Firebase project
- You can create `.env.production` for production-specific values

## GitHub Actions Deployment

For automated deployments via GitHub Actions, you need to add the Firebase environment variables as GitHub secrets:

### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" → "Actions"
4. Click "New repository secret" for each of the following variables:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

5. Copy the values from your `.env` file (or Firebase console) into each corresponding secret

### Security Notes for GitHub Secrets

- GitHub secrets are encrypted and only accessible during workflow runs
- They are never exposed in logs or to users
- Use production Firebase project values for GitHub secrets
- Keep your development `.env` file for local development 