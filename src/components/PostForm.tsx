import type { Post } from "../types/Post"
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { PostsAPI } from "../api/posts";
import { Form, Alert, Spinner } from 'react-bootstrap';
import type { Category } from "../types/Category";
import { api } from "../api/http";

type FormProps = {
    buttonText: string;
    postData?: Post | null;
}

export default function PostForm({ buttonText, postData }: FormProps) {

    const navigate = useNavigate();

    // Hold form input values
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category_id, setCategory] = useState("");

    const [allCategories, setAllCategories] = useState<Category[] | null>(null);
    //Handle loading and errors
    const [loading, setLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (postData) {
            setTitle(postData.title ?? "");
            setContent(postData.content ?? "");
            setCategory(postData.category?.category_id ?? "");
        }
    }, [postData]);
    // Retrieve all categories
    useEffect(() => {
        const fetchCategories = async () => {

            setCategoriesLoading(true);
            setError(null);

            try {

                const categories = await api.get("/categories");

                setAllCategories(categories.data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch categories");
            } finally {
                setCategoriesLoading(false);
            }

        };

        fetchCategories();

    }, []); // Effect only runs when page loads


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            let success: string;

            if (!postData) {
                await PostsAPI.create({ title, content, category_id });
                success = "Post created successfully!";
            } else {
                await PostsAPI.update(postData.id, { title, content, category_id });
                success = "Post updated successfully!"
            }

            navigate("/", { state: { successMessage: success } });
        } catch (err: any) {
            setError(err.message || "Unable to save post");
        } finally {
            setLoading(false);
        }

    }

    if (categoriesLoading) {
        return (
            <div className="text-center p-3 mb-2">
                <Spinner animation="border" variant="primary" />
                <h2>Loading form...</h2>
            </div>
        );
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
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select required value={category_id} onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled hidden>Please select a category</option>
                        {allCategories?.map((cat) =>
                            <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                        )}
                    </Form.Select>
                </Form.Group>
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