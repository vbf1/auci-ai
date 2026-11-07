# Auci AI

**O funcionário virtual que trabalha pela sua empresa.**

Auci AI is a multi-tenant business assistant, starting with a free-first MVP in Brazilian Portuguese.

## Principles
- Web first, Android-ready through Capacitor in a later phase.
- Incremental changes; preserve working code and configuration.
- Tenant isolation and server-side permission checks.
- AI can only invoke explicit, validated business tools.
- Sensitive operations require confirmation and are audited.
- No paid services, subscriptions, card registration, or billing without explicit owner approval.

## Initial stack
- React + Vite + TypeScript
- Firebase Authentication for email/password sign-up and login
- Cloud Firestore planned for company and business data (not connected yet)
- Firebase JavaScript SDK pinned in `package.json`
- AI provider adapter planned; no API key or provider configured yet

## Local development
```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` with the Firebase Web App configuration. Protect all data with Firebase Security Rules. Keep the project on the Spark plan and do not link a billing account.


## Firebase setup (owner action required)

1. Open the [Firebase Console](https://console.firebase.google.com/) and create a separate project named **Auci AI**. Keep it on the **Spark** plan; do not add a billing account or switch to Blaze.
2. In Project Overview, add a **Web app** and copy its configuration values.
3. Open **Authentication → Sign-in method** and enable **Email/Password**.
4. In **Authentication → Settings → Authorized domains**, add `vbf1.github.io`.
5. In the [Auci AI GitHub Actions variables](https://github.com/vbf1/auci-ai/settings/variables/actions), create these repository variables using the values from the Firebase Web App config: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`.
6. Save the variables. GitHub Actions will rebuild and republish the website automatically.

These Web App configuration values are intended for browser use. Do not put a Firebase Admin SDK private key or service-account JSON in repository variables or frontend code. The current step enables account registration/login only; company records and business data still need a Firestore database and restrictive Security Rules in a later step.

## Current status
- [x] Repository and initial responsive dashboard
- [x] Login and registration interface
- [x] Firebase Authentication adapter for email/password sessions
- [ ] Dedicated Auci AI Firebase project and Web App configuration
- [ ] Enable email/password provider in Firebase Authentication
- [ ] Cloud Firestore database and multi-tenant Security Rules
- [x] Local demonstration workspace: company setup, employee list, permission matrix and simulated assistant chat (session-only data)
- [ ] Company onboarding and membership flow
- [ ] AI assistant and validated business tools
- [ ] Android packaging
- [x] GitHub Actions workflow to validate TypeScript/build and publish the web app to GitHub Pages on pushes to main

The login and registration interface now uses Firebase Authentication, but it will only become live after the owner creates a separate Firebase project, registers a Web App, enables email/password sign-in, and adds its public Web App configuration to the GitHub Pages deployment environment. The "Explorar demonstração" entry opens a local-only workspace to preview navigation and onboarding; its temporary data is not persisted, does not send invitations, does not call an AI model, and does not execute business operations. `supabase/schema.sql` is a reviewed initial multi-tenant schema draft with RLS; it has not been applied or tested against a database. The Supabase SQL draft remains unused and has not been applied. Firebase's Spark plan includes no-cost Authentication options and Firestore daily quotas; exceeding Spark quotas shuts off the affected service until the next cycle, rather than automatically charging. Do not link a billing account or switch to Blaze. The latest production build completed successfully in GitHub Actions. GitHub Pages publication runs automatically after a successful build on pushes to main; the first deployment must complete before the public URL is available.

## Security
Never put service-role keys or private API keys in browser code. All business operations must be validated server-side against the authenticated user, company tenant, role and confirmation state.
