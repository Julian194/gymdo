DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workout;
DROP TABLE IF EXISTS exercises;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first VARCHAR(300) not null,
  last VARCHAR(300) not null,
  email VARCHAR(300) not null UNIQUE,
  password VARCHAR(300) not null,
  profilepicurl VARCHAR(300),
  titleimageurl VARCHAR(300),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  musclegroup VARCHAR(300) not null,
  name VARCHAR(300) not null,
  external_id INT not null
);


CREATE TABLE workout(
  id SERIAL PRIMARY KEY,
  user_id INT not null,
  workout_id INT not null,
  workout_title VARCHAR(300) not null,
  muscle_group VARCHAR(300) not null,
  exercise INT not null,
  sets INT,
  reps INT ,
  pause INT ,
  weight INT ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
