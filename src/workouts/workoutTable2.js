
import React, {Component} from 'react';
import { Link } from 'react-router';

const WorkoutTable2 = (props) => {
  const {exe} = props
  let musclegroup = exe[0].musclegroup;
  let workoutday = exe[0].workoutday;
  let exercise = exe[0].name;
  let sets = exe[0].sets == undefined ? "-" : exe[0].sets;
  let reps = exe[0].reps == undefined ? "-" : exe[0].reps;
  let weight = exe[0].weight == undefined ? "-" : exe[0].weight;

  return(
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
    <tbody>
      {createRows(exe)}

    </tbody>
    </table>
  )
}

function createRows(arr) {
  const rows =
    arr.map(exe => {
      return(
      <tr>
        <td><Link to={'/exercise/'+exe.id}>{exe.name}</Link></td>
        <td>{exe.musclegroup}</td>
        <td>{exe.sets}</td>
        <td>{exe.reps}</td>
        <td>{exe.weight}</td>
        <td>{exe.workout_id}</td>
      </tr>
      )
    })
    return rows
}

export default WorkoutTable2
