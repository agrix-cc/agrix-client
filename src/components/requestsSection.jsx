import React, { useState } from "react";
import { Avatar } from "./ui/avatar";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserGroup, FaUserPlus } from "react-icons/fa6";

const RequestsSection = ({ title, requests, type, onAction, isExpandedDefault }) => {
    const [isExpanded, setIsExpanded] = useState(isExpandedDefault);

    const handleAction = async (userId, action) => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

            if (action === "undo") {
                await axios.post(`${baseURL}/connections/${userId}/undo`);
            } else if (action === "accept") {
                await axios.post(`${baseURL}/connections/accept`, { userId });
            } else if (action === "reject") {
                await axios.post(`${baseURL}/connections/reject`, { userId });
            }

            onAction(userId, action);
        } catch (error) {
            console.error(`Error performing ${action} action:`, error);
        }
    };

    return (
        <div className="border-b">
            {/* Section Header */}
            <div
                className="flex justify-between items-center px-4 py-3 bg-gray-100 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h2 className="text-lg font-semibold">{title}</h2>
                <span
                    className={`transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                >
                    <IoIosArrowDown />
                </span>
            </div>

            {/* Section Content */}
            <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[1000px]" : "max-h-0"
                }`}
            >
                {requests.length > 0 ? (
                    requests.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center p-4 bg-gray-50 border-b"
                        >
                            <Link to={`/profile/${user.id}`} className="flex items-center">
                                <Avatar
                                    src={user.profile_pic}
                                    name={`${user.first_name} ${user.last_name}`}
                                    size="lg"
                                />
                                <div className="ml-4">
                                    <h3 className="font-bold">{`${user.first_name} ${user.last_name}`}</h3>
                                    <p className="text-sm text-gray-500">{user.profile_type}</p>
                                </div>
                            </Link>
                            <div>
                                {type === "sent" ? (
                                    <button
                                        id={"undo_" + user.id}
                                        onClick={() => handleAction(user.id, "undo")}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Undo Request
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            id={"accept_" + user.id}
                                            onClick={() => handleAction(user.id, "accept")}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            id={"reject_" + user.id}
                                            onClick={() => handleAction(user.id, "reject")}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">
                    {type === "received" ? (
                        <>
                            <FaUserGroup className="inline-block mr-2" />
                            You haven't received any requests yet.
                        </>
                    ) : (
                        <>
                            <FaUserPlus className="inline-block mr-2" />
                            You haven't sent any requests yet.
                        </>
                    )}
                </div>
                )}
            </div>
        </div>
    );
};

export default RequestsSection;
