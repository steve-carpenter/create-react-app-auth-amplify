import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import ReactJson from 'react-json-view';
Amplify.configure(aws_exports);

class App extends Component {

  componentDidMount() {
    this.getUserInfo();
    this.getSessionInfo();
    this.getUserCreds();
    }

state = {}

getUserInfo(){
  console.log(Auth.currentAuthenticatedUser());
  Auth.currentAuthenticatedUser().then((res)=>{
    console.log(res);
    this.setStateAsync({user: res.username});
  });
}

getSessionInfo(){
  console.log(Auth.currentSession());
  Auth.currentSession().then((res)=>{
    console.log(res);
    this.setStateAsync({token: res.getIdToken().getJwtToken(),
    expiration: new Intl.DateTimeFormat("en-US").format(res.getIdToken().getExpiration()),
  response: res});
  });
}

getUserCreds(){
  console.log(Auth.currentSession());
  Auth.currentUserCredentials().then((res)=>{
    console.log(res);
  });
}

setStateAsync(state) {
  return new Promise((resolve) => {
    this.setState(state, resolve)
  });
}

  render() {
    return (
      <div className="App">
        <h1 className ="title">Solo CUP (Cognito User Pool) Token Visualizer</h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ReactJson src={this.state.response} enableClipboard={false} displayDataTypes={false} />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
