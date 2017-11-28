import React, {Component} from 'react';
import axios from '../csurf/axios';
import {Collection, CollectionItem, Row, Col,Preloader ,Badge} from 'react-materialize';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';
import { getUserFavorites } from '../redux/actions';

class ExerciseInfo extends Component{
  constructor(props){
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    const {id} = this.props.params;
    axios.post('/addFavorite', {
      favorite : id,
      url: this.state.url
    })
  }

  getExercise(id){
    axios.get(`https://wger.de/api/v2/exerciseinfo/${id}`).then(({data}) => {
      this.setState({
        name: data.name,
        category: data.category.name,
        equipment: data.equipment[0] == undefined ? "-" : data.equipment[0].name,
        muscles: data.muscles[0] == undefined ? "-" : data.muscles[0].name,
        secondaryMuscle: data.muscles_secondary[0] == undefined ?  "-" : data.muscles_secondary[0].name,
        description: data.description
      })
    })
    axios.get(`https://wger.de/api/v2/exerciseimage/?is_main=True&exercise=${id}`).then(({data})=> {
      this.setState({
        url: data.results[0] == undefined ? "http://www.crossfitatmkg.com/wp-content/uploads/2015/02/dumbbells-293955_640.png" : data.results[0].image
      })
    })
  }

  componentDidMount(){
    const {id} = this.props.params;
    this.getExercise(id)
    this.props.getUserFavorites()
    }

    render(){
      if(!this.state.name || !this.state.url){
        return (
          <Row>
            <Col s={4}>
		          <Preloader size='big'/>
	          </Col>
          </Row>
        )
      }

      // if(this.props.favorites.find(exe => exe.favorite_id !== this.props.params.id)){
      //   console.log("it is favorite")
      // }


      return(
        <div>
          <Collection header={this.state.name}>
            <CollectionItem><a onClick={this.handleClick} className="btn-floating btn-small waves-effect waves-dark red"><i className="material-icons">favorite</i></a> Remember me</CollectionItem>
          	<CollectionItem>Categroy: {this.state.category}</CollectionItem>
          	<CollectionItem>Muscle: {this.state.muscles}</CollectionItem>
            <CollectionItem>Secondary Muscle: {this.state.secondaryMuscle}</CollectionItem>
          	<CollectionItem>Description:{renderHTML(this.state.description)}</CollectionItem>
          	<CollectionItem>Equipment: {this.state.equipment}</CollectionItem>
          </Collection>
          <img src={this.state.url} style={{width:"300px"}}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(ExerciseInfo);
