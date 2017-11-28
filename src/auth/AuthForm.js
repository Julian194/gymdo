import React from 'react'
import axios from '../csurf/axios';
import { Link } from 'react-router'

const Login = wrapInAuthForm(LoginForm, '/login');
const Registration = wrapInAuthForm(RegistrationForm, '/register');

export {Login, Registration}


function wrapInAuthForm(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.url = url;
        }

        handleInput(e) {
          this[e.target.name] = e.target.value;
        }

        handleSubmit(e) {
          e.preventDefault()
          axios.post(this.url,  {
            first:this.first,
            last:this.last,
            email: this.email,
            password: this.password
        }).then((res)=> {
          if(res.data.success){
            location.replace('/')
          } else {
              this.setState({
                error:true
              })
            }
          })
        }

        render() {
            return <Component error={this.state.error}
            		    handleInput={e => this.handleInput(e)}
                    handleSubmit={ e => this.handleSubmit(e)} />;
        }
    }
}

function RegistrationForm({ handleInput, handleSubmit, error }) {
    return (
        <div className="container center-align">
          {error && <p style={{color:"red"}}>Something went wrong</p>}

            <form className="col s12">
              <div className="row center-align">
                <div className="input-field col s8 offset-s2">
                  <input type="text" name="first" onChange={handleInput} placeholder="First Name" className="validate"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s8 offset-s2">
                  <input type="text" name="last" onChange={handleInput} placeholder="Last Name" className="validate"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s8 offset-s2">
                  <input type="email" name="email" onChange={handleInput} placeholder="Email" className="validate"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s8 offset-s2">
                  <input type="password" name="password" onChange={handleInput} placeholder="Password" className="validate"/>
                </div>
              </div>
              <button className="waves-effect waves-light btn center-align" onClick={handleSubmit}> Register </button>

          </form>


          <p>Already a member? <Link to="/login">Please Login</Link></p>
      	</div>
    );
}

function LoginForm({ handleInput, handleSubmit, error }) {
    return (
        <div className="container center-align">
          {error && <p style={{color:"red"}}>Something went wrong</p>}
          <form className="col s12">
            <div className="row">
              <div className="input-field col s8 offset-s2">
                <input name="email"type="email" onChange={handleInput} placeholder="Email" className="validate"/>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s8 offset-s2">
                <input name="password" type="password" onChange={handleInput} placeholder="Password" className="validate"/>
              </div>
            </div>

            <button className="waves-effect waves-light btn center-align" onClick={handleSubmit}>Login</button>

            </form>

            <p>Register a new account? <Link to="/register">Please register</Link></p>

      	</div>
    );
}
