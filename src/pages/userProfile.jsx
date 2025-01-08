import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import MobileNav from "../components/mobileNav";
import {Avatar} from "../components/ui/avatar";

const UserProfile = () => {
    const {userId} = useParams(); // Get user ID from URL
    const [userData, setUserData] = useState(null);
    const [listings, setListings] = useState([]);
    const [showMessageUI, setShowMessageUI] = useState(false);
    const [temporaryMessage, setTemporaryMessage] = useState("");
    const [messageCount, setMessageCount] = useState(0);
    const [messages, setMessages] = useState([]); // Add state for messages
    const [isMessageOverLimit, setIsMessageOverLimit] = useState(false); // For character limit check

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

                const [profileResponse] = await Promise.all([
                    axios.get(`${baseURL}/profile/${userId}`),
                    axios.get(`${baseURL}/connections/status/${userId}`),
                ]);

                setUserData(profileResponse.data.user);
                setListings(profileResponse.data.listings);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Error fetching user profile.");
            }
        };
        fetchUserProfile();
    }, [userId]);

    useEffect(() => {
        if (!userData) return; // Prevent error if userData is not fetched yet

        const fetchMessages = async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                const response = await axios.get(`${baseURL}/api/conversation/${userId}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwtToken")}`},
                });
                setMessages(response.data.data); // Set messages
            } catch (err) {
                console.error("Error fetching messages:", err);
                toast.error("Error fetching messages.");
            }
        };
        fetchMessages();
    }, [userData, userId]); // Re-run when userData or userId changes

    const handleSendMessage = async () => {
        if (temporaryMessage.trim() === "") {
            toast.error("Message cannot be empty.");
            return;
        }
        if (temporaryMessage.length > 256) {
            setIsMessageOverLimit(true);
            toast.error("Message exceeds the 256-character limit.");
            return;
        }
        setIsMessageOverLimit(false); // Reset error if within limit
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

            await axios.post(`${baseURL}/api/messages/send`, {
                receiver_id: userId,
                content: temporaryMessage,
            });
            setMessageCount((prev) => prev + 1);
            setTemporaryMessage("");
            toast.success("Message sent successfully!");
        } catch (error) {
            console.error("Error sending temporary message:", error);
            toast.error(error.response?.data?.error || "Failed to send message.");
        }
    };

    if (!userData) return <div id="loading" className="my-16 text-center">Loading...</div>;

    return (
        <div id="user-profile-page" className="min-h-screen bg-gray-50">
            <MobileNav/>
            <div id="profile-container" className="mx-auto max-w-screen-lg p-6 pt-16">
                {/* User Profile Section */}
                <div id="user-profile" className="mb-6 flex items-center rounded-lg bg-white p-6 shadow-lg">
                    <Avatar
                        src={userData.imageUrl}
                        size="2xl"
                        name={`${userData.first_name} ${userData.last_name}`}
                    />
                    <div id="user-details" className="ml-6 flex-1">
                        <h1 id="user-name"
                            className="text-3xl font-semibold text-gray-800">{`${userData.first_name} ${userData.last_name}`}</h1>
                        <p id="profile-type" className="text-sm text-gray-500">{userData.profile_type}</p>
                        <p id="user-location"
                           className="text-sm text-gray-400">{`${userData.city || ""} ${userData.district || ""}`}</p>
                        <p id="user-bio" className="mt-2 text-gray-700">{userData.bio}</p>
                        <div id="message-connect-buttons" className="mt-4 flex space-x-4">
                            <button
                                id="send-message-btn"
                                className="rounded-full bg-blue-600 px-6 py-2 text-white transition-all hover:bg-blue-700"
                                onClick={() => setShowMessageUI(true)}
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-300"/>

                {/* Listings Section */}
                <h2 id="listings-header" className="mb-6 text-2xl font-semibold">User's Listings</h2>
                {listings.length > 0 ? (
                    <div id="listings-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <Link to={`/product/${listing.id}`} key={listing.id}>
                                <div id={`listing-${listing.id}`}
                                     className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-xl">
                                    <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
                                    <p className="text-sm text-gray-600">{listing.description}</p>
                                    <p className="mt-2 text-lg font-bold text-green-600">LKR {listing.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p id="no-listings" className="text-gray-600">No listings available from this user.</p>
                )}
            </div>

            {/* Message UI Modal */}
            {showMessageUI && (
                <div id="message-modal"
                     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div id="message-modal-content" className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                        <h2 id="message-header" className="mb-4 text-2xl font-semibold text-gray-800">
                            Send a Message to {`${userData.first_name} ${userData.last_name}`}
                        </h2>
                        {messages.length > 0 ? (
                            <div id="message-history" className="mb-4 max-h-60 overflow-y-scroll">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-3 p-3 rounded-lg ${
                                            msg.sender_id === userId
                                                ? "bg-gray-200 text-gray-800"
                                                : "bg-blue-600 text-white"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p id="no-messages" className="text-gray-500">No messages yet.</p>
                        )}
                        <textarea
                            id="message-input"
                            value={temporaryMessage}
                            onChange={(e) => setTemporaryMessage(e.target.value)}
                            placeholder="Type your message..."
                            className={`mb-4 h-32 w-full rounded-lg border p-3 ${isMessageOverLimit ? "border-red-500" : ""}`}
                        />
                        {isMessageOverLimit && (
                            <p id="message-limit-warning" className="mt-2 text-sm text-red-500">
                                Your message exceeds the 256-character limit. Please shorten your message.
                            </p>
                        )}
                        <div className="flex justify-between">
                            <button
                                id="send-btn"
                                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-all hover:bg-blue-700"
                                onClick={handleSendMessage}
                                disabled={messageCount >= 3 || isMessageOverLimit}
                            >
                                {messageCount < 3 ? "Send Message" : "Limit Reached"}
                            </button>
                            <button
                                id="close-message-modal-btn"
                                className="rounded-lg bg-gray-400 px-6 py-2 text-white transition-all hover:bg-gray-500"
                                onClick={() => setShowMessageUI(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
