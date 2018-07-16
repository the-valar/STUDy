CREATE DATABASE IF NOT EXISTS greenfield;

USE greenfield;

CREATE TABLE state (
  id INT PRIMARY KEY AUTO_INCREMENT,
  state VARCHAR(255)
);

CREATE TABLE parks (
  id INT PRIMARY KEY,
  city VARCHAR(255),
  state VARCHAR(255),
  name VARCHAR(255),
  lat INT,
  lon INT,
  description VARCHAR(255),
  rating INT
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255)
);