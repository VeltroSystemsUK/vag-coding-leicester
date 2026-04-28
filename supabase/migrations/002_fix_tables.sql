-- Fix 1: Add missing columns to product_additions
alter table public.product_additions
  add column if not exists base_price text not null default '0',
  add column if not exists mobile_within_100 text not null default '0',
  add column if not exists mobile_over_100 text not null default '0',
  add column if not exists garage text not null default '0',
  add column if not exists include_installation boolean not null default true;

-- Fix 2: Drop the authenticated-only write policy on site_settings
-- and allow the anon key to write (consistent with all other tables)
drop policy if exists "Authenticated upsert site_settings" on public.site_settings;

create policy "Anon upsert site_settings"
  on public.site_settings for all
  using (true)
  with check (true);
