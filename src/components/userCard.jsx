import React from "react";

const UserCard = ({ profilePic, name, category, onConnect }) => {
    return (
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center text-center w-full max-w-xs md:max-w-sm mx-auto">
            {/* Profile Picture */}
            <img
                src={profilePic}
                alt={`${name}'s profile`}
                className="w-20 h-20 rounded-full object-cover mb-4"
            />
            {/* Name */}
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            {/* Category */}
            <p className="text-sm text-gray-500 mt-1">{category}</p>
            {/* Connect Button */}
            <button
                onClick={onConnect}
                className="mt-4 px-5 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
            >
                Connect Now
            </button>
        </div>
    );
};

export default UserCard;
