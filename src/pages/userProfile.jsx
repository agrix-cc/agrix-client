// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import MobileNav from "../components/mobileNav"; // Import the header component
// import {Avatar} from "../components/ui/avatar"; // Import the desktop header component if needed

// const UserProfile = () => {
//     const { userId } = useParams(); // Get the user ID from the URL
//     const [userData, setUserData] = useState(null);
//     const [listings, setListings] = useState([]);
//     const [connectionStatus, setConnectionStatus] = useState(null); // null, "pending", "connected"
//     const [openedRemoveBtn, setOpenedRemoveBtn] = useState(false);

//     // Fetch user profile and listings
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const baseURL = process.env.REACT_APP_SERVER_URL;
//                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
//                 const response = await axios.get(`${baseURL}/profile/${userId}`);
//                 setUserData(response.data.user);
//                 setListings(response.data.listings);
//                 // Fetch connection status
//                 const connectionResponse = await axios.get(`${baseURL}/connections/status/${userId}`);
//                 setConnectionStatus(connectionResponse.data.status);
//             } catch (error) {
//                 console.error("Error fetching user profile:", error);
//             }
//         };

//         fetchUserProfile();
//     }, [userId]);

//     // Remove connection handler
//     const handleRemoveConnection = async () => {
//         try {
//             const baseURL = process.env.REACT_APP_SERVER_URL;
//             axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
//             await axios.delete(`${baseURL}/connections/${userId}/remove`);
//             setConnectionStatus(null);
//         } catch (error) {
//             console.error("Error removing connection:", error);
//         }
//     };

//     // Send connection request handler
//     const handleConnect = async () => {
//         try {
//             const baseURL = process.env.REACT_APP_SERVER_URL;
//             axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
//             await axios.post(`${baseURL}/connections/request`, { connectedUserId: userId });
//             setConnectionStatus("pending");
//         } catch (error) {
//             console.error("Error sending connection request:", error);
//         }
//     };

//     if (!userData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <MobileNav /> {/* Include the header component */}
//             <div className="mx-auto max-w-screen-lg p-4 pt-16"> {/* Added padding-top */}
//                 <div className="mb-6 flex items-center">
//                     {/* Profile Icon */}
//                     <Avatar
//                         src={userData.imageUrl}
//                         size="2xl"
//                         name={userData.first_name+" "+userData.last_name}/>
//                     <div className="ml-6">
//                         {/* User Info */}
//                         <h1 className="text-2xl font-bold">{`${userData.first_name} ${userData.last_name}`}</h1>
//                         <p className="text-sm text-gray-600">{userData.profile_type}</p>
//                         <p className="text-sm text-gray-500">{`${userData.city || ""} ${userData.district || ""}`}</p>
//                         <p className="mt-2 text-gray-700">{userData.bio}</p>
//                         <div className="mt-4 flex items-center space-x-4">
//                             {/* Message Button */}
//                             <button
//                                 className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-all hover:bg-gray-300"
//                                 onClick={() => console.log("Message feature not yet implemented")}
//                             >
//                                 Message
//                             </button>
//                             {connectionStatus === "accepted" ? (
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setOpenedRemoveBtn(!openedRemoveBtn)}
//                                         className="rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600"
//                                     >
//                                         Connected
//                                     </button>
//                                     <div className={`${openedRemoveBtn ? '' : 'invisible'} absolute mt-2 right-0 bg-white border rounded shadow-lg"`}>
//                                         <button
//                                             onClick={handleRemoveConnection}
//                                             className="block w-full px-4 py-2 text-left text-red-600 transition-all hover:bg-gray-100"
//                                         >
//                                             Remove Connection
//                                         </button>
//                                     </div>
//                                 </div>
//                             ) : connectionStatus === "pending" ? (
//                                 <button
//                                     className="rounded bg-black px-4 py-2 text-white transition-all"
//                                 >
//                                     Pending 
//                                 </button>
//                             ) : (
//                                 <button
//                                     className="rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600"
//                                     onClick={handleConnect}
//                                 >
//                                     Connect
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <hr className="my-6" />
//                 {/* Listings Section */}
//                 <h2 className="mb-4 text-xl font-bold">Listings</h2>
//                 {listings.length > 0 ? (
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//                         {listings.map((listing) => (
//                             <Link to={`/product/${listing.id}`} key={listing.id}>
//                                 <div className="rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
//                                     <h3 className="text-lg font-semibold">{listing.title}</h3>
//                                     <p className="text-sm text-gray-500">{listing.description}</p>
//                                     <p className="mt-2 text-sm font-bold text-green-600">LKR{listing.price}</p>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-600">This user has not listed anything yet!</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
























































import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MobileNav from "../components/mobileNav";
import { Avatar } from "../components/ui/avatar";
import io from "socket.io-client";

