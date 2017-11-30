import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Welcome } from './auth/welcome';
import {Login,Registration} from './auth/authForm';
import CreateWorkout from './workouts/createWorkout';
import MyWorkouts from './workouts/myWorkouts';
import ExerciseInfo from './workouts/exerciseInfo';
import App from './app';
import Dashboard from './workouts/dashboard';

// Redux Setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './redux/reducers';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

const notLoggedInRouter = (
    <Router history={hashHistory}>
      <Route path="/" component={Welcome}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration}/>
        <IndexRoute component={Registration} />
      </Route>
    </Router>
);

const loggedInRouter = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={CreateWorkout}/>
        <Route path="/favorites" component={Dashboard}/>
        <Route path="/exercise/:id" component={ExerciseInfo}/>
        <Route path="/create-workout" component={CreateWorkout} />
        <Route path="/my-workout" component={MyWorkouts} />
      </Route>
    </Router>
  </Provider>
);

let router;
if(location.pathname === '/welcome'){
  router = notLoggedInRouter
}
else{
  router = loggedInRouter
}

ReactDOM.render(
    router,
    document.querySelector('main')
);
