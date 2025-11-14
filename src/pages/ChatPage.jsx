import { useEffect, useState } from "react";
import { getChats, createChat } from "../services/chatService"; // bạn tự tạo service

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");

  // Load danh sách chat
  const fetchChats = async () => {
    try {
      const data = await getChats(); // GET /chats/
      setChats(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Gửi chat mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createChat(content); // POST /chats/create/ với body { content }
      setContent("");
      fetchChats(); // reload danh sách chat
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="w-full border rounded p-2 mb-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Post
        </button>
      </form>

      <div>
        {chats.length === 0 && <p>No chat messages yet.</p>}
        {chats.map((c) => (
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
