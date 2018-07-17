CREATE DATABASE IF NOT EXISTS greenfield;

USE greenfield;

CREATE TABLE location (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE rating (
  id INT PRIMARY KEY,
  coffeeTea INT,
  atmostphere INT,
  comfort INT,
  food INT,
  location INT,
  FOREIGN KEY location REFERENCES location(id)
);