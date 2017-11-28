import axios from '../csurf/axios';

export function getExercises(musclegroup) {
  switch (musclegroup){
    case "Chest":
      musclegroup = 4
      break;
    case "Biceps":
      musclegroup = 1,13
      break;
    case "Triceps":
      musclegroup = 5
      break;
    case "Back":
      musclegroup = 12
      break;
    case "Shoulder":
      musclegroup = 2
      break;
    case "Quadriceps":
      musclegroup = 10
      break;
    case "Hamstring":
      musclegroup = 11;
      break;
    case "Abs":
      musclegroup = 6;
      break;
    case "Calfs":
      musclegroup = 7;
      break;
  }

  return axios.get(`https://wger.de/api/v2/exercise/?muscles=${musclegroup}&status=2&limit=40`)
      .then(({data}) => {
    return {
      type: 'GET_EXERCISE_LIST',
      exercises: data.results
    }
  })
}

export function getCurrentExercise(obj){
  return {
    type: "CHANGE_CURRENT_EXERCISE",
    currentExercise: obj
  }
}

export function getWorkoutSetup(obj){
  return {
    type: "CREATE_WORKOUT_SETUP",
    workoutSetup: obj
  }
}

export function addExcerciseToWorkoutDay(obj){
  return {
    type: "ADD_EXCERCISE_TO_WORKOUT_DAY",
    exercise: obj,
    workoutDay: obj.workoutday
  }
}

export function getUserWorkouts(){
  return axios.get('/userWorkouts').then(({data}) => {
    return {
      type: 'GET_USER_WORKOUTS',
      workouts: data
    }
  })
}

export function getUserFavorites(){
  return axios.get('/getFavoriteExercise').then(({data}) => {
    return {
      type: 'GET_USER_FAVORITES',
      favorites: data.favorites
    }
  })
}

export function additionalInfo(data){
  return {
    type: "CHANGE_ADD_INFO",
    newInfo: data.additionalInfo,
    workoutName : data.workoutName
  }
}

export function deleteWorkout(data){
  return {
    type: "DELETE_WORKOUT",
    workoutName : data
  }
}

export function emptyworkoutDay(){
  return {
    type: "EMPTY_WORKOUT_DAY"
  }
}
