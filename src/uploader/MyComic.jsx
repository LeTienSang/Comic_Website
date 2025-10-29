import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyComic = () => {
    const [comics, setComics] = useState([]);

    return (
        <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Comics</h1>
            <Link
                to="/uploader/new-comic"
                className="inline-block px-6 py-3 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors font-semibold mb-8"
            >
                Add New Comic
            </Link>

            {comics.length === 0 ? (
                <div className="bg-white p-16 rounded-lg text-center text-gray-400">
                    <p className="text-lg">You haven't created any comics yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {comics.map((comic) => (
                        <div key={comic.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                            <img src={comic.cover} alt={comic.title} className="w-full h-64 object-cover" />
                            <h3 className="px-4 py-3 font-semibold text-gray-800">{comic.title}</h3>
                            <div className="flex gap-2 p-4 border-t border-gray-200">
                                <Link
                                    to={`/uploader/edit-comic/${comic.id}`}
                                    className="flex-1 text-center px-3 py-2 bg-purple-950 text-white rounded hover:bg-purple-900 transition-colors text-sm"
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/uploader/upload-chapter/${comic.id}`}
                                    className="flex-1 text-center px-3 py-2 bg-purple-950 text-white rounded hover:bg-purple-900 transition-colors text-sm"
                                >
                                    Add Chapter
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyComic;
