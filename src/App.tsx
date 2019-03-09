import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as _ from 'lodash';
import { observable } from 'mobx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            {console.log(_.max([1, 2, 7, 9, 9, 100, 200, 1000]))}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
