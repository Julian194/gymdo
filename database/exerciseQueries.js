const spicedPg = require('spiced-pg');
const secrets = require('../secrets.json');

const db = spicedPg(`postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/gymdo`);

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
                  WHERE user_id = $1
                  ORDER BY workout_title`
  return db.query(select, [id])
}

module.exports.getWorkoutTitle = function(){
  const select = `SELECT workout_title, COUNT(*) FROM workout
                 GROUP BY workout_title
                 HAVING COUNT(*) > 1`
  return db.query(select)
}

module.exports.addFavoriteExercise = function(favorite_id, user_id, img_url){
  const insert = `INSERT INTO favorite_exercises (favorite_id, user_id, img_url) VALUES ($1,$2,$3)`
  return db.query(insert, [favorite_id,user_id, img_url])
}

module.exports.getFavoriteExercise = function(user_id){
  const select = `SELECT favorite_id, img_url, name FROM favorite_exercises
                  JOIN exercises
                  ON (external_id = favorite_id)
                  WHERE user_id = $1`
  return db.query(select, [user_id])
}

module.exports.insertAdditionalInfo = function(additionalInfo, workoutName){
  const insert = `UPDATE workout SET additional_info = $1 WHERE workout_title = $2 RETURNING additional_info`
  return db.query(insert, [additionalInfo, workoutName])
}

module.exports.deleteWorkout = function(workoutName){
  const remove = `DELETE FROM workout
                  WHERE workout_title = $1`
  return db.query(remove, [workoutName])
}
