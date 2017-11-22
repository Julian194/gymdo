const exercises = require('./exercises.json')
const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || "postgres:juliankaiser:password@localhost:5432/gymdo");

let chest = exercises.chest
let back = exercises.back
let shoulder = exercises.shoulder
let quadriceps = exercises.quadriceps
let hamstring = exercises.hamstring
let biceps = exercises.biceps
let triceps = exercises.triceps

const insertExercise = function(exercise, muscleGroup){
  const insert = "INSERT INTO exercises (name,muscleGroup) VALUES ($1, $2)"
  return db.query(insert, [exercise, muscleGroup])
}

chest.forEach(exe => insertExercise(exe, "Chest"));

back.forEach(exe => insertExercise(exe, "Back"));

shoulder.forEach(exe => insertExercise(exe, "Shoulder"));

quadriceps.forEach(exe => insertExercise(exe, "Quadriceps"));

hamstring.forEach(exe => insertExercise(exe, "Hamstring"));

biceps.forEach(exe => insertExercise(exe, "Biceps"));

triceps.forEach(exe => insertExercise(exe, "Triceps"));
