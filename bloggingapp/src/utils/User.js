
import Cookies from 'js-cookie'; 
import axios from 'axios';

/**
 * admin functions end with Admin lel.
 */
class User {

    constructor(id, username) {
        this.id = 0;
        this.username = Cookies.get('user') !== null ? Cookies.get('user') : '';
        this.deleteBlogpostAdmin = this.deleteBlogpostAdmin.bind(this);

        this.isAdminUser = this.isAdminUser.bind(this);
    }

    /**
     * Is this the correct way lol?
     */
    isAdminUser() {
        return this.username === "admin";
    }

    /**
     * Makes an axios call to post a like to a blog post.
     * @param {*} id 
     */
    likeBlogPost(id) {
        let requestBody = {
            blogpostId: id
        };

        return axios.post('/like/', requestBody);
    }

    /**
     * Makes an axios call to delete a blogpost by its id.
     * 
     * @param {*} id 
     */
    deleteBlogpostAdmin(id) {
        return axios.delete('/blog/' + id);
    }

}

export default User;