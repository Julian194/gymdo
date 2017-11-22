import React from 'react'
import axios from 'axios';


export default function ImageUpload(props) {

  const setFile = (e) => {
    var file = e.target.files[0];
    upload(file)
  }

  const upload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    axios.post('/uploadUserPicture',
    formData
    ).then(({data}) => {
      if(data.success){
        props.updateImg(data.url)
      }
    })
  }

  return(
    <div className="modal1">
      <h5>Want to change your image?</h5>
      <label className="waves-effect waves-light btn"  htmlFor="file"> Upload </label>
      <input type="file" id="file" onChange={setFile}></input>
    </div>
  )
}
