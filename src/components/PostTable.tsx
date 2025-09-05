import type { Post } from '../types/Post';
import { Link, useNavigate } from 'react-router-dom';
import truncate from "../utils/truncate";

// Fix width of columns

type TableProps = {
    posts: Post[],
    user_id: string | null,
    user_name: string;
}

export default function Table({ posts, user_id, user_name }: TableProps) {

    const navigate = useNavigate();
    return (
        <table className="table table-bordered table-hover mb-3">
            <thead className="table-dark text-uppercase text-center">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Category</th>
                    <th style={{ width: '120px' }}>Created At</th>
                    <th style={{ width: '180px' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts?.map(post => {
                    const canEditDelete = user_name === "Admin User" || user_id === String(post.user_id);

                    return (
                        <tr key={post.id}>
                            <td className="text-center align-middle">{post.id}</td>
                            <td className="align-middle">{post.title}</td>
                            <td>{truncate(post.content, 100)}</td>
                            <td className="text-center align-middle">{post.category.category_name}</td>
                            <td className="text-center align-middle"> {new Date(post.created_at).toLocaleDateString()} </td>
                            <td className="align-middle text-center">
                                <Link to={`/post/${post.id}`} className="btn btn-success btn-sm me-1">View</Link>

                                <>
                                    <span title={!canEditDelete ? "You are not authorised to edit this post" : ""}>
                                        <button disabled={!canEditDelete} onClick={() => navigate(`/post/edit/${post.id}`)} className="btn btn-primary btn-sm me-1">Edit</button>
                                    </span>
                                    <span title={!canEditDelete ? "You are not authorised to delete this post" : ""}>
                                        <button disabled={!canEditDelete} onClick={() => navigate(`/post/delete/${post.id}`)} className="btn btn-danger btn-sm me-1">Delete</button>
                                    </span>
                                </>


                            </td>
                        </tr>
                    );
                }

                )}
            </tbody>

        </table>
    )
}