const UserProfile = () => {
    const { userId } = useParams(); // Get user ID from URL
    const [userData, setUserData] = useState(null);
    const [listings, setListings] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState(null); // "null", "pending", "connected"
    const [openedRemoveBtn, setOpenedRemoveBtn] = useState(false);
    const [showMessageUI, setShowMessageUI] = useState(false);
    const [temporaryMessage, setTemporaryMessage] = useState("");
    const [messageCount, setMessageCount] = useState(0);
    const [messages, setMessages] = useState([]); // Add state for messages
    const [isLoading, setIsLoading] = useState(false); // For loading state

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;

                const [profileResponse, connectionResponse] = await Promise.all([
                    axios.get(`${baseURL}/profile/${userId}`),
                    axios.get(`${baseURL}/connections/status/${userId}`),
                ]);

                setUserData(profileResponse.data.user);
                setListings(profileResponse.data.listings);
                setConnectionStatus(connectionResponse.data.status);
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
            setIsLoading(true);
            try {
                const baseURL = process.env.REACT_APP_SERVER_URL;
                const response = await axios.get(`${baseURL}/api/conversation/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
                });
                setMessages(response.data.data); // Set messages
            } catch (err) {
                console.error("Error fetching messages:", err);
                toast.error("Error fetching messages.");
            } finally {
                setIsLoading(false);
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
            toast.error("Message exceeds the 256-character limit.");
            return;
        }
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

    const handleRemoveConnection = async () => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            await axios.delete(`${baseURL}/connections/${userId}/remove`);
            setConnectionStatus(null);
        } catch (error) {
            console.error("Error removing connection:", error);
        }
    };

    const handleConnect = async () => {
        try {
            const baseURL = process.env.REACT_APP_SERVER_URL;
            await axios.post(`${baseURL}/connections/request`, { connectedUserId: userId });
            setConnectionStatus("pending");
        } catch (error) {
            console.error("Error sending connection request:", error);
        }
    };

    if (!userData) return <div className="my-16 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <MobileNav />
            <div className="mx-auto max-w-screen-lg p-6 pt-16">
                {/* User Profile Section */}
                <div className="mb-6 flex items-center rounded-lg bg-white p-6 shadow-lg">
                    <Avatar
                        src={userData.imageUrl}
                        size="2xl"
                        name={`${userData.first_name} ${userData.last_name}`}
                    />
                    <div className="ml-6 flex-1">
                        <h1 className="text-3xl font-semibold text-gray-800">{`${userData.first_name} ${userData.last_name}`}</h1>
                        <p className="text-sm text-gray-500">{userData.profile_type}</p>
                        <p className="text-sm text-gray-400">{`${userData.city || ""} ${userData.district || ""}`}</p>
                        <p className="mt-2 text-gray-700">{userData.bio}</p>
                        <div className="mt-4 flex space-x-4">
                            <button
                                className="rounded-full bg-blue-600 px-6 py-2 text-white transition-all hover:bg-blue-700"
                                onClick={() => setShowMessageUI(true)}
                            >
                                Send Message
                            </button>
                            {/* {connectionStatus === "accepted" ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenedRemoveBtn(!openedRemoveBtn)}
                                        className="rounded-full bg-green-500 px-6 py-2 text-white transition-all hover:bg-green-600"
                                    >
                                        Connected
                                    </button>
                                    {openedRemoveBtn && (
                                        <div className="absolute right-0 mt-2 rounded border bg-white shadow-lg">
                                            <button
                                                onClick={handleRemoveConnection}
                                                className="block w-full px-4 py-2 text-left text-red-600 transition-all hover:bg-gray-100"
                                            >
                                                Remove Connection
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : connectionStatus === "pending" ? (
                                <button className="rounded-full bg-yellow-500 px-6 py-2 text-white transition-all hover:bg-yellow-600">
                                    Pending
                                </button>
                            ) : (
                                <button
                                    className="rounded-full bg-gray-800 px-6 py-2 text-white transition-all hover:bg-gray-900"
                                    onClick={handleConnect}
                                >
                                    Connect
                                </button>
                            )} */}
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                {/* Listings Section */}
                <h2 className="mb-6 text-2xl font-semibold">User's Listings</h2>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <Link to={`/product/${listing.id}`} key={listing.id}>
                                <div className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-xl">
                                    <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
                                    <p className="text-sm text-gray-600">{listing.description}</p>
                                    <p className="mt-2 text-lg font-bold text-green-600">LKR {listing.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No listings available from this user.</p>
                )}
            </div>

            {/* Message UI Modal */}
            {showMessageUI && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                            Send a Message to {`${userData.first_name} ${userData.last_name}`}
                        </h2>
                        {messages.length > 0 ? (
                            <div className="mb-4 max-h-60 overflow-y-scroll">
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
                            <p className="text-gray-500">No messages yet.</p>
                        )}
                        <textarea
                            value={temporaryMessage}
                            onChange={(e) => setTemporaryMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="mb-4 h-32 w-full rounded-lg border p-3"
                        />
                        <div className="flex justify-between">
                            <button
                                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-all hover:bg-blue-700"
                                onClick={handleSendMessage}
                                disabled={messageCount >= 3}
                            >
                                {messageCount < 3 ? "Send Message" : "Limit Reached"}
                            </button>
                            <button
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
