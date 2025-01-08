import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {AiOutlineSend} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import {Avatar} from "../../components/ui/avatar";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";
import {IoAdd} from "react-icons/io5";
import OfferScreen from "../../components/offerScreen";

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [findUserName, setFindUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const baseURL = process.env.REACT_APP_SERVER_URL;
    const [isOpenOffer, setIsOpenOffer] = useState(false);

    const decoded = jwtDecode(localStorage.getItem('jwtToken'));
    const user = decoded.user;
    const userId = user.id;

    useEffect(() => {
        if (!selectedUser) return;

        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${baseURL}/api/conversation/${selectedUser.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwtToken")}`},
                });
                setMessages(response.data.data);
            } catch (err) {
                toast.error("Error fetching messages.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMessages();
    }, [selectedUser, baseURL]);

    useEffect(() => {
        if (!findUserName) {
            setIsLoading(true);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
            axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`)
                .then(res => {
                    setUsers(res.data.data)
                })
                .catch(err => {
                    setIsLoading(false);
                    if (err.response) {
                        console.log(err.response)
                    } else {
                        console.log(err);
                    }
                })
            setIsLoading(false);
            return;
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/profile/search/${findUserName}`)
            .then(res => {
                setUsers(res.data.users)
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                } else {
                    console.log(err);
                }
            })
    }, [findUserName]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedUser) return;

        if (newMessage.length > 256) {
            toast.error("Message exceeds the 256-character limit.");
            return;
        }

        try {
            const message = {receiver_id: selectedUser.id, content: newMessage};
            const response = await axios.post(`${baseURL}/api/messages/send`, message, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwtToken")}`},
            });

            if (response.status === 201) {
                setMessages((prev) => [...prev, {...response.data.data, sender_id: userId}]);
                setNewMessage("");
            } else {
                toast.error("Failed to send message.");
            }
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("Error sending message.");
        }
    };

    const renderUsers = () => {
        if (!users) return <p id="loading-users" className="p-4">Loading users...</p>;
        return users.map((user) => (
            <div
                id={`user-${user.id}`}
                key={user.id}
                className="flex cursor-pointer items-center gap-4 p-4 hover:bg-gray-200"
                onClick={() => setSelectedUser(user)}
            >
                <Avatar
                    src={user.profile_pic}
                    size="2xl"
                    name={`${user.first_name || "Unknown"} ${user.last_name || "User"}`}
                />
                <div>
                    <h3 className="font-medium text-gray-900">
                        {`${user.first_name || "Unknown"} ${user.last_name || "User"}`}
                    </h3>
                    <p className="text-sm text-gray-500">{user.profile_type || "No Profile Type"}</p>
                </div>
            </div>
        ));
    };

    const renderMessages = () => {
        if (isLoading) return <p id="loading-messages">Loading messages...</p>;
        if (messages.length === 0) return <p id="no-messages">No messages yet.</p>;

        return (
            <div className="flex flex-col gap-4">
                {messages.map((msg, idx) => {
                    console.log(msg)
                    const isSentByCurrentUser = msg.sender_id === parseInt(userId, 10); // Ensure userId comparison is correct
                    return (
                        <div
                            id={`message-${idx}`}
                            key={idx}
                            className={`max-w-xs p-3 text-white shadow rounded-lg ${
                                isSentByCurrentUser ? "self-end bg-blue-500" : "self-start bg-gray-700"
                            }`}
                        >
                            <p>{msg.content}</p>
                            <small className="block text-xs text-gray-400">
                                {new Date(msg.created_at).toLocaleTimeString()}
                            </small>
                            {msg.listing_title &&
                                <Link target="_blank" to={`/product/${msg.listing_id}`}
                                      className="bg-white rounded my-1 text-black max-w-xs p-2 block">
                                    <div className="flex gap-2 text-sm">
                                        <img src={msg.listing_image || "/assets/placeholder.webp"} alt="transport"
                                             className="w-12 aspect-square object-cover rounded shadow-md"/>
                                        <div>
                                            <p>{msg.listing_title.length > 20 ? msg.listing_title.slice(0, 20) + "..." : msg.listing_title}</p>
                                            <p className="text-zinc-500">{msg.listing_description.length > 20 ? msg.listing_description.slice(0, 20) + "..." : msg.listing_description}</p>
                                        </div>
                                    </div>
                                </Link>
                            }
                            {msg.offer &&
                                <Link target="_blank" to={`/product/${msg.offer.offered_listing.id}`}
                                      className="bg-white rounded my-1 text-black max-w-xs p-2 block text-sm">

                                    <p>Listing: {msg.offer.offered_listing.title.length > 25 ? msg.offer.offered_listing.title.slice(0, 25) + "..." : msg.offer.offered_listing.title}</p>
                                    <p>Original price:
                                        <del>Rs. {msg.offer.offered_listing.CropListing.price_per_kg.toFixed(2)}</del>
                                    </p>
                                    <p>Offered price: Rs. {msg.offer.offered_price.toFixed(2)}</p>
                                    <p>Offered qty: {msg.offer.offered_qty} Kg</p>
                                </Link>
                            }
                        </div>
                    );
                })}
            </div>
        );
    };

    const sendOffer = async (offerId) => {
        console.log("Message send stareted!")
        try {
            const response = await axios.post(`${baseURL}/api/messages/send`, {
                receiver_id: selectedUser.id,
                content: `${user.first_name} sent an offer`,
                offer_id: offerId,
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwtToken")}`},
            });

            if (response.status === 201) {
                setMessages((prev) => [...prev, {...response.data.data, sender_id: userId}]);
                setNewMessage("");
            } else {
                toast.error("Failed to send message.");
            }
            console.log("Message send")
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("Error sending message.");
        }
    }

    return (
        <div id="messages-app" className="flex h-screen w-full gap-2 p-8">
            {isOpenOffer &&
                <OfferScreen
                    offered_to={selectedUser.id}
                    sendMessage={true}
                    onSend={(offerId) => sendOffer(offerId)}
                    closer={() => setIsOpenOffer(false)}/>
            }

            {/* Sidebar */}
            <div id="sidebar" className="relative h-3/4 w-1/4 overflow-y-auto border-r bg-gray-100">
                <div id="sidebar-header" className="sticky top-0 z-10 bg-gray-200 p-4 shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">Connections</h2>
                </div>
                <div className="sticky top-12 z-10 w-full border border-zinc-300">
                    <input
                        id="user-search-input"
                        type="text"
                        placeholder="Find a user..."
                        value={findUserName}
                        onChange={(e) => setFindUserName(e.target.value)}
                        maxLength={256}
                        className="w-full flex-1 p-3 text-black focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-16">
                    {renderUsers()}
                </div>
            </div>

            {/* Chat Window */}
            <div id="chat-window" className="flex h-3/4 w-3/4 flex-col bg-gray-900 text-white">
                {/* Header */}
                <div id="chat-header" className="sticky top-0 bg-gray-800 p-4 shadow-md">
                    <h2 className="text-xl font-bold">
                        {selectedUser ? `Chat with ${selectedUser.first_name}` : "Select a user to chat"}
                    </h2>
                </div>

                {/* Messages */}
                <div id="messages" className="flex-1 overflow-y-auto p-4">
                    {renderMessages()}
                </div>

                {/* Input */}
                {selectedUser && (
                    <div id="message-input-section" className="sticky bottom-0 bg-gray-800 p-4">
                        <div className="flex items-center gap-3">
                            {(user.profile_type === "farmer" || user.profile_type === "seller") && selectedUser.profile_type === "generaluser" &&
                                <button
                                    onClick={() => setIsOpenOffer(true)}
                                    className="flex items-center justify-between gap-2 rounded-lg bg-lime-green p-3"
                                >
                                    <IoAdd size={24}/>
                                    <span>Send an offer</span>
                                </button>
                            }
                            <input
                                id="message-input"
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                maxLength={256}
                                className="flex-1 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                id="send-message-button"
                                onClick={handleSendMessage}
                                className="rounded-lg bg-blue-500 p-3 hover:bg-blue-700"
                                aria-label="Send message"
                            >
                                <AiOutlineSend size={24}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
