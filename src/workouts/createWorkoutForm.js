import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getWorkoutSetup } from '../redux/actions';
import {Row, Input} from 'react-materialize'


 class CreatWorkoutForm extends Component{
  constructor(props){
    super(props)
    this.state ={
     workoutTitle: "",
     workoutSplit: "",
    }
  this.handleInput = this.handleInput.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.getWorkoutSetup(this.state);
    this.props.onClick()
  }

  handleInput(e){
    this.setState({
     [e.target.name] : e.target.value
    })
  }

  render(){
   return(
    <div className="row">
      <form onSubmit={ this.handleSubmit} className="col s12">

        <div className="row">
          <div className="input-field col s6">
            <input name="workoutTitle" type="text" onChange={this.handleInput} value={this.state.workoutTitle} className="validate"/>
            <label>Workout Title</label>
          </div>
        </div>

        <Row>
          <Input name="workoutSplit" s={6} type='select' label="Workout Split" onChange={this.handleInput} value={this.state.workoutSplit}>
            <option value="" disabled selected>Choose your option</option>
            <option value="Upper/Lower">Upper/Lower</option>
            <option value="Push/Pull/Legs">Push/Pull/Legs</option>
            <option value="Custom">Custom</option>
          </Input>
        </Row>

        <input type="submit" className="waves-effect waves-light btn"/>
      </form>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWorkoutSetup : (obj) => {dispatch(getWorkoutSetup(obj))}
  }
}

export default connect(null,mapDispatchToProps)(CreatWorkoutForm);
