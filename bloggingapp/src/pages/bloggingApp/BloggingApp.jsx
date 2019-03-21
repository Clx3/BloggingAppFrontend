import React, {Component} from 'react';
import { Card, Container } from "react-bootstrap";
import axios from 'axios';
import "./BloggingApp.css";

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class BloggingApp extends Component {
    constructor(props) {
        super(props);
        this.renderPosts = this.renderPosts.bind(this);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.state = {
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


    renderPosts(){
        
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

export default BloggingApp;