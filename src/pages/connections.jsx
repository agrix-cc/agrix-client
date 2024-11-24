import React, { useState, useEffect } from "react";
import axios from "axios";
import MobileNav from "../components/mobileNav";
import UserCard from "../components/userCard";

const Connections = () => {
    const [activeTab, setActiveTab] = useState("getConnected");
    const [expandedList, setExpandedList] = useState("pendingRequests"); // Default expanded list
    const [users, setUsers] = useState(null); // To store fetched users
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const [currentPage, setCurrentPage] = useState(1); // Current page

    const baseURL = process.env.REACT_APP_SERVER_URL; // Load the base URL from the environment variable

    // Fetch users function
    const fetchUsers = async (page) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`; // Set the token in the header
            const response = await axios.get(`${baseURL}/connections?page=${page}`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    
    // Fetch users when the "Get Connected" tab is active or when the page changes
    useEffect(() => {
        if (activeTab === "getConnected") {
            fetchUsers(currentPage);
        }
    }, [activeTab, currentPage]);

    // Handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Toggle list
    const toggleList = (listName) => {
        setExpandedList((prevList) => (prevList === listName ? "" : listName));
    };
    
    return (
        <div>
            <MobileNav />
            <div className="h-dvh flex flex-col items-center pt-16 md:pt-20">
                {/* Tabs Section */}
                <div className="flex border-b border-gray-300 w-full justify-center sticky top-0 bg-white z-10">
                    <button
                        onClick={() => handleTabClick("getConnected")}
                        className={`px-6 py-3 font-semibold focus:outline-none ${
                            activeTab === "getConnected"
                                ? "border-b-4 border-green-500 text-green-500"
                                : "text-gray-500"
                        }`}
                    >
                        Get Connected
                    </button>
                    <button
                        onClick={() => handleTabClick("myConnections")}
                        className={`px-6 py-3 font-semibold focus:outline-none ${
                            activeTab === "myConnections"
                                ? "border-b-4 border-green-500 text-green-500"
                                : "text-gray-500"
                        }`}
                    >
                        My Connections
                    </button>
                    <button
                        onClick={() => handleTabClick("requests")}
                        className={`px-6 py-3 font-semibold focus:outline-none ${
                            activeTab === "requests"
                                ? "border-b-4 border-green-500 text-green-500"
                                : "text-gray-500"
                        }`}
                    >
                        Requests
                    </button>
                </div>

                {/* Tab Content Section */}
                <div className="flex flex-col items-center justify-center mt-8 w-full px-4">
                    {activeTab === "getConnected" && (
                        <div className="w-full max-w-screen-lg mx-auto">
                            <h1 className="text-lg font-bold text-gray-900 mb-4">Get Connected</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {users && users.map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                            </div>
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6 mb-6">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="mx-4 text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "myConnections" && (
                        <div className="text-center">
                            <h1 className="text-lg font-bold text-gray-900">My Connections</h1>
                            <p className="text-sm text-gray-500 mt-2">Content will be available soon.</p>
                        </div>
                    )}

                    {activeTab === "requests" && (
                        <div className="w-full max-w-md md:max-w-[80%] mx-auto">
                            {/* Pending Requests Section */}
                            <div
                                className="border-b border-gray-300 py-2 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleList("pendingRequests")}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 text-left">
                                    Pending Requests
                                </h2>
                                <span className="text-gray-500">
                                    {expandedList === "pendingRequests" ? "▲" : "▼"}
                                </span>
                            </div>
                            {expandedList === "pendingRequests" && (
                                <div className="p-4 bg-gray-50 border-b border-gray-300">
                                    <p className="text-sm text-gray-500">Content will be available soon.</p>
                                </div>
                            )}

                            {/* Requests Sent Section */}
                            <div
                                className="border-b border-gray-300 py-2 cursor-pointer flex justify-between items-center mt-2"
                                onClick={() => toggleList("requestsSent")}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 text-left">
                                    Requests Sent
                                </h2>
                                <span className="text-gray-500">
                                    {expandedList === "requestsSent" ? "▲" : "▼"}
                                </span>
                            </div>
                            {expandedList === "requestsSent" && (
                                <div className="p-4 bg-gray-50 border-b border-gray-300">
                                    <p className="text-sm text-gray-500">Content will be available soon.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Connections;
