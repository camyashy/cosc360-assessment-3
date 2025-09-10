import type { Post } from "../types/Post"
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { PostsAPI } from "../api/posts";
import { Alert } from 'react-bootstrap';

type FormProps = {
    buttonText: string;
    postData?: Post | null;

}

export default function PostForm({ buttonText, postData }: FormProps) {

    const navigate = useNavigate();

    // Hold form input values
    const [title, setTitle] = useState<string>(postData?.title ?? "");
    const [content, setContent] = useState<string>(postData?.content ?? "");

    //Handle loading and errors
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            let response: Post;
            let success: string;

            if (!postData) {
                response = await PostsAPI.create({ title, content });
                success = "Post created successfully!";
            } else {
                response = await PostsAPI.update(postData.id, { title, content });
                success = "Post updated successfully!"
            }

            navigate("/", { state: { successMessage: success } });
        } catch (err: any) {
            setError(err.message || "Unable to save post");
        } finally {
            setLoading(false);
        }

    }
    return (

        <form onSubmit={handleSubmit}>

            {error && <Alert variant="danger" className="text-center p-3">{error}</Alert>}

            <div >
                <label className="py-1 form-label">Title</label><br></br>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                    className="form-control mb-3" />
            </div>

            <div>
                <label className="form-label my-3">Content</label><br></br>
                <textarea rows={12} value={content} onChange={(e) => setContent(e.target.value)}
                    className="form-control mb-3" />
            </div>

            <div className="text-center">
                <button type="submit" disabled={loading} className="btn bg-primary my-3">
                    {loading ? "Saving..." : `${buttonText}`}
                </button>
            </div>
        </form>
    )

}