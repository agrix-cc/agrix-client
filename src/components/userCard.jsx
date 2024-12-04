import React from "react";
import { Avatar } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, onConnect, onRemove }) => {
    const navigate = useNavigate();

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center text-center w-full max-w-xs h-full">
            <Avatar src={user.profile_pic} name={`${user.first_name} ${user.last_name}`} size="2xl" />
            <h2 className="text-xl font-bold mt-2">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="text-sm text-gray-500">{user.profile_type}</p>
            <div className="mt-4 flex flex-col justify-end flex-grow w-full space-y-2">
                {/* View Profile Button */}
                <button
                    className="w-full px-4 py-2 bg-white border border-black text-green-600 font-medium rounded hover:bg-black hover:text-white hover:border-white transition-all"
                    onClick={() => navigate(`/profile/${user.id}`)}
                >
                    View Profile
                </button>
                {/* Conditional Buttons */}
                {onConnect && (
                    <button
                        className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-all"
                        onClick={() => onConnect(user.id)}
                    >
                        Connect Now
                    </button>
                )}
                {onRemove && (
                    <button
                        className="w-full px-4 py-2 bg-white border border-black text-black font-medium rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all"
                        onClick={() => onRemove(user.id)}
                    >
                        Remove Connection
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserCard;