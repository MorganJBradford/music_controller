import React, { Component } from 'react';
import { render } from 'react-dom';
import ResponsiveAppBar from './TopNav';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ResponsiveAppBar/>
        <h1>Testing react code</h1>
      </>
    )
  }
}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);
