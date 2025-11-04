import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComic } from '../services/comic';
const NewComicForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
        genre: '',
        cover_image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            cover_image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Creating comic:', formData);
      
        // ⚠️ Tạo FormData đúng chuẩn
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('author', formData.author);
        data.append('genre', formData.genre);
        data.append('cover_image', formData.cover_image); // đây là file
      
        try {
          const res = await createComic(data);
          console.log(res);
          navigate('/uploader/my-comics');
        } catch (err) {
          console.error('Error creating comic:', err.response?.data || err.message);
        }
      };
      

    return (
        <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Comic</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-semibold">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-semibold">Genre</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950"
                        required
                    >
                        <option value="">Select Genre</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="drama">Drama</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="isekai">Isekai</option>
                        <option value="martial-arts">Martial Arts</option>
                        <option value="mystery">Mystery</option>
                        <option value="psychological">Psychological</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="school-life">School Life</option>
                        <option value="shounen">Shounen</option>
                        <option value="slice-of-life">Slice of Life</option>
                        <option value="sports">Sports</option>
                        <option value="supernatural">Supernatural</option>
                        <option value="thriller">Thriller</option>
                        <option value="tragedy">Tragedy</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950 resize-vertical"
                        required
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-2 text-gray-700 font-semibold">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="flex gap-4 flex-wrap">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors font-semibold"
                    >
                        Create Comic
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewComicForm;
