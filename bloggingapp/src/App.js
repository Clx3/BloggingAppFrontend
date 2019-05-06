import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute'
import Navigation from "./components/Navigation";

import axios from 'axios';

import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import BloggingApp from "./pages/bloggingApp/BloggingApp";
import AddPost from './pages/blog/add/AddBlogPost';
import SingleBlogPage from './pages/blog/SingleBlogPage/SingleBlogPage';

class App extends Component {

  componentWillMount() {
    //axios.defaults.baseURL = window.location.hostname;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navigation/>
          <ToastContainer />
          <Switch>
            <Route exact path = '/login' component = {LoginAndSignup}/>  
            <Route exact path = '/' component = {BloggingApp}/>}
            <PrivateRoute exact path = '/blog/add' component = {AddPost}/>
            <Route exact path = '/blog/:id' component ={SingleBlogPage}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
//<Redirect from='*' to='/404' />