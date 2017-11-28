import React, {Component} from 'react'
import axios from '../csurf/axios';
import { getUserFavorites } from '../redux/actions';
import { connect } from 'react-redux';
import {Card, CardTitle, Col} from 'react-materialize';
import { Link } from 'react-router';


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.getUserFavorites()
  }


  render(){
    if(!this.props.favorites){
      return null
    }
    const {favorites} = this.props

    const cards = (
      <div>
      {favorites.map(favorite =>
        <div className="row">
          <div className="col s6 m6">
            <div className="card">
              <div className="card-image">
                <img style={{width:"100px", height:"auto", marginLeft: "15px"}}src={favorite.img_url}/>
              </div>
              <div className="card-content">
                <h5>{favorite.name}</h5>
              </div>
              <div className="card-action">
                <Link to={'/exercise/'+favorite.favorite_id}>Find out more</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      );

    return(
      <div>
      <h4>My favorite exercises</h4>
      {cards}
      </div>
    )
  }
}


const mapStateToProps = function(state) {
    return {
      favorites: state.favorites,
    }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getUserFavorites:() => dispatch(getUserFavorites()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
