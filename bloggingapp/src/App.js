import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Navigation from "./components/Navigation";

import axios from 'axios';

import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import BloggingApp from "./pages/bloggingApp/BloggingApp";
import AddPost from './pages/blog/add/AddBlogPost';
import SingleBlogPage from './pages/blog/SingleBlogPage/SingleBlogPage';

class App extends Component {

  componentWillMount() {
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path = '/login' component = {LoginAndSignup}/>  
            <Route exact path = '/' component = {BloggingApp}/>}
            <PrivateRoute exact path = '/blog/add' component = {AddPost}/>
            <Route exact path = '/blog/:id' component ={SingleBlogPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
//<Redirect from='*' to='/404' />