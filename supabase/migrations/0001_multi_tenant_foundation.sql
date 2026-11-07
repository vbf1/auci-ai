-- Auci AI: initial multi-tenant foundation
-- Apply only after creating the dedicated Auci AI Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  owner_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_memberships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('owner','admin','manager','staff')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create index if not exists company_memberships_user_company_idx on public.company_memberships(user_id, company_id);

alter table public.companies enable row level security;
alter table public.company_memberships enable row level security;

revoke all on public.companies from anon;
revoke all on public.company_memberships from anon;
grant select, insert, update on public.companies to authenticated;
grant select, insert on public.company_memberships to authenticated;

create policy "members can read their companies" on public.companies
  for select to authenticated using (
    exists (select 1 from public.company_memberships m
      where m.company_id = companies.id and m.user_id = (select auth.uid()))
  );

create policy "authenticated users can create a company for themselves" on public.companies
  for insert to authenticated with check (owner_id = (select auth.uid()));

create policy "owners and admins can update company details" on public.companies
  for update to authenticated
  using (exists (select 1 from public.company_memberships m
    where m.company_id = companies.id and m.user_id = (select auth.uid()) and m.role in ('owner','admin')))
  with check (exists (select 1 from public.company_memberships m
    where m.company_id = companies.id and m.user_id = (select auth.uid()) and m.role in ('owner','admin')));

create policy "users can read their own memberships" on public.company_memberships
  for select to authenticated using (user_id = (select auth.uid()));

create policy "company creator can add their initial owner membership" on public.company_memberships
  for insert to authenticated with check (
    user_id = (select auth.uid()) and role = 'owner'
    and exists (select 1 from public.companies c
      where c.id = company_id and c.owner_id = (select auth.uid()))
  );

-- No client-side membership UPDATE/DELETE or invitation policy yet.
-- Team administration and invitations will be implemented server-side with audited checks.
