import React from "react";
import {useNavigate} from "react-router-dom";


const OrderCard = ({item, onClose, listing}) => {

    const navigate = useNavigate();

    const total = item.crop.discounted_price * item.quantity;
    const deposit = (total * 0.4).toFixed(2); // 40% deposit

    const handleFormSubmit = async () => {
        try {
            listing.price_per_kg = listing.discounted_price;
            navigate('/checkout', {
                state: {
                    is_donation: false,
                    qty: item.quantity,
                    CropListing: listing,
                    city: item.listingAllInfo.city,
                    district: item.listingAllInfo.district,
                    image: item.images[0],
                }
            })
        } catch (error) {
            console.log(error)
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
                <p><strong>Discount (40%):</strong> Rs. {deposit}</p>

                <form className="mt-4">
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
