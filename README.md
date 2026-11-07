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
- Lightweight CSS design system
- Supabase planned for Auth, PostgreSQL, Storage and Edge Functions (not connected yet)
- AI provider adapter planned; no API key or provider configured yet

## Local development
The application scaffold will be added in the next implementation step.

## Project status
Phase 1 — repository initialized. Application code, authentication, database, AI provider and Android packaging have not yet been added.

## Security
Never put service-role keys or private API keys in browser code. All business operations must be validated server-side against the authenticated user, company tenant, role and confirmation state.
