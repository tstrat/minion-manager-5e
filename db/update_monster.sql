update monsters
set 
    name = ${name},
    health = ${health}
where id = ${id} returning *;