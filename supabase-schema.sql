-- Run this in the Supabase SQL Editor to set up your database

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  company text,
  created_at timestamptz default now()
);

-- Spaces table
create table public.spaces (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  question text default 'What do you love about working with us?',
  thank_you_msg text default 'Thank you for your testimonial!',
  logo_url text,
  created_at timestamptz default now()
);

-- Testimonials table
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  space_id uuid references public.spaces(id) on delete cascade not null,
  author_name text not null,
  author_email text not null,
  author_title text,
  content text not null,
  rating integer default 5 check (rating >= 1 and rating <= 5),
  status text default 'unverified' check (status in ('unverified', 'pending', 'approved', 'rejected')),
  email_verified boolean default false,
  verification_token uuid,
  created_at timestamptz default now(),
  constraint unique_email_per_space unique (space_id, author_email)
);

-- Create profile automatically on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.spaces enable row level security;
alter table public.testimonials enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Spaces: users can CRUD their own spaces
create policy "Users can view own spaces"
  on public.spaces for select using (auth.uid() = user_id);
create policy "Users can create spaces"
  on public.spaces for insert with check (auth.uid() = user_id);
create policy "Users can update own spaces"
  on public.spaces for update using (auth.uid() = user_id);
create policy "Users can delete own spaces"
  on public.spaces for delete using (auth.uid() = user_id);

-- Spaces: public can read (for collect/embed pages)
create policy "Public can view spaces"
  on public.spaces for select using (true);

-- Testimonials: space owner can manage
create policy "Space owners can view testimonials"
  on public.testimonials for select
  using (
    exists (
      select 1 from public.spaces
      where spaces.id = testimonials.space_id
      and spaces.user_id = auth.uid()
    )
  );
create policy "Space owners can update testimonials"
  on public.testimonials for update
  using (
    exists (
      select 1 from public.spaces
      where spaces.id = testimonials.space_id
      and spaces.user_id = auth.uid()
    )
  );
create policy "Space owners can delete testimonials"
  on public.testimonials for delete
  using (
    exists (
      select 1 from public.spaces
      where spaces.id = testimonials.space_id
      and spaces.user_id = auth.uid()
    )
  );

-- Testimonials: anyone can insert (public form)
create policy "Anyone can submit testimonial"
  on public.testimonials for insert with check (true);

-- Testimonials: public can read approved ones (for embed)
create policy "Public can view approved testimonials"
  on public.testimonials for select
  using (status = 'approved');

-- Indexes
create index idx_spaces_user_id on public.spaces(user_id);
create index idx_spaces_slug on public.spaces(slug);
create index idx_testimonials_space_id on public.testimonials(space_id);
create index idx_testimonials_status on public.testimonials(status);
