import React, {Component} from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom';
import { NavObjects } from './NavObjects.js';


export class Navigation extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
      this.renderLogout = this.renderLogout.bind(this);
      this.renderLinks = this.renderLinks.bind(this);
      this.NavObjects = NavObjects;
      this.state = {
        isOpen: false,
        logout: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    handleLogOut = event => {
      console.log(Cookies.get("token"));
      Cookies.remove("token");
      console.log("removed");
      this.setState({"logout":true});
    };

    renderLogout(){
      if(this.state.logout){
        this.setState({"logout": false});
        return (<Redirect to="/login"/>);
      }
    }

    renderLinks(){
      let ret = [];
      for(let title in NavObjects){
        ret.push(<LinkContainer to={NavObjects[title]}>
        <Nav.Link>{title}</Nav.Link>
        </LinkContainer>)
      } 
      return ret;
    
    }

    render() {
      /* Disbales navbar in login page */
      if (window.location.pathname === '/login') {
        return null;
      } else {
        return (
          <div>
            {this.renderLogout()}
          <Navbar expand="md" bg="light" variant="light" collapseOnSelect="true">
            <LinkContainer to="/">
              <Navbar.Brand>Blogging app</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {this.renderLinks()}
                  </Nav>               
                  <Navbar.Text>Signed in as: #TODO</Navbar.Text>
                  <NavDropdown title="Control Panel" id="basic-nav-dropdown">

                  <LinkContainer to="/blog/add">
                  <NavDropdown.Item>Create blog post</NavDropdown.Item>
                  </LinkContainer>

                  </NavDropdown>
              <Nav.Link onClick={this.handleLogOut}>Log out</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        </div>
        );
      }
    }
  }

  /*
  <LinkContainer to="/tastingapp/beers">
                  <Nav.Link>Beers</Nav.Link>
                </LinkContainer>
                <Nav.Link>Item1</Nav.Link>
                <Nav.Link>Item2</Nav.Link>
                <Nav.Link>Item3</Nav.Link>*/