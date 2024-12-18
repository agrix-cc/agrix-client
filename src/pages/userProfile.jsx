import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import MobileNav from "../components/mobileNav"; // Import the header component
import {Avatar} from "../components/ui/avatar"; // Import the desktop header component if needed

const UserProfile = () => {
    const { userId } = useParams(); // Get the user ID from the URL
    const [userData, setUserData] = useState(null);
    const [listings, setListings] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState(null); // null, "pending", "connected"

    // Fetch user profile and listings
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
                const response = await axios.get(`${baseURL}/profile/${userId}`);
                setUserData(response.data.user);
                setListings(response.data.listings);
                // Fetch connection status
                const connectionResponse = await axios.get(`${baseURL}/connections/status/${userId}`);
                setConnectionStatus(connectionResponse.data.status);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    // Remove connection handler
    const handleRemoveConnection = async () => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
            await axios.delete(`${baseURL}/connections/${userId}/remove`);
            setConnectionStatus(null);
        } catch (error) {
            console.error("Error removing connection:", error);
        }
    };

    // Send connection request handler
    const handleConnect = async () => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
            await axios.post(`${baseURL}/connections/request`, { connectedUserId: userId });
            setConnectionStatus("pending");
        } catch (error) {
            console.error("Error sending connection request:", error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MobileNav /> {/* Include the header component */}
            <div className="pt-16 p-4 max-w-screen-lg mx-auto"> {/* Added padding-top */}
                <div className="flex items-center mb-6">
                    {/* Profile Icon */}
                    <Avatar
                        src={userData.imageUrl}
                        size="2xl"
                        name={userData.first_name+" "+userData.last_name}/>
                    <div className="ml-6">
                        {/* User Info */}
                        <h1 className="text-2xl font-bold">{`${userData.first_name} ${userData.last_name}`}</h1>
                        <p className="text-sm text-gray-600">{userData.profile_type}</p>
                        <p className="text-sm text-gray-500">{`${userData.city}, ${userData.district}`}</p>
                        <p className="text-gray-700 mt-2">{userData.bio}</p>
                        <div className="flex items-center space-x-4 mt-4">
                            {/* Message Button */}
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-all"
                                onClick={() => console.log("Message feature not yet implemented")}
                            >
                                Message
                            </button>
                            {connectionStatus === "connected" ? (
                                <div className="relative">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                                    >
                                        Connected
                                    </button>
                                    <div className="absolute mt-2 right-0 bg-white border rounded shadow-lg">
                                        <button
                                            onClick={handleRemoveConnection}
                                            className="block px-4 py-2 text-red-600 hover:bg-gray-100 transition-all w-full text-left"
                                        >
                                            Remove Connection
                                        </button>
                                    </div>
                                </div>
                            ) : connectionStatus === "pending" ? (
                                <button
                                    className="px-4 py-2 bg-black text-white rounded transition-all"
                                    onClick={handleRemoveConnection}
                                >
                                    Pending 
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                                    onClick={handleConnect}
                                >
                                    Connect
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <hr className="my-6" />
                {/* Listings Section */}
                <h2 className="text-xl font-bold mb-4">Listings</h2>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {listings.map((listing) => (
                            <Link to={`/product/${listing.id}`} key={listing.id}>
                                <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                                    <h3 className="font-semibold text-lg">{listing.title}</h3>
                                    <p className="text-sm text-gray-500">{listing.description}</p>
                                    <p className="text-sm font-bold text-green-600 mt-2">${listing.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">This user has not listed anything yet!</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;