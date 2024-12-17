import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditUserForm({ userId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileType: "",
    address: "",
    city: "",
    district: "",
    contactNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/manage-users/users/${userId}`);
        if (response.data.status === "success") {
          const user = response.data.user;
          setFormData({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profileType: user.profile_type,
            address: user.address,
            city: user.city,
            district: user.district,
            contactNumber: user.contact_number,
          });
        } else {
          alert("Failed to fetch user: " + response.data.message);
        }
      } catch (error) {
        alert("Error fetching user: " + error.message);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/manage-users/users/${userId}`, formData);
      if (response.data.status === "success") {
        alert("Successfully updated user");
        onUpdate();
      } else {
        alert("Failed to update user: " + response.data.message);
      }
    } catch (error) {
      alert("Error updating user: " + error.message);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Edit User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Profile Type</label>
            <select
              name="profileType"
              value={formData.profileType}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              disabled
            >
              <option value="">Select a profile type</option>
              <option value="farmer">Farmer</option>
              <option value="seller">Seller</option>
              <option value="transport">Transport</option>
              <option value="storage">Storage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}