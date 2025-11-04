import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createChapter } from '../services/chapterService'; // 🆕 import service

const UploadChapter = () => {
    const { comicId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        chapterNumber: '',
        chapterTitle: '',
        content: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Uploading chapter:', formData);
            await createChapter(comicId, formData);
            alert("✅ Chapter uploaded successfully!");
            navigate('/uploader/my-comics');
        } catch (error) {
            console.error(error);
            alert("❌ Failed to upload chapter!");
        }
    };

    return (
        <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                Upload New Chapter
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Chapter Number */}
                <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                        Chapter Number
                    </label>
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

                {/* Chapter Title */}
                <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                        Chapter Title
                    </label>
                    <input
                        type="text"
                        name="chapterTitle"
                        value={formData.chapterTitle}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                        Content
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Enter chapter content here..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-950 resize-none"
                    />
                </div>

                {/* Single Image */}
                <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                        Chapter Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        required
                    />
                    {formData.image && (
                        <p className="mt-2 text-sm text-gray-600">
                            Selected: {formData.image.name}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 flex-wrap justify-center">
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
