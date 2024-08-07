create table appuser(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    isDeletable varchar(20),
    UNIQUE (email),
    role VARCHAR(20),
);

insert into appuser (name, email, password, status, isDeletable) values ('Admin','admin@gmail.com', 'admin', 'true', 'false','admin');

create table category(
    id int primary key AUTO_INCREMENT,
    name varchar(255) NOT NULL
);

create table article(
    id int primary key AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content LONGTEXT NOT NULL,
    categoryId integer NOT NULL,
    publication_date DATE,
    status varchar(20),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES appuser(id)
);