import React, {Component} from 'react';
import { Container, Form, Col, InputGroup, Button } from "react-bootstrap";
import axios from 'axios';

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            validated: false,
            name: '',
            comment: ''
        }
    }

    componentWillMount(){
        
    }


    handleSubmit = event => {
      event.preventDefault();
    const form = event.currentTarget;
    console.log(form.name.value)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {

        console.log(this.state);
        const requestBody = {
            author: form.name.value,
            content: form.comment.value,
            postId: this.props.id
        }
        axios.put("/blog/comments/add", requestBody)
            .then((response) => console.log(response))
            .catch((response) => console.log(response));

    }
    this.setState({ validated: true });
    }
    
    
    render() {
        const { validated } = this.state;
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="name">
            <div className="formTexts">Name</div>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              defaultValue="name"
            />
            
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="8" controlId="comment">
            <div className="formTexts">Comment</div>
            <Form.Control
              required
              type="text"
              placeholder="Comment"
            />
            
          </Form.Group>
        </Form.Row>
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
}

export default CommentForm;