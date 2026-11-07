-- Auci AI — base multiempresa (rascunho revisado; ainda não aplicado)
-- Execute somente no projeto Supabase dedicado do Auci AI.
-- Todas as tabelas expostas têm RLS e grants mínimos explícitos.

create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_memberships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'manager', 'staff')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create index if not exists company_memberships_user_company_idx
  on public.company_memberships (user_id, company_id);

alter table public.companies enable row level security;
alter table public.company_memberships enable row level security;

-- A pessoa só enxerga empresas das quais já é membro.
create policy "company_members_can_read_company"
  on public.companies
  for select
  to authenticated
  using (
    created_by = (select auth.uid())
    or exists (
      select 1
      from public.company_memberships m
      where m.company_id = companies.id
        and m.user_id = (select auth.uid())
    )
  );

-- Um usuário autenticado só pode criar uma empresa em seu próprio nome.
create policy "users_can_create_own_company"
  on public.companies
  for insert
  to authenticated
  with check (created_by = (select auth.uid()));

-- Somente owner/admin podem editar dados básicos da empresa.
create policy "company_admins_can_update_company"
  on public.companies
  for update
  to authenticated
  using (
    exists (
      select 1 from public.company_memberships m
      where m.company_id = companies.id
        and m.user_id = (select auth.uid())
        and m.role in ('owner', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.company_memberships m
      where m.company_id = companies.id
        and m.user_id = (select auth.uid())
        and m.role in ('owner', 'admin')
    )
  );

-- Cada usuário consulta somente seu próprio vínculo.
-- Convites de outros funcionários serão criados futuramente por função server-side.
create policy "users_can_read_own_memberships"
  on public.company_memberships
  for select
  to authenticated
  using (user_id = (select auth.uid()));

-- Bootstrap seguro: o usuário só pode criar o próprio vínculo como owner
-- em uma empresa que ele mesmo acabou de criar.
create policy "company_creator_can_add_self_as_owner"
  on public.company_memberships
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and role = 'owner'
    and exists (
      select 1 from public.companies c
      where c.id = company_memberships.company_id
        and c.created_by = (select auth.uid())
    )
  );

grant select, insert, update on public.companies to authenticated;
grant select, insert on public.company_memberships to authenticated;

-- Não conceder acesso a anon. Não há políticas de DELETE nesta etapa.
