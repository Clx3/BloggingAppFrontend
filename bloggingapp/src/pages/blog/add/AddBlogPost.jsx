import React, {Component} from 'react';
import {Form, Container, Button} from 'react-bootstrap';

import axios from 'axios';

import './AddBlogPost.css';

class AddBlogPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
          blogPostTitle: "",
          blogPostAuthor: "",
          blogPostContent: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      event.preventDefault();
      this.setState({[event.target.id] : event.target.value});    
    }

    handleSubmit(event) {
      event.preventDefault();

      let requestBody = {
        title: this.state.blogPostTitle,
        author: this.state.blogPostAuthor,
        content: this.state.blogPostContent
      };

      console.log(JSON.stringify(requestBody));

      axios
        .put(
          'blog/add',
          JSON.stringify(requestBody)
        )
      .then(r => alert("Succesfully added post " + this.state.blogPostTitle + "."))
      .catch(e => console.log(e));
    }

    render() {
        return(
            <div id="addModifyBeer">
            <Container>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="blogPostTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                        type="text"
                        value={this.state.blogPostTitle}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <Form.Group controlId="blogPostAuthor">
                      <Form.Label>Author</Form.Label>
                      <Form.Control 
                        type="text"
                        value={this.state.blogPostAuthor}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <Form.Group controlId="blogPostContent">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="4"
                        maxLength="3000"
                        value={this.state.blogPostContent}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <div id="buttons">
                    <Button variant="success" type="submit">Add blog post</Button>
                  </div>
                </Form>
              </Container>
            </div>
        );
    }

}

export default AddBlogPost;