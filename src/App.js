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
        <h4 className="tldr">TLDR; <a href="https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html"> After a successful authN, Cognito returns user pool tokens to your app</a></h4>
        <ReactJson src={this.state.response} enableClipboard={false} displayDataTypes={false} theme={{
                base00: "#F5F5F5",
                base01: "#ddd",
                base02: "#ddd",
                base03: "#444",
                base04: "white",
                base05: "#444",
                base06: "#444",
                base07: "#444",
                base08: "#444",
                base09: "#FF9900",
                base0A: "#FF9900",
                base0B: "#FF9900",
                base0C: "#FF9900",
                base0D: "#FF9900",
                base0E: "#FF9900",
                base0F: "#FF9900"
            }} />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
