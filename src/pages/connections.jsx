import React, { useState } from 'react';
import MobileNav from '../components/mobileNav';
import UserCard from '../components/userCard';
import { FaUserPlus } from 'react-icons/fa6';
import axios from 'axios';

const Connections = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [showCards, setShowCards] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (page = 1) => {
        setLoading(true); // Show loading spinner or text while fetching
        try {
            const response = await axios.get(`/api/users?page=${page}`);
            setUsers(response.data.users);
            setPage(response.data.page); // Update current page number
            setShowCards(true); // Show cards after data is fetched
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        fetchUsers(); // Trigger fetch on button click
    };

    return (
        <div>
            <MobileNav />
            <div className="h-dvh flex flex-col justify-center items-center px-4">
                {/* Button to show user cards */}
                {!showCards && (
                    <div className="text-center">
                        <button
                            onClick={handleButtonClick}
                            className="flex items-center justify-center rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 mb-6"
                            style={{
                                width: 'clamp(3rem, 10vw, 6rem)',
                                height: 'clamp(3rem, 10vw, 6rem)',
                                margin: 'auto',
                            }}
                        >
                            <FaUserPlus size="clamp(1.5rem, 4vw, 3rem)" />
                        </button>
                        <h1 className="text-lg font-bold text-gray-900">Connect with others</h1>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Grow your network to open more business opportunities.
                        </p>
                    </div>
                )}

                {/* User Cards Section (Fades in) */}
                {showCards && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <UserCard
                                    key={index}
                                    name={`${user.first_name} ${user.last_name}`}
                                    profilePic={user.profile_pic}
                                    category={user.profile_type}
                                />
                            ))
                        ) : (
                            <p>No users available.</p>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {showCards && (
                    <div className="flex items-center justify-center mt-4">
                        <button
                            onClick={() => fetchUsers(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1 mx-1 text-gray-500 border rounded-md disabled:opacity-50"
                        >
                            &lt;
                        </button>
                        <span className="px-3 py-1 mx-1 font-semibold">{page}</span>
                        <button
                            onClick={() => fetchUsers(page + 1)}
                            className="px-3 py-1 mx-1 text-gray-500 border rounded-md"
                        >
                            &gt;
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && <p className="mt-4 text-gray-500">Loading users...</p>}
            </div>
        </div>
    );
};

export default Connections;
