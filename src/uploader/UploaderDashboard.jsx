import { Link } from 'react-router-dom';

const UploaderDashboard = () => {
    return (
        <div className="max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Uploader Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-gray-500 text-sm uppercase mb-2">Total Comics</h3>
                    <p className="text-4xl font-bold text-purple-950">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-gray-500 text-sm uppercase mb-2">Total Chapters</h3>
                    <p className="text-4xl font-bold text-purple-950">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-gray-500 text-sm uppercase mb-2">Total Views</h3>
                    <p className="text-4xl font-bold text-purple-950">0</p>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
                <Link
                    to="/uploader/new-comic"
                    className="px-6 py-3 bg-purple-950 text-white rounded-lg hover:bg-purple-900 transition-colors font-semibold"
                >
                    Create New Comic
                </Link>
                <Link
                    to="/uploader/my-comics"
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                    View My Comics
                </Link>
            </div>
        </div>
    );
};

export default UploaderDashboard;
