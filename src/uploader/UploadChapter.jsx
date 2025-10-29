import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UploadChapter = () => {
    const { comicId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        chapterNumber: '',
        chapterTitle: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Uploading chapter:', formData);
        // Add API call here
        navigate('/uploader/my-comics');
    };

    return (
        <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Upload New Chapter</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-semibold">Chapter Number</label>
                    <input
                        type="number"
                        name="chapterNumber"
                        value={formData.chapterNumber}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-semibold">Chapter Title</label>
                    <input
                        type="text"
                        name="chapterTitle"
                        value={formData.chapterTitle}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950"
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-2 text-gray-700 font-semibold">Chapter Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        required
                    />
                    {formData.images.length > 0 && (
                        <p className="mt-2 text-sm text-gray-600">{formData.images.length} images selected</p>
                    )}
                </div>

                <div className="flex gap-4 flex-wrap">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors font-semibold"
                    >
                        Upload Chapter
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

export default UploadChapter;
