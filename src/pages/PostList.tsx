import { useState, useEffect } from 'react';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { PostsAPI } from '../api/posts';
import type { Post } from '../types/Post';
import PostTable from '../components/PostTable';
import { useParams, Link, useLocation } from 'react-router-dom';

// How do you paginate???

export default function PostList() {

    // Get the id from the URL if applicable
    const { id } = useParams<{ id: string }>() || null;

    const title = id ? "Your Posts" : "All Posts";

    // Get any success messages from previous actions
    const location = useLocation()
    const successMessage = location.state?.successMessage;

    // Set up state to store post, loading status and any errors
    const [posts, setPosts] = useState<Post[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check if the user is logged in
    const loggedInUserID = localStorage.getItem('user_id') || null;
    const loggedInUserName = localStorage.getItem('user_name') || "";


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
    }, [id]); // Runs the effect when the page changes

    if (loading) {
        return (
            <div className="text-center p-3 mb-2">
                <Spinner animation="border" variant="primary" />
                <h2>Loading posts...</h2>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center p-3">Error: {error}</Alert>;
    }

    return (
        <div>
            {successMessage &&
                <Alert variant="success" className="text-center p-3">{successMessage}</Alert>}

            <div className="post-padding">
                <Container fluid className="d-flex align-items-center justify-content-between py-3">
                    <h2 className="mb-0">{title}</h2>
                    {loggedInUserID && <Link to={`/post/create`} className="btn btn-primary">+ Create New Post</Link>}
                </Container>
                <PostTable posts={posts} user_id={loggedInUserID} user_name={loggedInUserName} />
            </div>
        </div>

    );
};