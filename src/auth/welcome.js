import React from 'react';

export class Welcome extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="container center-align">
        <div className="row">
          <h3>GymDO - Your Workout Planner</h3>
          <h4>Sign up today!</h4>
        </div>
        {this.props.children}
      </div>
    )
  }
}
