import React from 'react';
import ExercisListItem from './exercise_list_item'
import {Row, Input} from 'react-materialize'


const ExerciseList = (props) => {
  if(props.exercises == undefined){
    return null
  }

    const ExerciseListItems = props.exercises.map((exercise) => {
      return <ExercisListItem  exercise={exercise}/>
    });


    return(
        <Input name="name" s={4} type='select' label="Excercise" onChange={props.handleInput} >
          <option value="" disabled selected>Choose your option</option>
          {ExerciseListItems}
        </Input>
    )
  }


export default ExerciseList;
