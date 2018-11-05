select m.* from monsters m
join encounters e
on m.encounter_id = e.id
where e.id = ${encounterId}
order by m.monster_name asc;