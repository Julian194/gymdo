import React, {Component} from 'react';
import { getUserWorkouts } from '../redux/actions';
import { connect } from 'react-redux';
import WorkoutTable from './workoutTable';


class MyWorkouts extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getUserWorkouts()
  }

  render(){
    const{userWorkouts} = this.props
    if(!userWorkouts){
      return null
    }

    const Workout = userWorkouts.map(exe => {
      return <WorkoutTable exe={exe}/>
    })

    console.log(this.props.userWorkouts[0].workout_title);

    return(
      <div>
        <div className="row">
          <div className="col s4">
            <h4>My Workouts</h4>
          </div>
          <div className="col s4 push-s4">
            <h4>{this.props.firstName} {this.props.lastName}</h4>
          </div>

          <div className="col s4 push-s3">
            <img style={{width: "50px", marginTop:"10px"}}className="circle"src={this.props.profilePicUrl} />
          </div>
        </div>

        <div class="divider"></div>

        <div className="card-panel">
          <span style={{fontSize: "18px"}}className="blue-text text-darken-2">Workout Title: {this.props.userWorkouts[0].workout_title}</span>
        </div>

        <div className="row">
          <table className="highlight bordered col s12">
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
            {Workout}

          </table>
        </div>


      </div>
    )
  }

}

const mapStateToProps = function(state){
  return {
    exercises : state.exercises,
    workoutSetup: state.workoutSetup,
    currentExercise: state.currentExercise,
    workoutDay: state.workoutDay,
    userWorkouts: state.userWorkouts
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    getUserWorkouts: () => dispatch(getUserWorkouts())
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(MyWorkouts);
