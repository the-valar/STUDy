CREATE DATABASE IF NOT EXISTS greenfield;

USE greenfield;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
  id VARCHAR(255) PRIMARY KEY UNIQUE,
  name VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  coffeeTea INT,
  atmosphere INT,
  comfort INT,
  food INT,
  location VARCHAR(255),
  FOREIGN KEY (location) REFERENCES locations(id),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS users_locations (
  user_id INT,
  location_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  text VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  location VARCHAR(255),
  FOREIGN KEY (location) REFERENCES locations(id) 
);
