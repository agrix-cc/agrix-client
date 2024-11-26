import React, { useState, useEffect } from "react";
import axios from "axios";
import MobileNav from "../components/mobileNav";
import UserCard from "../components/userCard";
import RequestsSection from "../components/requestsSection";

const Connections = () => {
    const [activeTab, setActiveTab] = useState("getConnected");
    const [users, setUsers] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [connections, setConnections] = useState([]);

    // Fetch data based on active tab
    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

                if (activeTab === "getConnected") {
                    const response = await axios.get(`${baseURL}/connections`);
                    setUsers(response.data.users);
                } else if (activeTab === "requests") {
                    const [sentRes, receivedRes] = await Promise.all([
                        axios.get(`${baseURL}/connections/sent`),
                        axios.get(`${baseURL}/connections/received`),
                    ]);
                    setSentRequests(sentRes.data.requests);
                    setReceivedRequests(receivedRes.data.requests);
                } else if (activeTab === "myConnections") {
                    const response = await axios.get(`${baseURL}/connections/connections`);
                    setConnections(response.data.connections);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [activeTab]);

    // Handle connect action
    const handleConnect = async (userId) => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
            await axios.post(`${baseURL}/connections/request`, { connectedUserId: userId });

            // Update state to reflect the action
            const connectedUser = users.find((user) => user.id === userId);
            setUsers(users.filter((user) => user.id !== userId));
            setSentRequests([...sentRequests, connectedUser]);
        } catch (error) {
            console.error("Error sending connection request:", error);
        }
    };

    // Handle requests actions (Undo, Accept, Reject)
    const handleRequestAction = async (userId, action) => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

            if (action === "undo") {
                await axios.post(`${baseURL}/connections/${userId}/undo`);
                const undoneUser = sentRequests.find((req) => req.id === userId);
                setSentRequests(sentRequests.filter((req) => req.id !== userId));
                setUsers([...users, undoneUser]);
            } else if (action === "accept") {
                await axios.post(`${baseURL}/connections/accept`, { userId });
                const acceptedUser = receivedRequests.find((req) => req.id === userId);
                setConnections([...connections, acceptedUser]);
                setReceivedRequests(receivedRequests.filter((req) => req.id !== userId));
            } else if (action === "reject") {
                await axios.post(`${baseURL}/connections/reject`, { userId });
                setReceivedRequests(receivedRequests.filter((req) => req.id !== userId));
            }
        } catch (error) {
            console.error(`Error performing ${action} request:`, error);
        }
    };

    // Handle removing a connection
    const handleRemoveConnection = async (userId) => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
            await axios.delete(`${baseURL}/connections/${userId}/remove`);

            const removedUser = connections.find((conn) => conn.id === userId);
            setConnections(connections.filter((conn) => conn.id !== userId));
            setUsers([...users, removedUser]); // Add back to "Get Connected"
        } catch (error) {
            console.error("Error removing connection:", error);
        }
    };

    return (
        <div>
            <MobileNav />
            <div className="h-dvh flex flex-col items-center pt-16">
                {/* Tabs Section */}
                <div className="flex border-b w-full justify-center sticky top-0 bg-white z-10">
                    <button
                        onClick={() => setActiveTab("getConnected")}
                        className={`px-6 py-3 font-semibold ${activeTab === "getConnected" ? "border-b-4 border-green-500 text-green-500" : "text-gray-500"}`}
                    >
                        Get Connected
                    </button>
                    <button
                        onClick={() => setActiveTab("myConnections")}
                        className={`px-6 py-3 font-semibold ${activeTab === "myConnections" ? "border-b-4 border-green-500 text-green-500" : "text-gray-500"}`}
                    >
                        My Connections
                    </button>
                    <button
                        onClick={() => setActiveTab("requests")}
                        className={`px-6 py-3 font-semibold ${activeTab === "requests" ? "border-b-4 border-green-500 text-green-500" : "text-gray-500"}`}
                    >
                        Requests
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "getConnected" && (
                    <div className="w-full max-w-screen-lg">
                        <h1 className="text-lg font-bold text-gray-900 mb-4">Get Connected</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {users.map((user) => (
                                <UserCard key={user.id} user={user} onConnect={handleConnect} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "myConnections" && (
                    <div className="w-full max-w-screen-lg">
                        <h1 className="text-lg font-bold text-gray-900 mb-4">My Connections</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {connections.map((conn) => (
                                <UserCard
                                    key={conn.id}
                                    user={conn}
                                    onRemove={() => handleRemoveConnection(conn.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "requests" && (
                    <div className="w-full max-w-md md:max-w-[80%] mx-auto">
                        <RequestsSection
                            title="Pending Requests"
                            requests={receivedRequests}
                            type="received"
                            onAction={handleRequestAction}
                        />
                        <RequestsSection
                            title="Requests Sent"
                            requests={sentRequests}
                            type="sent"
                            onAction={handleRequestAction}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connections;
