# Master Plan for Minion Manager

## Views

### GameBoard

* The gameboard contains a list of monsters by their particular name
  * For simplicity, they are not grouped by race but by direct entry
  * e.g. Orc and Orc berserker will be in different categories

## Components

* Banner
* Encounter
  * MonsterList
    * Monster
* Bestiary          -- view all monsters
  * StatBlock
* EncounterList     -- view all encounters
  * new Encounter form
* AddMonster
* AttackDisplay -- To-hit  and damage rolls
* SavesAndChecks

## Routes
All routes:

Banner

Individual Routes:

* Home '/'
    * EncountersList
* Encounter '/encounter/:id'
    * Encounter based on id
        * Monsterlist
            * Monster
        * Add Monster Button
    * AttackDisplay -- hidden until needed
    * SavesAndChecks -- hidden until needed
* Bestiary '/bestiary'
    * Stat block
    * specific monster '/bestiary/:id'
* AddMonster '/encounter/:id/add'

## Server

### Endpoints

Monsters

* GET /api/monsters
* GET /api/monsters/:name
* GET /api/monsters/:id 

* POST /api/monsters
* DELETE /api/monsters/:id
* PATCH /api/monsters/:id

* GET /api/encounter/:id
  * Stretch goal

Login

* POST /login
* POST /register
* GET /getuser
* POST /logout


## Database

### Schema

Users
* id serial primary key,
* auto0_id text,
* email text,
* profile_name text

Monsters
* id serial primary key,
* name text,
* health int,
* url text
* encounter_id references encounters (id),

Encounters
* id serial primary key,
* name text,
* user_id references users (id)

### Queries

```SQL
select * from encounters
where user_id = ${id}
```
```SQL
select * from monsters m
join encounters e
on m.encounter_id = e.id
where e.id = ${encounterId}
group by m.url
```
```SQL
update monsters
set 
name = ${name},
health = ${health},
where id = ${id}
```