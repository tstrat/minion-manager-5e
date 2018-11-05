insert into monsters (monster_name, name, health, url, encounter_id)
values (${monsterName}, ${name}, ${health}, ${url}, ${encounterId}) returning *;