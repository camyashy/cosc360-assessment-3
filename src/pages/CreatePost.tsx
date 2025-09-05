import { useState } from 'react';
import PostForm from '../components/PostForm';
import { Alert } from 'react-bootstrap';

// Do we need the error here?

export default function CreatePost() {

    const formName = "Create Post";

    const [error, setError] = useState<string | null>(null);

    if (error) {
        return <Alert variant="danger" className="text-center p-3">Error: {error}</Alert>;
    }

    return (
        <div className="post-padding">
            <h2 className="d-flex align-items-center justify-content-between py-3">{formName}</h2>

            <PostForm buttonText={formName} />
        </div>
    );
}