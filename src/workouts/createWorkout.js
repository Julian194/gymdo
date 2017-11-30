import React, {Component} from 'react';
import axios from '../csurf/axios';
import CreateWorkoutForm from './createWorkoutForm';
import WorkoutContainer from './workoutContainer'
import AddExercise from './addExercise';
import { connect } from 'react-redux';
import { getExercises } from '../redux/actions';

class CreateWorkout extends Component {
  constructor(props){
    super(props)
    this.state={
      showAddExercise: false,
      showCreateWorkoutForm: true
    }
    this.showAddExercise = this.showAddExercise.bind(this)
    this.showCreateWorkoutForm = this.showCreateWorkoutForm.bind(this)

  }

  componentDidMount(){
    this.props.getExercises()
  }

  showAddExercise(){
    this.setState({
      showAddExercise : !this.state.showAddExercise
    })
  }

  showCreateWorkoutForm(){
    this.setState({
      showCreateWorkoutForm : !this.state.showCreateWorkoutForm
    })
  }

  render(){
    return(
      <div className="create-workout-container">
        <h4>Create a new workout</h4>
        <p>Start with the basic layout of your workout.</p>
        <p>Click + to add a new exercise.</p>
        <p>Hit the save button once finished.</p>

        {this.state.showCreateWorkoutForm &&
        <CreateWorkoutForm
          onClick={() => this.showCreateWorkoutForm()}
        />}

        <WorkoutContainer />

        <button className="btn-floating btn-medium waves-effect waves-light red margintop" onClick={this.showAddExercise}>
          <i className="large material-icons">add</i>
        </button>

        {this.state.showAddExercise && <AddExercise
          onClick={() => this.showAddExercise()}
        />}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExercises: () => dispatch(getExercises())

  }
}

export default connect(null, mapDispatchToProps)(CreateWorkout);
