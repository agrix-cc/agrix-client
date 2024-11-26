import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ match }) => {
    const { userId } = match.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                const response = await axios.get(`${baseURL}/profile/${userId}`);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {user ? (
                <div className="text-center">
                    <img src={user.image} alt={user.first_name} className="w-32 h-32 rounded-full mx-auto" />
                    <h1 className="text-2xl font-bold mt-4">{`${user.first_name} ${user.last_name}`}</h1>
                    <p className="text-gray-600 mt-2">{user.bio || "No bio available"}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
