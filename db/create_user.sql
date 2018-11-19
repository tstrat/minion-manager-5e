insert into users (auth0_id, name, email, picture)
values (${auth0_id}, ${name}, ${email}, ${picture}) returning *;