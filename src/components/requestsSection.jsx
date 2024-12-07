import React from "react";
import { Avatar } from "./ui/avatar";
import axios from "axios";

const RequestsSection = ({ title, requests, type, onAction }) => {
    const handleAction = async (userId, action) => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

            // Call the appropriate API endpoint
            if (action === "undo") {
                await axios.post(`${baseURL}/connections/${userId}/undo`);
            } else if (action === "accept") {
                await axios.post(`${baseURL}/connections/accept`, { userId });
            } else if (action === "reject") {
                await axios.post(`${baseURL}/connections/reject`, { userId });
            }

            // Notify the parent about the action
            onAction(userId, action);
        } catch (error) {
            console.error(`Error performing ${action} action:`, error);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {requests.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-4 bg-gray-50 border-b">
                    <div className="flex items-center">
                        <Avatar src={user.profile_pic} name={`${user.first_name} ${user.last_name}`} size="lg" />
                        <div className="ml-4">
                            <h3 className="font-bold">{`${user.first_name} ${user.last_name}`}</h3>
                            <p className="text-sm text-gray-500">{user.profile_type}</p>
                        </div>
                    </div>
                    <div>
                        {type === "sent" ? (
                            <button
                                id={"undo_"+user.id}
                                onClick={() => handleAction(user.id, "undo")}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Undo Request
                            </button>
                        ) : (
                            <>
                                <button
                                    id={"accept_"+user.id}
                                    onClick={() => handleAction(user.id, "accept")}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                >
                                    Accept
                                </button>
                                <button
                                    id={"reject_"+user.id}
                                    onClick={() => handleAction(user.id, "reject")}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestsSection;
