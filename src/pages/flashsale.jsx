import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UserCard from "../../components/userCard";
// import RequestsSection from "../../components/requestsSection";
// import { FaUsers } from "react-icons/fa6";
import MobileNav from "../components/mobileNav";

const Connections = () => {
  // const [activeTab, setActiveTab] = useState("getConnected");
  // const [users, setUsers] = useState([]);
  // const [sentRequests, setSentRequests] = useState([]);
  // const [receivedRequests, setReceivedRequests] = useState([]);
  // const [connections, setConnections] = useState([]);

  // Fetch data based on active tab
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const baseURL = process.env.REACT_APP_SERVER_URL;
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${localStorage.getItem("jwtToken")}`;

  //       if (activeTab === "getConnected") {
  //         const response = await axios.get(`${baseURL}/connections`);
  //         setUsers(response.data.users);
  //       } else if (activeTab === "requests") {
  //         const [sentRes, receivedRes] = await Promise.all([
  //           axios.get(`${baseURL}/connections/sent`),
  //           axios.get(`${baseURL}/connections/received`),
  //         ]);
  //         setSentRequests(sentRes.data.requests);
  //         setReceivedRequests(receivedRes.data.requests);
  //       } else if (activeTab === "myConnections") {
  //         const response = await axios.get(
  //           `${baseURL}/connections/connections`
  //         );
  //         setConnections(response.data.connections);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [activeTab]);

  // // Handle connect action
  // const handleConnect = async (userId) => {
  //   try {
  //     const baseURL = process.env.REACT_APP_SERVER_URL;
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${localStorage.getItem("jwtToken")}`;
  //     await axios.post(`${baseURL}/connections/request`, {
  //       connectedUserId: userId,
  //     });

  //     // Update state to reflect the action
  //     const connectedUser = users.find((user) => user.id === userId);
  //     setUsers(users.filter((user) => user.id !== userId));
  //     setSentRequests([...sentRequests, connectedUser]);
  //   } catch (error) {
  //     console.error("Error sending connection request:", error);
  //   }
  // };

  // // Handle requests actions (Undo, Accept, Reject)
  // const handleRequestAction = async (userId, action) => {
  //   try {
  //     const baseURL = process.env.REACT_APP_SERVER_URL;
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${localStorage.getItem("jwtToken")}`;

  //     if (action === "undo") {
  //       await axios.post(`${baseURL}/connections/${userId}/undo`);
  //       const undoneUser = sentRequests.find((req) => req.id === userId);
  //       setSentRequests(sentRequests.filter((req) => req.id !== userId));
  //       setUsers([...users, undoneUser]);
  //     } else if (action === "accept") {
  //       await axios.post(`${baseURL}/connections/accept`, { userId });
  //       const acceptedUser = receivedRequests.find((req) => req.id === userId);
  //       setConnections([...connections, acceptedUser]);
  //       setReceivedRequests(
  //         receivedRequests.filter((req) => req.id !== userId)
  //       );
  //     } else if (action === "reject") {
  //       await axios.post(`${baseURL}/connections/reject`, { userId });
  //       setReceivedRequests(
  //         receivedRequests.filter((req) => req.id !== userId)
  //       );
  //     }
  //   } catch (error) {
  //     console.error(`Error performing ${action} request:`, error);
  //   }
  // };

  // // Handle removing a connection
  // const handleRemoveConnection = async (userId) => {
  //   try {
  //     const baseURL = process.env.REACT_APP_SERVER_URL;
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${localStorage.getItem("jwtToken")}`;
  //     await axios.delete(`${baseURL}/connections/${userId}/remove`);

  //     const removedUser = connections.find((conn) => conn.id === userId);
  //     setConnections(connections.filter((conn) => conn.id !== userId));
  //     setUsers([...users, removedUser]); // Add back to "Get Connected"
  //   } catch (error) {
  //     console.error("Error removing connection:", error);
  //   }
  // };

  return (
    <div>
      <MobileNav />
      <div className="flex h-dvh flex-col items-center pt-16"></div>
    </div>
  );
};

export default Connections;
