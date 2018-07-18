CREATE DATABASE IF NOT EXISTS greenfield;

USE greenfield;

CREATE TABLE IF NOT EXISTS location (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rating (
  id INT PRIMARY KEY,
  coffeeTea INT,
  atmostphere INT,
  comfort INT,
  food INT,
  location INT,
  FOREIGN KEY (location) REFERENCES location(id)
);

CREATE TABLE  IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(32) NOT NULL,
  location INT,
  FOREIGN KEY (location) REFERENCES location(id)
);
