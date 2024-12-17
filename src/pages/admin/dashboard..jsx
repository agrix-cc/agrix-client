import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa"; // Import FontAwesome icons

export default function AdminDashboard() {
    const navigate = useNavigate(); // Hook for redirection

    const handleLogout = () => {
        // Redirect to the general user's home page
        navigate("/");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar Navigation */}
            <div
                className="w-64 bg-gradient-to-b from-green-700 to-green-500 text-white p-4 shadow-lg flex flex-col justify-between"
            >
                {/* Title Section */}
                <div>
                    <h1
                        className="text-xl text-center cursor-pointer mb-8"
                        onClick={() => navigate("/admin/home")} // Redirect to Admin Home
                    >
                        Admin Dashboard
                    </h1>
                    <ul className="space-y-4">
                        {/* Home Link */}
                        <li>
                            <NavLink
                                to="home"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-3 rounded-lg bg-white text-green-700 hover:bg-gray-200 transition duration-300 ${
                                        isActive ? "shadow-md" : ""
                                    }`
                                }
                            >
                                <FaHome size={20} />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        {/* Users Link */}
                        <li>
                            <NavLink
                                to="users"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-3 rounded-lg bg-white text-green-700 hover:bg-gray-200 transition duration-300 ${
                                        isActive ? "shadow-md" : ""
                                    }`
                                }
                            >
                                <FaUsers size={20} />
                                <span>Users</span>
                            </NavLink>
                        </li>
                        {/* Manage Listings Link */}
                        <li>
                            <NavLink
                                to="listings"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-3 rounded-lg bg-white text-green-700 hover:bg-gray-200 transition duration-300 ${
                                        isActive ? "shadow-md" : ""
                                    }`
                                }
                            >
                                <FaClipboardList size={20} />
                                <span>Manage Listings</span>
                            </NavLink>
                        </li>
                        {/* Logout Button */}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 p-3 rounded-lg bg-gray-300 text-green-700 hover:bg-gray-400 transition duration-300 w-full"
                            >
                                <FaSignOutAlt size={20} />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </div>
        </div>
    );
}
