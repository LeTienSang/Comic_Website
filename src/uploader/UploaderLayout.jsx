import { Outlet, Link } from 'react-router-dom';

const UploaderLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <nav className="w-64 bg-gray-800 text-white p-6 fixed h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold mb-8 border-b-2 border-purple-950 pb-3">Uploader Panel</h2>
                <ul className="space-y-3">
                    <li>
                        <Link to="/uploader" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-all">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/uploader/my-comics" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-all">
                            My Comics
                        </Link>
                    </li>
                    <li>
                        <Link to="/uploader/new-comic" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-all">
                            New Comic
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className="ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default UploaderLayout;
