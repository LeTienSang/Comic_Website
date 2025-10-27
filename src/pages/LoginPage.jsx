import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthService } from '../services/auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        const data= {
            email: formData.email,
            password: formData.password
        }
        const res= await AuthService.login(data);
        AuthService.saveTokens(res);
        console.log('Login response:', res);
        // Redirect or update UI after successful login
        navigate('/');
        
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-purple-950 mb-2">
                        Login
                    </h2>
                    <Link
                        to="/"
                        className="text-purple-950 hover:text-purple-600 text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Login Form */}
                <div className="bg-gray-50 rounded-lg shadow-lg p-6 border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-950 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-950 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-purple-950 hover:text-purple-900 font-medium">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
