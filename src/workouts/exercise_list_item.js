import React from 'react';

const ExerciseListItem = (props) => {
  const {exercise, onClick} = props
  return (
    <option id={exercise.id} key={exercise.id}>
      {exercise.name}
    </option>
  )
}

export default ExerciseListItem
