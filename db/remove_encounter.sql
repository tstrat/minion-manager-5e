delete from encounters
where id = ${id} returning *;