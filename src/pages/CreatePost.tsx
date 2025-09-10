import PostForm from '../components/PostForm';

export default function CreatePost() {

    const formName = "Create Post";

    return (
        <div className="post-padding">
            <h2 className="d-flex align-items-center justify-content-between py-3">{formName}</h2>

            <PostForm buttonText={formName} />
        </div>
    );
}