import React from 'react'
import TitleImage from './titleImage'
import TitleImageUpload from './titleImageUpload'

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
  }

  render(){
    if (!this.props.id) {
           return null;
       }

    return(
      <div>
        <TitleImage {...this.props}/>
        <TitleImageUpload {...this.props}/>
        <div className="profile">

        <div id="profilePicLg">
          <img src={this.props.profilePicUrl} alt={`${this.props.firstName} ${this.props.lastName}`}/>
        </div>

        <p id="username">{`${this.props.firstName} ${this.props.lastName}`}</p>

        </div>

      </div>
    )
  }
}
