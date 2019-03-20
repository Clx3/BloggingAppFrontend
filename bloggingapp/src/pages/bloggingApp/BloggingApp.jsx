import React, {Component} from 'react';

/**
 * TODO: Route this page so this and all of its child pages/components can only
 * be viewed/rendered if the user is authenticated.
 */

class BloggingApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ''
        }
    }
    
    render() {
        return (
            <div>
                Main entry point of app.
            </div>
        );
    }
}

export default BloggingApp;