import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "../../components/ui/avatar";

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const socket = useRef(null);
  const baseURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}/connections/connections`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        setUsers(response.data.connections);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [baseURL]);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}/api/conversation/${selectedUser.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        setMessages(response.data.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        toast.error("Error fetching messages.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [selectedUser, baseURL]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    if (newMessage.length > 256) {
      toast.error("Message exceeds the 256-character limit.");
      return;
    }

    try {
      const message = { receiver_id: selectedUser.id, content: newMessage };
      const response = await axios.post(`${baseURL}/api/messages/send`, message, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
      });

      if (response.status === 201) {
        setMessages((prev) => [...prev, { ...response.data.data, sender_id: userId }]);
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
    if (isLoading) return <p id="loading-users" className="p-4">Loading users...</p>;
    if (users.length === 0)
      return <p id="no-users" className="p-4 text-gray-500">No users found.</p>;

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

    return messages.map((msg, idx) => {
      const isSentByCurrentUser = msg.sender_id === parseInt(userId, 10);

      return (
        <div
          id={`message-${idx}`}
          key={idx}
          className={`flex mb-3 ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs text-sm shadow ${
              isSentByCurrentUser ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            }`}
          >
            <p>{msg.content}</p>
            <small className="block text-xs text-gray-400">
              {new Date(msg.created_at).toLocaleTimeString()}
            </small>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="messages-app" className="flex h-screen w-full gap-2 p-8">
      {/* Sidebar */}
      <div id="sidebar" className="h-3/4 w-1/4 overflow-y-auto border-r bg-gray-100">
        <div id="sidebar-header" className="sticky top-0 bg-gray-200 p-4 shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Chats</h2>
        </div>
        {renderUsers()}
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
                <AiOutlineSend size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
