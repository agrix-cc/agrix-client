import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for route parameters
import axios from "axios";

const UserProfile = () => {
    const { id } = useParams(); // Get user ID from the route
    const [user, setUser] = useState(null); // State to hold user data
    const [listings, setListings] = useState([]); // State for user listings

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`); // Replace with your API endpoint
                setUser(response.data.user);
                setListings(response.data.listings);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [id]);

    if (!user) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
                <img
                    src={user.profilePic || "/default-avatar.png"}
                    alt={`${user.name}'s profile`}
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.category}</p>
                    <p className="text-gray-500">{user.location}</p>
                    <p className="mt-2 text-gray-700">{user.bio}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Message</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Follow</button>
            </div>

            {/* Listings Section */}
            <hr className="my-6" />
            <div>
                <h2 className="text-xl font-semibold">Listings</h2>
                {listings.length === 0 ? (
                    <p className="text-gray-500 mt-2">This user hasn't posted anything yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {listings.map((listing) => (
                            <div key={listing.id} className="border rounded-lg p-4">
                                <h3 className="font-semibold">{listing.title}</h3>
                                <p className="text-sm text-gray-500">{listing.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
