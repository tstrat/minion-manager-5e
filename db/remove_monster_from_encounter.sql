delete from monsters m
where m.encounter_id = ${encounterId}
returning *;