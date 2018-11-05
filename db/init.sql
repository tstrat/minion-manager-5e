drop table if exists users cascade;
drop table if exists monsters cascade;
drop table if exists encounters;

create table users (
    id serial primary key,
    auth0_id text,
    name text,
    email text
);

create table encounters (
    id serial primary key,
    name text,
    user_id  int references users (id)
);

create table monsters (
    id serial primary key,
    monster_name text,
    name text,
    health int,
    url text,
    encounter_id int references encounters (id) on delete cascade
);
