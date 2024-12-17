import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdEdit, MdGridView } from "react-icons/md";
import AddUserForm from "./addUserForm";
import EditUserForm from "./editUserForm";

export default function UserManagement() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUsers();
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

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <p className="text-xl font-semibold text-gray-700">User Management</p>
          <div className="relative" ref={dropdownRef}>
            {/* Sort By Button */}
            <button
              onClick={handleDropdownToggle}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300"
            >
              Sort By
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => setFilter("all")}
                  className={`block w-full text-left px-4 py-2 ${filter === "all" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Default Sort
                </button>
                <button
                  onClick={() => setFilter("farmer")}
                  className={`block w-full text-left px-4 py-2 ${filter === "farmer" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Farmers Only
                </button>
                <button
                  onClick={() => setFilter("seller")}
                  className={`block w-full text-left px-4 py-2 ${filter === "seller" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Sellers Only
                </button>
                <button
                  onClick={() => setFilter("storage")}
                  className={`block w-full text-left px-4 py-2 ${filter === "storage" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Storage Only
                </button>
                <button
                  onClick={() => setFilter("transport")}
                  className={`block w-full text-left px-4 py-2 ${filter === "transport" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                >
                  Filter Transport Only
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Add User
        </button>
      </div>

      {showAddUserModal && (
        <AddUserForm
          onClose={() => setShowAddUserModal(false)}
          onSubmit={(data) => setUsers([...users, data])}
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
            {users.map((user) => (
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