import React, { useState } from "react";
import axios from "axios";


const OrderCard = ({ item, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    deliveryOption: "Pickup",
  });

  const total = item.crop.discounted_price * item.quantity;
  const deposit = (total * 0.4).toFixed(2); // 40% deposit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
        const response = axios.post(`${process.env.REACT_APP_SERVER_URL}/flashSalesOrders`, { 

        userId: item.userId, 
        cropId: item.crop.id, 
        quantity: item.quantity,
        totalPrice: total,
        deposit_amount: deposit,
        address: formData.address,
        orderDate: new Date().toISOString(),
      });

      if (response.data.status === "success") {
        alert("Order successfully placed!");
        onSubmit(response.data.order); 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      alert("Failed to place the order: " + errorMessage);
          }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
        <p><strong>Name:</strong> {item.crop.crop_name}</p>
        <p><strong>Type:</strong> {item.crop.crop_type}</p>
        <p><strong>Price per Kg:</strong> Rs. {item.crop.discounted_price.toFixed(2)}</p>
        <p><strong>Quantity:</strong> {item.quantity} Kg</p>
        <p><strong>Total:</strong> Rs. {total.toFixed(2)}</p>
        <p><strong>Deposit (40%):</strong> Rs. {deposit}</p>

        <form className="mt-4">
          <label className="mb-2 block">Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-4 w-full rounded-md border p-2"
            placeholder="Enter your name"
          />

          <label className="mb-2 block">Address *</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mb-4 w-full rounded-md border p-2"
            placeholder="Enter a location"
          />

          <button
            type="button"
            onClick={handleFormSubmit}
            className="w-full rounded-md bg-green-500 py-2 font-bold text-white"
          >
            Proceed to Checkout
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-red-500 py-2 font-bold text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
