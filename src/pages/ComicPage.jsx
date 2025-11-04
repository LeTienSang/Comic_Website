import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getComicById, updatedComic } from '../services/comic';
import { getChaptersByComic } from '../services/chapterService';

const ComicPage = () => {
  const { id } = useParams(); // lấy id từ URL
  const [comic, setComic] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comicData, chapterData] = await Promise.all([
          getComicById(id),
          getChaptersByComic(id)
        ]);
        setComic(comicData);
        setChapters(chapterData);
      } catch (err) {
        console.error("Error fetching comic or chapters:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    alert(isFollowing ? 'Unfollowed comic!' : 'Following comic!');
  };

  const handleReadCount = async () => {
    if (!comic) return;
    try {
      const updated = await updatedComic(comic.id, { read_count: comic.read_count + 1 });
      setComic(updated);
      console.log('Read count increased for comic ID:', comic.id);
    } catch (err) {
      console.error("Error updating read count:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!comic) return <p className="text-center mt-10 text-red-500">Comic not found.</p>;

  // Giả sử bạn sẽ load danh sách chapter sau
  // const chapters = [
  //   { id: 1, title: "Chapter 1: Beginning", releaseDate: "2025-10-01" },
  //   { id: 2, title: "Chapter 2: The Next Step", releaseDate: "2025-10-05" }
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={comic.cover_image || "/default-cover.jpg"}
                alt={comic.title}
                className="w-full md:w-64 h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-purple-950 mb-2">
                {comic.title}
              </h1>
              <div className="space-y-2 mb-4">
                <p><span className="font-medium text-gray-700">Author:</span> {comic.author}</p>
                <p><span className="font-medium text-gray-700">Genre:</span> {comic.genre}</p>
                <p><span className="font-medium text-gray-700">Read count:</span> {comic.read_count}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Description:</h3>
                <p className="text-gray-600 leading-relaxed">{comic.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFollow}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-purple-950 text-white hover:bg-purple-900'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>

                <button
                  onClick={handleReadCount}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 font-medium transition-colors"
                >
                  Read Latest
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters list */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-purple-950 mb-4">Chapters</h2>
          {chapters.map(chapter => (
            <div key={chapter.id} className="flex justify-between p-3 border-b">
              <Link to={`/comic/${comic.id}/chapter/${chapter.id}`} className="text-purple-950 hover:text-purple-700">
                {chapter.title}
              </Link>
              <span className="text-gray-500 text-sm">{chapter.releaseDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicPage;
