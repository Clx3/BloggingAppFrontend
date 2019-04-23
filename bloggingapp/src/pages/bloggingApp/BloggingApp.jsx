import React, {Component} from 'react';
import { Card, Container, Button, Row, Col} from "react-bootstrap";
import axios from 'axios';
import "./BloggingApp.css";
import { withRouter } from 'react-router-dom';
import User from '../../utils/User';
import {notificationSuccess, notificationError} from '../../components/Notification'

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class BloggingApp extends Component {
    constructor(props) {
        super(props);
        this.renderPosts = this.renderPosts.bind(this);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.deleteBlogpost = this.deleteBlogpost.bind(this);

        this.state = {
            user: new User(),
            allPosts: []
        }
    }

    componentWillMount(){
        this.fetchPosts();
    }

    fetchPosts(){
        axios.get("/blog/posts")
            .then((response) => this.setState({allPosts: response.data})).
            catch((error) => console.log(error));
    }

    handleRedirect = event => {
        console.log(event.target.id)
        event.preventDefault();
        this.props.history.push('/blog/' + event.target.id);
    }

    /**
     * Deletes a blog post with wanted id
     * 
     * @param {} id 
     */
    deleteBlogpost(id) {
      this.state.user.deleteBlogpostAdmin(id)
      .then((response) => {
        if(response.status === 200) {
          notificationSuccess("Blog post deleted succesfully!");
          this.fetchPosts();
        }
      }).catch((error) => {
        console.log(error);
        notificationError("Error while deleting blog post!");
      });
    }

    renderPosts(){

        const createAdminButtons = (blogpostId) => {
          if(this.state.user.isAdminUser())
            return (
              <Button variant="danger" onClick={() => this.deleteBlogpost(blogpostId)}>Delete</Button>
            );
          else
            return '';
        }
        
        const kona = this.state.allPosts.map((d) => (
        <Container id="blogContainer">
        <Card>
            <Card.Header>{d.date}</Card.Header>
            <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{d.author}</Card.Subtitle>
                <Card.Text>
                {d.content}
                </Card.Text>
                <Row>
                  <Col>
                    <Card.Link href='#' id={d.id} onClick={this.handleRedirect}>View comments</Card.Link>
                  </Col>
                  <Col className="text-right">
                    {createAdminButtons(d.id)}
                  </Col>
                </Row>
            </Card.Body>
        </Card>
        </Container>
        ));
        

        return kona;
    }
    
    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        );
    }
}

export default withRouter(BloggingApp);