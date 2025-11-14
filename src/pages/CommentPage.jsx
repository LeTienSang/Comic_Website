import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // import useParams
import { getComments, createComment, getCommentByComic } from "../services/commentService";

export default function CommentPage() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const fetchComments = async () => {
        let data = [];
        if (id){
            data = await getCommentByComic(id);
        }
        else{
            data = await getComments();
        }
        setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, [id]);
    console.log('aaa', id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            console.log("Submitting comment:", { content, id });
            await createComment(content, id);
            setContent("");
            fetchComments();  // reload comment
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Comments</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a comment..."
                    rows={3}
                    className="w-full border rounded p-2 mb-2"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Post
                </button>
            </form>

            <div>
                {comments.length === 0 && <p>No comments yet.</p>}
                {comments.map((c) => (
                    <div key={c.id} className="border-b py-2">
                        <div className="text-sm text-gray-600">
                            <strong>{c.user}</strong> &middot; {new Date(c.created_at).toLocaleString()}
                        </div>
                        <p>{c.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
