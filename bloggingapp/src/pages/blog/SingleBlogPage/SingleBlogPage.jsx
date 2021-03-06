import React, {Component} from 'react';
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import axios from 'axios';
import "./SingleBlogPage.css";
import Comments from './Comments';
import User from '../../../utils/User';
import { notificationSuccess } from '../../../components/Notification';

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class SingleBlogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: new User(),
            blogPost: {},
            blogPostLikes: 0
        }

        this.renderPost = this.renderPost.bind(this);
        this.fetchPost = this.fetchPost.bind(this);
        this.fetchLikes = this.fetchLikes.bind(this);
        this.likeThisBlogPost = this.likeThisBlogPost.bind(this);
    }

    componentWillMount(){
        this.fetchPost();
    }

    fetchPost(){
        axios.get("/blog/" + this.props.match.params.id)
            .then((response) => {
              this.setState({blogPost: response.data});
              this.fetchLikes();
            }).
            catch((error) => console.log(error));
    }

    fetchLikes() {
      axios.get("/like/count/" + this.state.blogPost.id)
        .then((response) => {

          if(response.status === 200)
            this.setState({blogPostLikes: response.data})

        }).catch(error => console.log(error));
    }

    likeThisBlogPost() {
      this.state.user.likeBlogPost(this.state.blogPost.id)
        .then((response) => {
          if(response.status === 200) {
            notificationSuccess("Succesfully liked this blog post!");
            this.fetchLikes();
          }
        });
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
                    <Row id="likes" className="justify-content-center">
                      <div className="text-center">
                        <Button variant="success" onClick={this.likeThisBlogPost} className="mb-2">Like</Button>
                        <Card.Text>Likes: {this.state.blogPostLikes}</Card.Text>
                      </div>
                    </Row>
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