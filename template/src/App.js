import React, { Component } from 'react';
import RootRoute from './routes/index';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <RootRoute/>
      </div>
    );
  }
}
