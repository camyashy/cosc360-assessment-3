import PostForm from '../components/PostForm';
import { Alert } from 'react-bootstrap';

// Creates a new post
export default function CreatePost() {

    const formName = "Create Post";

    const loggedInUserID = localStorage.getItem('user_id') || null;

    // If the user isn't logged in then they cannot create a post
    if (!loggedInUserID) {
        return (
            <Alert variant="danger" className="text-center p-3">You must be logged in to create a post</Alert>
        )
    }

    return (
        <div className="post-padding">
            <h2 className="d-flex align-items-center justify-content-between py-3">{formName}</h2>

            <PostForm buttonText={formName} />
        </div>
    );
}