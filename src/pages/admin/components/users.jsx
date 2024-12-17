import React, { useState } from "react";
import axios from "axios";
import AddUserForm from "./addUserForm";

export default function UserManagement() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

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
      } else {
        alert("Failed to add user: " + response.data.message);
      }
    } catch (error) {
      alert("Error adding user: " + error.message);
    }

    setShowAddUserModal(false);
  };

  return (
    <div className="p-6">
      <p className="text-xl font-semibold mb-4 text-gray-700">User Management</p>
      <button
        onClick={() => setShowAddUserModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add User
      </button>

      {showAddUserModal && (
        <AddUserForm
          onSubmit={handleAddUser}
          onClose={() => setShowAddUserModal(false)}
        />
      )}
    </div>
  );
}