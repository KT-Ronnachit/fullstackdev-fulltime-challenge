import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RouterChild from './static/RouterChild'
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom'
class App extends Component {

  render() {

    return (

      <div>
        {this.props.children}
      </div>


    );
  }
} export default withRouter(App);
