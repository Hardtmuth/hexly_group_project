CREATE TABLE status(id integer PRIMARY KEY, name text);

create table task(id integer PRIMARY KEY, name text, status_id integer);

insert into status (name) values ('open'), ('closed');