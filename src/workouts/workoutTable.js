import React, {Component} from 'react';
import { Link } from 'react-router';

const WorkoutTable = (props) => {
  const {exe} = props
  let musclegroup = exe.muscle_group || exe.musclegroup;
  let workoutday = exe.workout_id || exe.workoutday
  let exercise =  exe.name

  return(
    <tbody>
      <tr>
        <td><Link to={'/exercise/'+exe.external_id}>{exercise}</Link></td>
        <td>{musclegroup}</td>
        <td>{exe.sets}</td>
        <td>{exe.reps}</td>
        <td>{exe.weight}</td>
        <td>{workoutday}</td>
      </tr>
    </tbody>
  )
}

export default WorkoutTable
