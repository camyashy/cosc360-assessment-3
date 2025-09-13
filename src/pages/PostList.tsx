import { useState, useEffect } from 'react';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { PostsAPI } from '../api/posts';
import type { Post } from '../types/Post';
import PostTable from '../components/PostTable';
import { useParams, Link, useLocation } from 'react-router-dom';
import type { ApiResponse } from '../types/Api';

// Used for both the display all posts page and display a users post page (dashboard)
export default function PostList() {

    // Get the id from the URL if applicable
    const { id } = useParams<{ id: string }>() || null;

    // Determine what the heading of the page will be based upon page
    const title = id ? "Your Posts" : "All Posts";

    // Get any success messages from previous actions
    const location = useLocation()
    const [successMessage, setSuccessMessage] = useState<string | null>(location.state?.successMessage);

    // Set up state to store post, loading status and any errors
    const [posts, setPosts] = useState<Post[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check if the user is logged in
    const loggedInUserID = localStorage.getItem('user_id') || null;
    const loggedInUserName = localStorage.getItem('user_name') || "";


    // If we are on the page of user's posts, if the user is either not logged in
    // Or a different user is trying to enter, they are not allowed to access

    if (id) {
        if (id != loggedInUserID) {
            return (
                <Alert variant="danger" className="text-center p-3">You are not authorised to view this page</Alert>
            )
        }
    }

    // Sets the success message to null when there is no new success message on page change
    useEffect(() => {
        if (!location.state?.successMessage) {
            setSuccessMessage(null);
        }
    }, [id, location.pathname]);

    // Fetch the data when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {

            setLoading(true);
            setError(null);

            try {
                // Call the API to obtain a list of all posts
                const postData = await PostsAPI.list();

                // If we have an id in the URL (aka are looking just at the user's posts)
                // filter so that only posts created by that user are in the list
                if (id) {
                    const tablePosts = postData.filter(post => String(post.user_id) === loggedInUserID);
                    setPosts(tablePosts);

                } else {
                    setPosts(postData);
                }


            } catch (err: any) {
                setError(err.message || "Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id, loggedInUserID]); // Runs the effect when the page changes

    // Handle the action when the delete button is pressed
    const handleDelete = async (postId: number) => {

        setError(null);

        try {
            // Send delete request to the server
            const response: ApiResponse<string> = await PostsAPI.remove(postId);

            // Assign success message
            if (response.success) {
                setSuccessMessage("Post deleted successfully");
            }

            // Update posts displayed on page without doing a new server request
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))

            window.scrollTo({ top: 0, behavior: 'smooth' });

            // What to do with errors
        } catch (err: any) {
            setError(err.message || "Delete Failed");
        }
    };

    // While we are awaiting post retrieval from server
    if (loading) {
        return (
            <div className="text-center p-3 mb-2">
                <Spinner animation="border" variant="primary" />
                <h2>Loading posts...</h2>
            </div>
        );
    }

    return (
        <div>
            {successMessage &&
                <Alert variant="success" className="text-center p-3">{successMessage}</Alert>}

            {error && <Alert variant="danger" className="text-center p-3">Error: {error}</Alert>}

            <div className="post-padding">
                <Container fluid className="d-flex align-items-center justify-content-between py-3">
                    <h2 className="mb-0">{title}</h2>
                    {loggedInUserID && <Link to={`/post/create`} className="btn btn-primary">+ Create New Post</Link>}
                </Container>
                <PostTable posts={posts} user_id={loggedInUserID} user_name={loggedInUserName} onDelete={handleDelete} />
            </div>
        </div>

    );
};