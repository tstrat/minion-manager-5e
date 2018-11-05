insert into users (auth0_id, name, email)
values (${auth0Id}, ${name}, ${email}) returning *;