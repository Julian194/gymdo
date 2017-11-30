import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUserWorkouts,additionalInfo ,deleteWorkout } from '../redux/actions';
import axios from '../csurf/axios';
import WorkoutTable from './workoutTable';
import { Collapsible, CollapsibleItem } from 'react-materialize';


class MyWorkouts extends Component{
  constructor(props){
    super(props)
    this.state = {
      additionalInfo: ""
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }

  componentDidMount(){
    this.props.getUserWorkouts()
  }

  handleClick(e){
    axios.post('/additionalInfo', {
      additionalInfo: this.state.additionalInfo,
      workoutName: e.currentTarget.name
    })

    const data= {
      additionalInfo: this.state.additionalInfo,
      workoutName: e.currentTarget.name
    }

    this.setState({additionalInfo: ""})
    this.props.additionalInfo(data)

  }

  handleDelete(e){
    axios.post('/deleteWorkout',{
      workoutName: e.currentTarget.name
    })
    this.props.deleteWorkout(e.currentTarget.name)
  }

  handleInput(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    const{userWorkouts} = this.props
    if(!userWorkouts){
      return null
    }

    const allWorkouts = Object.keys(userWorkouts).map(key => {
      let name =userWorkouts[key][0].workout_title
      let addInfo = userWorkouts[key][0].additional_info
      return(
        <Collapsible>
          <CollapsibleItem header={key} icon='fitness_center'>
            <div className="row">
              <WorkoutTable workout={userWorkouts[key]}/>
            </div>
            <div>Notes:{addInfo}</div>
            <div className="divider" />
            <div className="row">
              <div className="input-field col s12">
                <textarea id="textarea1"
                  className="materialize-textarea"
                  onChange={this.handleInput}
                  name="additionalInfo"
                  value={this.state.additionalInfo}>
                </textarea>
              </div>
            </div>
            <div className ="row">
              <button onClick={this.handleClick} className="btn waves-effect waves-light" type="submit" name={name}>
                Submit
                <i className="material-icons right">send</i>
              </button>
              <button onClick={this.handleDelete} className="btn waves-effect waves-light red darken-1" type="submit" name={name} style={{marginLeft: "15px"}}>
                Delete
                <i className="material-icons right">delete</i>
              </button>
            </div>
          </CollapsibleItem>
        </Collapsible>
      )
    })

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
        {allWorkouts}
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    userWorkouts: state.userWorkouts
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    getUserWorkouts: () => dispatch(getUserWorkouts()),
    additionalInfo : (data) => dispatch(additionalInfo(data)),
    deleteWorkout : (data) => dispatch(deleteWorkout(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyWorkouts);
