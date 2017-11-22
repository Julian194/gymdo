const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || "postgres:juliankaiser:password@localhost:5432/gymdo");

module.exports.getExercises = function(){
  const select = "SELECT * FROM exercises"
  return db.query(select)
}

module.exports.serachExercise = function(name){
  const select = `SELECT name AS ExerciseName,musclegroup AS Musclegroup from exercises WHERE name ILIKE $1`
  return db.query(select,['%' + name + '%'])
}

module.exports.insertWorkout = function(userid,workoutid,workouttitle,musclegroup,exercise,sets,reps,pause,weight){
  const insert = `INSERT INTO workout (user_id, workout_id, workout_title, muscle_group, exercise, sets, reps,pause,weight)
                  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
  return db.query(insert, [userid,workoutid,workouttitle,musclegroup,exercise,sets,reps,pause,weight])
}

module.exports.insertExercise = function(musclegroup,exercise,id){
  const insert = `INSERT INTO exercises (musclegroup, name, external_id) VALUES ($1,$2,$3)`
  return db.query(insert, [musclegroup,exercise,id])
}

module.exports.getUserWorkouts = function (id){
  const select = `SELECT * FROM workout
                  JOIN exercises
                  ON (external_id = workout.exercise)
                  WHERE user_id = $1`
  return db.query(select, [id])
}
