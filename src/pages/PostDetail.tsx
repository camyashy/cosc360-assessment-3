import { useState, useEffect } from 'react';
import { Spinner, Alert, Stack, Badge } from 'react-bootstrap';
import { PersonCircle, CalendarEvent, Folder2 } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { PostsAPI } from '../api/posts';
import type { Post } from '../types/Post';

export default function PostDetail() {

    // Get the id from the URL
    const { id } = useParams<{ id: string }>();

    // Set up state to store post, loading status and any errors
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch the data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return; // If there is no id, don't fetch

            setLoading(true);
            setError(null);

            try {
                // Call the API with the ID from the URL
                const postId = parseInt(id, 10);

                const postData = await PostsAPI.get(postId);

                setPost(postData);
            } catch (err: any) {
                setError(err.message || "Failed to fetch post");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // Rerun effect if ID changes

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

    if (!post) {
        return <h2 className="bg-danger text-white p-3 mb-2 text-center">Post not found.</h2>;
    }

    return (
        <div>
            <div className="bg-light text-secondary p-3 mb-2">
                <h1 className="mt-4 mb-4 text-center">{post.title}</h1>
                <Stack direction="horizontal" gap={3} className="text-muted justify-content-center fst-italic mb-2 mt-4">
                    <div>
                        <PersonCircle className="me-1" />
                        {post.user?.user_name || 'Anonymous'}
                    </div>
                    <div>
                        <CalendarEvent className="me-1" />
                        {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div>
                        <Folder2 className="me-1" />
                        <Badge bg="secondary">{post.category.category_name}</Badge>
                    </div>
                </Stack>
            </div>

            <div>
                <p className="text-justify post-padding">{post.content}</p>
            </div>
        </div>
    );
};