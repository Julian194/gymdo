import React from 'react';
import axios from './csurf/axios';
import Logo from './logo';
import ProfilePic from './user/profilePic';
import ImageUpload from './user/imageUpload';
import { Link } from 'react-router';
import CreateWorkout from './workouts/createWorkout'


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imageUploadHidden: true
    }
  }

  showImageUpload() {
    this.setState({
      imageUploadHidden: !this.state.imageUploadHidden
    })
  }

  componentDidMount(){
    axios.get('/user').then(({data}) => {
      this.setState({
        firstName: data.first,
        lastName: data.last,
        profilePicUrl: data.profilepicurl,
        id: data.id,
        titleimageurl: data.titleimageurl,
        updateTitleImg: url => this.setState({titleimageurl:url})
      })
    })
  }
  render(){
    const children = React.cloneElement(this.props.children, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profilePicUrl: this.state.profilePicUrl,
      id: this.state.id,
      titleimageurl: this.state.titleimageurl,
      updateTitleImg: url => this.setState({titleimageurl:url})

    })

    return(
      <div>
        <nav>
          <div className="nav-wrapper">
          <Logo/>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link  to="/my-workout">My Workouts</Link></li>
              <li><Link  to="/favorites">Favorites</Link></li>
              <li><Link  to="/create-workout">Create Workout</Link></li>
              <li><a href="/logout">Logout</a></li>
              <li><ProfilePic
                user={this.state}
                onClick={() => this.showImageUpload()}
              /></li>
            </ul>
          </div>
        </nav>

        {this.state.imageUploadHidden == false && <ImageUpload
          updateImg={url => this.setState({profilePicUrl:url, imageUploadHidden: !this.state.imageUploadHidden})}
          onClick={() => this.showImageUpload()}
        />}

        <div className="container">
          {children}
        </div>

      </div>
    )
  }
}
