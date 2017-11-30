import React, {Component} from 'react';
import { Link } from 'react-router';
import axios from './csurf/axios';
import Logo from './logo';
import ProfilePic from './user/profilePic';
import ImageUpload from './user/imageUpload';
import CreateWorkout from './workouts/createWorkout'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      imageUploadHidden: true
    }
  }

  toggleImageUpload() {
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
      })
    })
  }

  render(){
    const children = React.cloneElement(this.props.children, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profilePicUrl: this.state.profilePicUrl,
      id: this.state.id,
    })

    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <Logo/>
            <a data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link  to="/my-workout">My Workouts</Link></li>
              <li><Link  to="/favorites">Favorites</Link></li>
              <li><Link  to="/create-workout">Create Workout</Link></li>
              <li><a href="/logout">Logout</a></li>
              <li><ProfilePic
                user={this.state}
                onClick={() => this.toggleImageUpload()}
              />
              </li>
            </ul>
          </div>
        </nav>

        {this.state.imageUploadHidden == false && <ImageUpload
          updateImg={url => this.setState({profilePicUrl:url, imageUploadHidden: !this.state.imageUploadHidden})}
          onClick={() => this.toggleImageUpload()}
        />}

        <div className="container">
          {children}
        </div>

      </div>
    )
  }
}
