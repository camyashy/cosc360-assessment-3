import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';
import PostForm from '../components/PostForm';
import { Spinner, Alert } from 'react-bootstrap';

export default function UpdatePost() {

    const { id } = useParams<{ id: string }>() || null;

    const formName = "Update Post";

    const [post, setPost] = useState<Post | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check if the user is logged in
    const loggedInUserID = localStorage.getItem('user_id') || null;
    const loggedInUserName = localStorage.getItem('user_name') || "";

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {

                setLoading(true);
                setError(null);

                try {
                    const postData = await PostsAPI.get(Number(id));

                    setPost(postData);
                } catch (err: any) {
                    setError(err.message || "Failed to fetch post");
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="text-center p-3 mb-2">
                <Spinner animation="border" variant="primary" />
                <h2>Loading post...</h2>
            </div>
        );
    }

    // If the user trying to edit the post isn't either the user who created it
    // Or the admin user, then they are not allowed access
    if ((loggedInUserID != post?.user_id) && loggedInUserName != "Admin User") {
        return (
            <Alert variant="danger" className="text-center p-3">You are not authorised to view this page</Alert>
        )
    }

    if (error) {
        return <Alert variant="danger" className="text-center p-3">Error: {error}</Alert>;
    }

    return (
        <div className="post-padding">
            <h2 className="d-flex align-items-center justify-content-between py-3">{formName}</h2>

            <PostForm buttonText={formName} postData={post} />
        </div>
    );
}