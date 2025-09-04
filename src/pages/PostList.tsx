import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { PostsAPI } from '../api/posts';
import type { Post } from '../types/Post';
import PostTable from '../components/PostTable';

// How do you paginate???

export default function PostList() {

    // Set up state to store post, loading status and any errors
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check if the user is logged in
    const loggedIn: boolean = !!localStorage.getItem('token');
    let loggedInUserID: number | null = null;
    let loggedInUserName: string | null = null;

    if (loggedIn) {
        //loggedInUserID = localStorage.getItem('user_id');
        loggedInUserName = localStorage.getItem('user_name');
    }

    // Fetch the data when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {

            setLoading(true);
            setError(null);

            try {
                // Call the API to obtain a list of all posts
                const postData = await PostsAPI.list();

                setPosts(postData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch post");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Runs once on mount

    if (loading) {
        return (
            <div className="text-center p-3 mb-2">
                <Spinner animation="border" variant="primary" />;
                <h2>Loading post...</h2>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center p-3">Error: {error}</Alert>;
    }

    return (
        <div>
            <div>
                <h1>Posts</h1>
            </div>
            <PostTable posts={posts} user_id={loggedInUserID} />
        </div>



    );
};