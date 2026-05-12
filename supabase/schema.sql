create extension if not exists "uuid-ossp";

create table roles (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null
);

create table schools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  location text,
  created_at timestamptz default now()
);

create table users (
  id uuid primary key,
  school_id uuid references schools(id),
  role_id uuid references roles(id),
  full_name text not null,
  email text unique not null,
  created_at timestamptz default now()
);

create table pillars (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text not null
);

create table languages (
  code text primary key,
  name text not null
);

create table learning_resources (
  id uuid primary key default uuid_generate_v4(),
  uploaded_by uuid references users(id),
  pillar_id uuid references pillars(id),
  language_code text references languages(code),
  title text not null,
  file_url text not null,
  created_at timestamptz default now()
);

create table garden_activities (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  created_by uuid references users(id),
  title text not null,
  description text,
  activity_date date,
  created_at timestamptz default now()
);

create table announcements (
  id uuid primary key default uuid_generate_v4(),
  posted_by uuid references users(id),
  title text not null,
  content text not null,
  audience text,
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid references users(id),
  recipient_id uuid references users(id),
  body text not null,
  created_at timestamptz default now()
);

insert into roles (name) values
('admin'), ('school'), ('teacher'), ('parent'), ('community_partner');

insert into pillars (name, description) values
('AgriShine', 'School gardens, agrivoltaics, food-energy-water learning'),
('AgriAble', 'Inclusion, accessibility, special needs support, adaptive learning'),
('AgriNext', 'STEM, innovation, digital agriculture, youth skills'),
('AgriRoots', 'Culture, language, local knowledge, food heritage, community values');

insert into languages (code, name) values
('en', 'English'), ('fr', 'French'), ('yo', 'Yoruba'), ('ig', 'Igbo'), ('ha', 'Hausa'), ('de', 'German');
