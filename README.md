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
- Supabase Auth and PostgreSQL (connection pending)
- Supabase JavaScript SDK pinned in `package.json`
- AI provider adapter planned; no API key or provider configured yet

## Local development
```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` only with the Auci AI project's Supabase URL and publishable key. Never add a service-role or secret key to frontend environment variables.

## Current status
- [x] Repository and initial responsive dashboard
- [x] Login and registration interface
- [x] Supabase client adapter and session handling
- [x] Initial multi-tenant SQL design with RLS policies
- [ ] Dedicated Auci AI Supabase project
- [ ] Apply and verify database migration
- [ ] Company onboarding and membership flow
- [ ] AI assistant and validated business tools
- [ ] Android packaging

The login UI is prepared, but authentication is not live until the dedicated Supabase project is connected. The SQL migration is committed but has not been applied to a database. A production build has not yet been run.

## Security
Never put service-role keys or private API keys in browser code. All business operations must be validated server-side against the authenticated user, company tenant, role and confirmation state.
