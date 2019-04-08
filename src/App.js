import React, { Component } from 'react';
import './App.css';
import Configuration from './components/configuration/Configuration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Card">

          <Configuration />
        </div>
      </div>
    );
  }
}

export default App;
