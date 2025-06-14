import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to Task Tracker
                </h1>
                <p className="text-gray-600 mb-8">
                    Manage your tasks efficiently and stay organized
                </p>
                <Link
                    to="/tasks"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
                >
                    View Tasks
                </Link>
            </div>
        </div>
    );
};

export default Home;
