import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 h-screen bg-gradient-to-b from-green-700 to-green-500 text-white p-4 flex flex-col justify-between shadow-lg">
                <div>
                    <h1
                        className="text-xl text-center font-semibold cursor-pointer mb-8"
                        onClick={() => navigate("/admin/home")}
                    >
                        Admin Dashboard
                    </h1>
                    <ul className="space-y-4">
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
                    </ul>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-white text-green-700 hover:bg-gray-400 transition duration-300"
                >
                    <FaSignOutAlt size={20} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden bg-gray-100 p-6">
                <div className="h-full overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
