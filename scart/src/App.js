import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className="App-header">
          <img src={logo} className={classes['App-logo']} alt="logo" />
          <h1 className={classes['App-title']}>Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


export default App;
