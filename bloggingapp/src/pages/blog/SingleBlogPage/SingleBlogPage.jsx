import React, {Component} from 'react';
import { Card, Container } from "react-bootstrap";
import axios from 'axios';
import "./SingleBlogPage.css";
import Comments from './Comments';

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class SingleBlogPage extends Component {
    constructor(props) {
        super(props);
        this.renderPost = this.renderPost.bind(this);
        this.fetchPost = this.fetchPost.bind(this);
        this.state = {
            blogPost: {},
        }
    }

    componentWillMount(){
        this.fetchPost();
    }

    fetchPost(){
        axios.get("/blog/" + this.props.match.params.id)
            .then((response) => this.setState({blogPost: response.data})).
            catch((error) => console.log(error));
    }

    renderPost(){
        
        return (
            <Card>
                <Card.Header>{this.state.blogPost.date}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.blogPost.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.blogPost.author}</Card.Subtitle>
                    <Card.Text>
                    {this.state.blogPost.content}
                    </Card.Text>
                </Card.Body>
            </Card>
            
            );
            
    }
    
    render() {
        
        return (
            <Container id="blogContainer">
            <div>
                {this.renderPost()}
                <Comments id={this.props.match.params.id}/>
            </div>
            </Container>
        );
    }
}

export default SingleBlogPage;