import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdEdit, MdGridView } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import AddUserForm from "./addUserForm";
import EditUserForm from "./editUserForm";

export default function UserManagement() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility
  const [userDistribution, setUserDistribution] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUsers();
    fetchUserDistribution();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const url = filter === "all"
        ? `${process.env.REACT_APP_SERVER_URL}/manage-users/users`
        : `${process.env.REACT_APP_SERVER_URL}/manage-users/users/filter/${filter}`;
      const response = await axios.get(url);
      if (response.data.status === "success") {
        setUsers(response.data.users);
      } else {
        alert("Failed to fetch users: " + response.data.message);
      }
    } catch (error) {
      alert("Error fetching users: " + error.message);
    }
  };

  const fetchUserDistribution = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin-reports/user-distribution`);
      if (response.data.status === "success") {
        const distribution = response.data.data.reduce((acc, item) => {
          acc[item.profile_type] = item.count;
          return acc;
        }, {});
        setUserDistribution(distribution);
      } else {
        alert("Failed to fetch user distribution: " + response.data.message);
      }
    } catch (error) {
      alert("Error fetching user distribution: " + error.message);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        profile_type: userData.profileType,
      });

      if (response.data.status === "success") {
        alert("Successfully added user");
        setUsers([...users, response.data.user]);
        fetchUserDistribution(); // Update distribution after adding user
      } else {
        alert("Failed to add user: " + response.data.message);
      }
    } catch (error) {
      alert("Error adding user: " + error.message);
    }

    setShowAddUserModal(false);
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = () => {
    setShowEditUserModal(false);
    fetchUsers();
    fetchUserDistribution(); // Update distribution after editing user
  };

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const chartData = {
    labels: ["Farmers", "Sellers", "Storage", "Transport", "Admin"],
    datasets: [
      {
        data: [
          userDistribution.farmer || 0,
          userDistribution.seller || 0,
          userDistribution.storage || 0,
          userDistribution.transport || 0,
          userDistribution.admin || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <p className="text-xl font-semibold text-gray-700">User Management</p>
          <div className="relative" ref={dropdownRef}>
            {/* Sort By Button */}
            <button
              id="sort_button"
              onClick={handleDropdownToggle}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300"
            >
              Sort By
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <button
                  id="sort_all"
                  onClick={() => setFilter("all")}
                  className={`block w-full text-left px-4 py-2 ${filter === "all" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Default Sort
                </button>
                <button
                  id="sort_farmer"
                  onClick={() => setFilter("farmer")}
                  className={`block w-full text-left px-4 py-2 ${filter === "farmer" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Farmers Only
                </button>
                <button
                  id="sort_seller"
                  onClick={() => setFilter("seller")}
                  className={`block w-full text-left px-4 py-2 ${filter === "seller" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Sellers Only
                </button>
                <button
                  id="sort_storage"
                  onClick={() => setFilter("storage")}
                  className={`block w-full text-left px-4 py-2 ${filter === "storage" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Storage Only
                </button>
                <button
                  id="sort_transport"
                  onClick={() => setFilter("transport")}
                  className={`block w-full text-left px-4 py-2 ${filter === "transport" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Transport Only
                </button>
                <button
                  id="sort_admin"
                  onClick={() => setFilter("admin")}
                  className={`block w-full text-left px-4 py-2 ${filter === "admin" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Admin Only
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          id="add_user_button"
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Add User
        </button>
      </div>

      <div className="flex items-center mb-8">
        {/* Chart on the Left */}
        <div className="w-1/2 lg:w-1/3">
          <Doughnut data={chartData} />
        </div>

        {/* User Distribution Details on the Right */}
        <div className="w-1/2 lg:w-2/3 pl-8">
          <p className="text-lg font-semibold text-gray-700 mb-2">User Distribution</p>
          <ul className="list-disc list-inside text-gray-600">
            <li className="py-1">Farmers: {userDistribution.farmer || 0}</li>
            <li className="py-1">Sellers: {userDistribution.seller || 0}</li>
            <li className="py-1">Storage: {userDistribution.storage || 0}</li>
            <li className="py-1">Transport: {userDistribution.transport || 0}</li>
            <li className="py-1">Admin: {userDistribution.admin || 0}</li>
          </ul>
        </div>
      </div>

      {showAddUserModal && (
        <AddUserForm
          onClose={() => setShowAddUserModal(false)}
          onSubmit={handleAddUser}
        />
      )}
      {showEditUserModal && (
        <EditUserForm
          userId={selectedUserId}
          onClose={() => setShowEditUserModal(false)}
          onUpdate={handleUpdateUser}
        />
      )}

      {/* Scrollable Table */}
      <div className="overflow-auto border rounded shadow-lg h-[500px]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {["ID", "Name", "Profile Type", "Location", "Address", "Contact", "Email", "Manage"].map(
                (header, index) => (
                  <th key={index} className="py-2 px-4 text-left">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.filter(user => user).map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{`${user.first_name} ${user.last_name}`}</td>
                <td className="border px-4 py-2">{user.profile_type}</td>
                <td className="border px-4 py-2">{`${user.city}, ${user.district}`}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.contact_number}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    id={`edit_user_${user.id}`}
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <MdEdit />
                  </button>
                  <button className="p-2 bg-black text-white rounded hover:bg-gray-800">
                    <MdGridView />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}