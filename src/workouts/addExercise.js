import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getExercises , getCurrentExercise, addExcerciseToWorkoutDay} from '../redux/actions';
import ExerciseList from './exercise_list'
import {Row, Input} from 'react-materialize'


class AddExercise extends Component{
  constructor(props){
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      name: "",
      musclegroup: "",
      reps: "",
      sets: "",
      weight: "",
      pause: "",
      workoutday: ""
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.getCurrentExercise(this.state)
    this.props.addExcerciseToWorkoutDay(this.state)
    this.props.onClick()
  }

  handleInput(e){
    if(e.target.name=="musclegroup"){
      this.props.getExercises(e.target.value)
    }

    if(e.target.name=="name"){
      const val = this.props.exercises.filter(exe => exe.name == e.target.value);
      this.setState({id:val[0].id})
    }

    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    return(
      <div>
        <h5> Add Exercise </h5>
        <div class="row">
          <form onSubmit={ this.handleSubmit} className="col s12">
            <div className="row">
              <Row>
                <Input name="musclegroup" s={4} type='select' label="Muscle Group" onChange={this.handleInput} value={this.state.musclegroup}>
                  <option value="" disabled selected>Choose your option</option>
                  <option>Chest</option>
                  <option>Back</option>
                  <option>Biceps</option>
                  <option>Triceps</option>
                  <option>Quadriceps</option>
                  <option>Hamstring</option>
                  <option>Shoulder</option>
                </Input>

                <ExerciseList
                  {...this.props}
                  {...this.state}
                  handleInput = {this.handleInput}
                />
              </Row>

              <Row>
                <Input name="workoutday" s={4} type='select' label="Workout Day" onChange={this.handleInput}>
                  <option value="" disabled selected>Choose your option</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Input>
              </Row>

              <div className="row">
                <div className="input-field col s4">
                  <input type="text" name="reps" onChange={this.handleInput} value={this.state.reps} className="validate"/>
                  <label for="reps"> Reps </label>
                </div>

                <div className="input-field col s4">
                  <input type="text" name="sets" onChange={this.handleInput} value={this.state.sets}/>
                  <label for="sets"> Sets </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s4">
                  <input type="text" name="weight" onChange={this.handleInput} value={this.state.weight}/>
                  <label for="weight"> Weight </label>
                </div>

                <div className="input-field col s4">
                  <input type="text" name="pause" onChange={this.handleInput} value={this.state.pause}/>
                  <label for="pause"> Pause </label>
                </div>
              </div>

              <input type="submit" className="waves-effect waves-light btn"/>
            </div>
          </form>

        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    exercises : state.exercises
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getExercises: (x) => {dispatch(getExercises(x))},
    getCurrentExercise : (obj) => {dispatch(getCurrentExercise(obj))},
    addExcerciseToWorkoutDay : (obj) => {dispatch(addExcerciseToWorkoutDay(obj))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddExercise);
