delete from monsters m
where m.id = ${id}
returning *;