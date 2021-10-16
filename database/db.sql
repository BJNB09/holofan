CREATE DATABASE database_links;

USE database_links;

--USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL, 
    password VARCHAR(60) NOT NULL, 
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id); --CAMPO PRINCIPAL

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users; --PARA VER LA TABLA EN CMD

--LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL, 
    description TEXT,
    files BLOB;  
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp, 
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

--Constraint usa una ForeingKey de user, usando user_id referenciada de la tabla users y usando parametro id

ALTER TABLE links
    ADD PRIMARY KEY (ID);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE links; --PARA VER LA TABLA EN CMD


--Agregar columna varchar
ALTER TABLE links
ADD COLUMN file VARCHAR(15) AFTER description;

--Agregar columna blob
ALTER TABLE links
ADD COLUMN files BLOB AFTER description;

--Borrar columna
ALTER TABLE links
DROP COLUMN file;


--LINKS TABLE
CREATE TABLE docsdefault(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    files BLOB
);

--Constraint usa una ForeingKey de user, usando user_id referenciada de la tabla users y usando parametro id

ALTER TABLE docsdefault
    ADD PRIMARY KEY (id);

ALTER TABLE docsdefault
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;