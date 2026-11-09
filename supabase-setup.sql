-- Salle de Sport El-ichaa — Supabase setup
-- Run this script in Supabase SQL Editor as project owner.
create table if not exists public.site_content (
  id text primary key check (id = 'main'),
  content jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;

-- Public visitors may read the single public website content record.
drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select to anon, authenticated using (id = 'main');

-- Only explicitly allow-listed admin accounts can insert/update website content.
drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
on public.site_content for insert to authenticated
with check (id = 'main' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
on public.site_content for update to authenticated
using (id = 'main' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())))
with check (id = 'main' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));

-- Admins can verify their own allow-list membership; no client can add itself.
drop policy if exists "Admins can read own admin record" on public.site_admins;
create policy "Admins can read own admin record"
on public.site_admins for select to authenticated using (user_id = (select auth.uid()));

-- Create an admin login first in Authentication > Users, then copy that user's UUID
-- into this statement and run it as project owner in SQL Editor:
-- insert into public.site_admins (user_id) values ('PASTE_AUTH_USER_UUID_HERE');

-- Public storage bucket for website images.
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

-- Public visitors may view uploaded media. Only allow-listed admins may upload/update/delete.
drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media"
on storage.objects for select to public
using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
on storage.objects for insert to authenticated
with check (bucket_id = 'site-media' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
on storage.objects for update to authenticated
using (bucket_id = 'site-media' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())))
with check (bucket_id = 'site-media' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
on storage.objects for delete to authenticated
using (bucket_id = 'site-media' and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));