import type { Post } from '../types/Post';
import { Link } from 'react-router-dom';
import truncate from "../utils/truncate";

type TableProps = {
    posts: Post[],
    user_id?: number | null,
}

export default function Table({ posts, user_id }: TableProps) {

    // If a userId is provided, filter so that only posts created by that user
    // are in the list
    const tablePosts = user_id
        ? posts.filter(post => post.user_id === user_id)
        : posts;

    return (
        <table className="table table-bordered table-hover mb-3">
            <thead className="table-dark text-uppercase text-center">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <body>
                {tablePosts?.map(post => (
                    <tr>
                        <td className="text-center align-middle">{post.id}</td>
                        <td className="align-middle">{post.title}</td>
                        <td>{truncate(post.content, 100)}</td>
                        <td className="text-center align-middle"> {new Date(post.created_at).toLocaleDateString()} </td>
                        <td className="align-middle">
                            <Link to={`/post/${post.id}`} className="btn btn-success btn-sm me-1">View</Link>
                            <Link to={`/post/edit/${post.id}`} className="btn btn-primary btn-sm me-1">Edit</Link>
                            <Link to={`/post/delete/${post.id}`} className="btn btn-danger btn-sm me-1">Delete</Link>
                        </td>
                    </tr>
                ))};
            </body>

        </table>
    )
}