export default function(state = {}, action) {

  if (action.type == 'GET_EXERCISE_LIST') {
    state = Object.assign({}, state, {
      exercises: action.exercises
    });
  }

  if (action.type == 'GET_USER_FAVORITES') {
    state = Object.assign({}, state, {
      favorites: action.favorites
    });
  }

  if (action.type == 'CHANGE_CURRENT_EXERCISE') {
    state = Object.assign({}, state, {
      currentExercise: action.currentExercise
    });
  }

  if (action.type == "CREATE_WORKOUT_SETUP") {
    state = Object.assign({}, state, {
      workoutSetup: action.workoutSetup
    });
  }

  if (action.type == "ADD_EXCERCISE_TO_WORKOUT_DAY") {
    const workoutDay = action.workoutDay;
    if (!state.workoutDay) {
      state = Object.assign({}, state, {
        workoutDay: [action.exercise]
      });
    } else {
      state = Object.assign({}, state, {
        workoutDay: [...state.workoutDay, action.exercise]
      });
    }
  }

  if (action.type == "GET_USER_WORKOUTS") {
    state = Object.assign({}, state, {
      userWorkouts: _.groupBy(action.workouts.data, "workout_title")
    });
  }

  if (action.type == "CHANGE_ADD_INFO") {
    state = Object.assign({}, state, {
      userWorkouts: Object.assign({}, state.userWorkouts, {
        [action.workoutName]: state.userWorkouts[action.workoutName].map(function(item) {
          if (item.workout_title = action.workoutName) {
            return Object.assign({}, item, {
              additional_info: action.newInfo
            })
          }
          return item
        })
      })
    })
  }

  if(action.type == "DELETE_WORKOUT"){
    state = Object.assign({}, state, {
      userWorkouts: _.omit(state.userWorkouts, [action.workoutName])
    })
  }

  if(action.type == "EMPTY_WORKOUT_DAY"){
    state = Object.assign({}, state, {
      workoutDay: null
    })
  }

  return state;
}
