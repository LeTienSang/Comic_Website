import { useParams, Link, useNavigate } from 'react-router-dom';

const ChapterPage = () => {
    const { comicId, chapterId } = useParams();
    const navigate = useNavigate();

    const chapter = {
        id: parseInt(chapterId),
        comicId: parseInt(comicId),
        comicTitle: "Comic Name",
        chapterNumber: parseInt(chapterId),
        title: `Chapter ${chapterId}: New Adventure`,
        pages: Array(5).fill("/banners/trending.jpg"),
        totalChapters: 1095
    };

    const changeChapter = (direction) => {
        const newChapter = chapter.chapterNumber + direction;
        if (newChapter >= 1 && newChapter <= chapter.totalChapters) {
            navigate(`/comic/${comicId}/chapter/${newChapter}`);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}

                <div className="max-w-4xl mt-8 mx-auto px-4">
                    <h1 className="text-lg md:text-xl font-bold text-center">{chapter.title}</h1>
                </div>


            {/* Comic Pages - Vertical Layout */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {chapter.pages.map((page, index) => (
                    <div key={index} className="bg-white shadow-md overflow-hidden mb-4">
                        <img src={page} alt={`Page ${index + 1}`} className="w-full h-auto" />
                    </div>
                ))}

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-4 mt-8 mb-8">
                    <button
                        onClick={() => changeChapter(-1)}
                        disabled={chapter.chapterNumber === 1}
                        className="px-6 py-3 bg-purple-950 hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous Chapter
                    </button>
                    <button
                        onClick={() => changeChapter(1)}
                        disabled={chapter.chapterNumber === chapter.totalChapters}
                        className="px-6 py-3 bg-purple-950 hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
                    >
                        Next Chapter
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChapterPage;
