import React, {Component} from 'react';
import { connect } from 'react-redux';
import { emptyworkoutDay} from '../redux/actions';
import axios from '../csurf/axios';
import WorkoutTable2 from './workoutTable2'
import {Collapsible, CollapsibleItem} from 'react-materialize';


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
    this.props.emptyworkoutDay()
  }

  render(){
    let {workoutSetup, workoutDay} = this.props
    if(!workoutSetup || !workoutDay){
      return null
    }

    workoutDay = _.groupBy(workoutDay, "workoutday")

    const exerciseList = Object.keys(workoutDay).map(day => {
      return(
        <Collapsible>
          <CollapsibleItem header={day} icon='fitness_center'>
            <div className="row">
              <WorkoutTable2 exe={workoutDay[day]}/>
            </div>
          </CollapsibleItem>
        </Collapsible>
      )
    })

    return (
      <div>
          <div className="row">
            <h5>{workoutSetup.workoutTitle}</h5>
            {exerciseList}
          </div>

        <div className="row">
        <button className="waves-effect waves-light btn margintop" onClick={this.handleClick}>
          SAVE<i className="material-icons right">save</i>
        </button>

        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    workoutSetup: state.workoutSetup,
    workoutDay: state.workoutDay
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    emptyworkoutDay : () => dispatch(emptyworkoutDay())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkoutContainer);
