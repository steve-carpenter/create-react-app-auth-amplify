import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class ApiGWTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.value != null){
      axios.get("https://pbfm335ha0.execute-api.us-east-2.amazonaws.com/dev", {headers: {'Authorization': this.state.value}}, {
      })
        .then(res => { // then print response status
        this.setState({queryResponse: res.data.message});
        })
        .catch(err => { // then print response status
          this.setState({queryResponse: "Unauthenticated"});
        })
    }
  }

render() {
  return (
  <div class="container">
    <div class="row">
      <div class="col-lg">
        <p><a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html">Enter your JWT token:</a></p> 
        <textarea className="tokenTextBox" value={this.state.value} onChange={this.handleChange} />  
        <input className="submitToken" type="submit" value="Submit" onClick={this.handleSubmit}/>
      </div>
      <div class="col-lg">
      <h2 className="response">{this.state.queryResponse}</h2>
      </div>
    </div>
  </div>
  );
}
}
export default ApiGWTest;
