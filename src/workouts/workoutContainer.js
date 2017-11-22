import React, {Component} from 'react';
import { connect } from 'react-redux';
import { shipUserWorkout } from '../redux/actions';
import axios from 'axios';
import WorkoutTable from './workoutTable'


class WorkoutContainer extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    const {workoutDay,workoutSetup} = this.props
    const data = {
      workoutDay : workoutDay,
      workoutSetup: workoutSetup
    }

    axios.post('/userWorkoutPlan', {
         data:data
    })
  }

  render(){

    const {workoutSetup, workoutDay} = this.props
    if(!workoutSetup || !workoutDay){
      return null
    }

    const DAY1 = workoutDay.filter(exe => exe.workoutday == 1)
    const DAY2 = workoutDay.filter(exe => exe.workoutday == 2)
    const DAY3 = workoutDay.filter(exe => exe.workoutday == 3)
    const DAY4 = workoutDay.filter(exe => exe.workoutday == 4)
    const DAY5 = workoutDay.filter(exe => exe.workoutday == 5)
    const DAY6 = workoutDay.filter(exe => exe.workoutday == 6)

    const excerciseList1 = DAY1.map((exe) => {
      return <WorkoutTable exe={exe}/>
    })
    const excerciseList2 = DAY2.map((exe) => {
      return <WorkoutTable exe={exe}/>
    })
    const excerciseList3 = DAY3.map((exe) => {
      return <WorkoutTable exe={exe}/>
    })
    const excerciseList4 = DAY4.map((exe) => {
      return <WorkoutTable exe={exe}/>
    })
    const excerciseList5 = DAY5.map((exe) => {
      return <WorkoutTable exe={exe}/>
    })
    const excerciseList6 = DAY6.map((exe) => {
      return <WorkoutTable exe={exe}/>
    })


    return (
      <div>
        <h5>{workoutSetup.workoutTitle}</h5>
          <div className="row">
            <table className="striped col s12">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Musclegroup</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Day</th>
                </tr>
              </thead>
              {excerciseList1}
              {excerciseList2}
              {excerciseList3}
              {excerciseList4}
              {excerciseList5}
              {excerciseList6}
            </table>
          </div>

        <button className="waves-effect waves-light btn margintop" onClick={this.handleClick}>
          SAVE<i className="material-icons right">save</i>
        </button>
      </div>

    )
  }
}


const mapStateToProps = function(state){
  return {
    exercises : state.exercises,
    workoutSetup: state.workoutSetup,
    currentExercise: state.currentExercise,
    workoutDay: state.workoutDay
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    shipUserWorkout: (data) => dispatch(shipUserWorkout(data))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(WorkoutContainer);
