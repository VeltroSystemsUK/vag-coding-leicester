-- site_settings: single-row table for all CMS settings
create table if not exists public.site_settings (
  id integer primary key default 1,
  settings jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

alter table public.site_settings enable row level security;

-- Anyone can read the site settings (needed for public pages)
create policy "Public read site_settings"
  on public.site_settings for select
  using (true);

-- Only authenticated users can insert/update
create policy "Authenticated upsert site_settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Seed a default empty row so upsert always works
insert into public.site_settings (id, settings)
values (1, '{}')
on conflict (id) do nothing;
