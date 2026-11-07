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
- [ ] Dedicated Auci AI Supabase project (blocked by the organization's two active Free projects)
- [ ] Apply and verify the reviewed SQL schema
- [x] Local demonstration workspace: company setup, employee list, permission matrix and simulated assistant chat (session-only data)
- [ ] Company onboarding and membership flow
- [ ] AI assistant and validated business tools
- [ ] Android packaging
- [x] GitHub Actions workflow to validate TypeScript and build the web app on pushes and pull requests

The login UI is prepared, but authentication is not live until a dedicated Auci AI Supabase project is connected. The "Explorar demonstração" entry opens a local-only workspace to preview navigation and onboarding; its temporary data is not persisted, does not send invitations, does not call an AI model, and does not execute business operations. `supabase/schema.sql` is a reviewed initial multi-tenant schema draft with RLS; it has not been applied or tested against a database. The VBF organization is on the Free plan and currently has two active projects, so a new project must not be created until free capacity is available. A production build has not yet been run.

## Security
Never put service-role keys or private API keys in browser code. All business operations must be validated server-side against the authenticated user, company tenant, role and confirmation state.
