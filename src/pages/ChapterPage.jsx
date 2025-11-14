import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getChapterDetail } from '../services/chapterService';

const ChapterPage = () => {
  const { comicId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        const data = await getChapterDetail(comicId, chapterId);
        setChapter(data);
        console.log("Fetched chapter data:", data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
        setError("Failed to load chapter.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [comicId, chapterId]);

  const changeChapter = (direction) => {
    if (!chapter) return;
    const newChapter = chapter.number + direction;
    if (newChapter >= 1 && newChapter <= chapter.total_chapters) {
      navigate(`/comic/${comicId}/chapter/${newChapter}`);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!chapter) return <p className="text-center mt-10 text-gray-600">Chapter not found.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-4xl mt-8 mx-auto px-4">
        <h1 className="text-lg md:text-xl font-bold text-center">
          Chapter {chapter.number}: {chapter.title}
        </h1>
      </div>

     

      {/* Chapter Images */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {chapter.image ? (
          <div className="bg-white shadow-md overflow-hidden mb-4">
            <img src={chapter.image} alt={chapter.title} className="w-full h-auto" />
          </div>
        ) : chapter.pages && chapter.pages.length > 0 ? (
          chapter.pages.map((page, index) => (
            <div key={index} className="bg-white shadow-md overflow-hidden mb-4">
              <img src={page} alt={`Page ${index + 1}`} className="w-full h-auto" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images for this chapter.</p>
        )}
         {/* ✅ Chapter content */}
      {chapter.content && (
        <div className="max-w-3xl mx-auto mt-6 px-4 text-gray-800 leading-relaxed whitespace-pre-line">
          {chapter.content}
        </div>
      )}
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8 mb-8">
          {/* <button
            onClick={() => changeChapter(-1)}
            disabled={chapter.number === 1}
            className="px-6 py-3 bg-purple-950 hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Chapter
          </button> */}
          {/* <button
            onClick={() => changeChapter(1)}
            disabled={chapter.number === chapter.total_chapters}
            className="px-6 py-3 bg-purple-950 hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
          >
            Next Chapter
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
