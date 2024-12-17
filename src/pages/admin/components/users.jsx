import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdGridView } from "react-icons/md";
import AddUserForm from "./addUserForm";
import EditUserForm from "./editUserForm";

export default function UserManagement() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/manage-users/users`);
        if (response.data.status === "success") {
          setUsers(response.data.users);
        } else {
          alert("Failed to fetch users: " + response.data.message);
        }
      } catch (error) {
        alert("Error fetching users: " + error.message);
      }
    };

    fetchUsers();
  }, []);

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
    // Fetch updated users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/manage-users/users`);
        if (response.data.status === "success") {
          setUsers(response.data.users);
        } else {
          alert("Failed to fetch users: " + response.data.message);
        }
      } catch (error) {
        alert("Error fetching users: " + error.message);
      }
    };

    fetchUsers();
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold text-gray-700">User Management</p>
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