# Deployment Guide

## Recommended Hosting

Use GitHub Pages, Netlify, Vercel, Firebase Hosting, or any static web host.

## GitHub Pages

1. Upload the full project to a GitHub repository.
2. Make sure `index.html`, `manifest.webmanifest`, `sw.js`, `css/`, `js/`, and `icons/` are in the repository root.
3. Go to repository `Settings`.
4. Open `Pages`.
5. Choose `Deploy from a branch`.
6. Select `main` and `/root`.
7. Save.
8. Wait for the published URL.

## Installing on Phones and Tablets

### iPhone and iPad

1. Open the GitHub Pages URL in Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Open the app from the home screen.

### Android

1. Open the GitHub Pages URL in Chrome.
2. Tap Install app or Add to Home screen.
3. Open the app from the launcher.

## Offline Mode

After the first successful load from a web address, the service worker caches the app shell. Lessons, profiles, progress, worksheets, badges, and certificates are stored locally with IndexedDB.

## Updating the App

When you change files, update the cache name in `sw.js`, then upload the new files. Installed devices may need one refresh to receive the latest version.

## Production Checklist

- Test on iPhone Safari, Android Chrome, tablet, laptop, and school computer
- Confirm install prompt appears on Android
- Confirm Add to Home Screen works on iOS
- Complete a lesson offline
- Complete a quiz offline
- Generate and print a worksheet
- Generate and print a certificate
- Add more curriculum content before wide school rollout
