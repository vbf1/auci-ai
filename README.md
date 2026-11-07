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
