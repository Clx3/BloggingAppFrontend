import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Blog from './pages/home/Blog';

class App extends Component {
  render() {
    return (
          <BrowserRouter>
            <Route exact path = '/' component={Blog}/>
          </BrowserRouter>
    );
  }
}

export default App;
