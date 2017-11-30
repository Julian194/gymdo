import React, {Component} from 'react';
import { Link } from 'react-router';

const WorkoutTable2 = (props) => {
  const {exe} = props

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
        <td><Link to={'/exercise/'+exe.external_id}>{exe.name}</Link></td>
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
