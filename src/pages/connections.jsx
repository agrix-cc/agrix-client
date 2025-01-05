import React, { useState, useEffect } from "react";
import axios from "axios";
import MobileNav from "../components/mobileNav";
import UserCard from "../components/userCard";
import RequestsSection from "../components/requestsSection";
import BackToHome from "../components/onboarding/backtohome";
import { FaUsers } from "react-icons/fa6";

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
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("jwtToken")}`;

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
          const response = await axios.get(
            `${baseURL}/connections/connections`
          );
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
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("jwtToken")}`;
      await axios.post(`${baseURL}/connections/request`, {
        connectedUserId: userId,
      });

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
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("jwtToken")}`;

      if (action === "undo") {
        await axios.post(`${baseURL}/connections/${userId}/undo`);
        const undoneUser = sentRequests.find((req) => req.id === userId);
        setSentRequests(sentRequests.filter((req) => req.id !== userId));
        setUsers([...users, undoneUser]);
      } else if (action === "accept") {
        await axios.post(`${baseURL}/connections/accept`, { userId });
        const acceptedUser = receivedRequests.find((req) => req.id === userId);
        setConnections([...connections, acceptedUser]);
        setReceivedRequests(
          receivedRequests.filter((req) => req.id !== userId)
        );
      } else if (action === "reject") {
        await axios.post(`${baseURL}/connections/reject`, { userId });
        setReceivedRequests(
          receivedRequests.filter((req) => req.id !== userId)
        );
      }
    } catch (error) {
      console.error(`Error performing ${action} request:`, error);
    }
  };

  // Handle removing a connection
  const handleRemoveConnection = async (userId) => {
    try {
      const baseURL = process.env.REACT_APP_SERVER_URL;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("jwtToken")}`;
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
        <BackToHome/>

      <div className="flex h-dvh flex-col items-center pt-16">
        {/* Tabs Section */}
        {/* <div className="sticky top-0 z-10 flex w-full justify-center border-b bg-white">
          <button
            id="get_connected_btn"
            onClick={() => setActiveTab("getConnected")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "getConnected"
                ? "border-b-4 border-green-500 text-green-500"
                : "text-gray-500"
            }`}
          >
            Get Connected
          </button>
          <button
            id="my_connections_btn"
            onClick={() => setActiveTab("myConnections")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "myConnections"
                ? "border-b-4 border-green-500 text-green-500"
                : "text-gray-500"
            }`}
          >
            My Connections
          </button>
          <button
            id="connection_requests_btn"
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "requests"
                ? "border-b-4 border-green-500 text-green-500"
                : "text-gray-500"
            }`}
          >
            Requests
          </button>
        </div> */}

        {/* Tab Content */}
        {activeTab === "getConnected" && (
          <div className="w-full max-w-screen-lg">
            <h1 className="mb-4 text-lg font-bold text-gray-900">
              All Users
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {users.map((user) => (
                <UserCard
                  btnId={user.id}
                  key={user.id}
                  user={user}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "myConnections" && (
          <div className="w-full max-w-screen-lg">
            {connections.length > 0 ? (
              <>
                <h1 className="mb-4 text-lg font-bold text-gray-900">
                  My Connections
                </h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {connections.map((conn) => (
                    <UserCard
                      btnId={conn.id}
                      key={conn.id}
                      user={conn}
                      onRemove={() => handleRemoveConnection(conn.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-8 flex flex-col items-center justify-center">
                <FaUsers className="mb-4 text-6xl text-gray-500" />
                <p className="mb-4 text-lg text-gray-500">
                  You haven't made any connections. Let's Connect.
                </p>
                <button
                  className="rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600"
                  onClick={() => setActiveTab("getConnected")}
                >
                  Connect
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="mx-auto w-full max-w-md md:max-w-[80%]">
            <RequestsSection
              title="Pending Requests"
              requests={receivedRequests}
              type="received"
              onAction={handleRequestAction}
              isExpandedDefault={true} // Expanded by default
            />
            <RequestsSection
              title="Requests Sent"
              requests={sentRequests}
              type="sent"
              onAction={handleRequestAction}
              isExpandedDefault={false} // Collapsed by default
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
