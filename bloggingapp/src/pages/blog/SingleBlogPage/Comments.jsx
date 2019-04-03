import React, {Component} from 'react';
import { Card, Container } from "react-bootstrap";
import axios from 'axios';
import "./SingleBlogPage.css";
import CommentForm from './CommentForm';

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class Comments extends Component {
    constructor(props) {
        super(props);
        this.renderComments = this.renderComments.bind(this);
        this.state = {
            comments: []
        }
    }

    componentWillMount(){
        this.fetchComments();
    }


    fetchComments(){
        axios.get("/blog/comments/" + this.props.id)
            .then((response) => this.setState({comments: response.data})).
            catch((error) => console.log(error));
    }

    renderComments(){

        const comments = this.state.comments.map((d) => {
            return (
            
                <Card>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{d.author}</Card.Subtitle>
                        <Card.Text>
                        {d.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                )
        })
        return comments;
    }
    
    render() {
        
        return (
            <Container id="blogContainer">
            <div>
                <Card>
                    <Card.Header>Comments</Card.Header>
                {this.renderComments()}
                <CommentForm id={this.props.id}/>
                </Card>
            </div>
            </Container>
        );
    }
}

export default Comments;