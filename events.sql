
create database if not exists events;
use events;
create table if not exists users(
    id_user int primary key auto_increment,
    user_name varchar(50) not null,
    user_login varchar(50) not null,
    user_email varchar(50) not null,
    user_password varchar(255) not null,
    user_role enum('admin','user') default 'user'
);
create table if not exists evenements(
    ID int primary key auto_increment,
    Titre varchar(100) not null,
    Description varchar(500) not null,
    Date date not null,
    gouvernorat varchar(500),
    imgevent varchar(255),
    heure varchar(100)
);