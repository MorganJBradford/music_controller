import React, { Component } from 'react';
import { render } from 'react-dom';
import ResponsiveAppBar from '../components/TopNav';
import Home from './Home';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ResponsiveAppBar/>
        <Home/>
      </>
    )
  }
}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);
