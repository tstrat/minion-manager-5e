insert into encounters (name, user_id)
values (${name}, ${userId}) returning *;