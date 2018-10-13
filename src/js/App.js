import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Map from'../js/Map.js';
import Hints from '../js/Hints.js';

class App extends Component {
  render() {
    return (
      <div className="App">
				< Map />
				< Hints />
      </div>
    );
  }
}

export default App;
