import React from 'react';

const UserCard = ({ name, profilePic, category }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition transform hover:scale-105">
            <img
                src={profilePic}
                alt={name}
                className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500">{category}</p>
        </div>
    );
};

export default UserCard;
