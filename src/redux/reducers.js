export default function(state = {}, action) {

    if (action.type == 'GET_EXERCISE_LIST') {
        state = Object.assign({}, state, {
            exercises: action.exercises
        });
    }

    if(action.type == 'CHANGE_CURRENT_EXERCISE'){
      state = Object.assign({}, state, {
          currentExercise: action.currentExercise
      });
    }

    if(action.type == "CREATE_WORKOUT_SETUP"){
      state = Object.assign({}, state, {
          workoutSetup: action.workoutSetup
      });
    }

    if(action.type == "ADD_EXCERCISE_TO_WORKOUT_DAY"){
      const workoutDay = action.workoutDay;
      if(!state.workoutDay){
        state = Object.assign({}, state, {
            workoutDay: [action.exercise]
        });
      } else {
        state = Object.assign({}, state, {
            workoutDay: [...state.workoutDay, action.exercise]
        });
        }
      }

    if(action.type == "GET_USER_WORKOUTS"){
      state = Object.assign({}, state, {
          userWorkouts: action.workouts.data
      });
    }

    return state;

    }
