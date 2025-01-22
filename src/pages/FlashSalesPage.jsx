import React, {useEffect, useState} from "react";
import axios from "axios";
import ListingImagesSlider from "../components/listingImageSlider";
import MobileNav from "../components/mobileNav";

import OrderCard from "./Order"; // Assuming OrderCard is in the same directory

const FlashSalesPage = () => {
    const [flashSales, setFlashSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showOrderCard, setShowOrderCard] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Fetch flash sale items
    useEffect(() => {
        const fetchFlashSales = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/listing/flash-sales`);
                const updatedListings = response.data.listings.map((item) => ({
                    ...item,
                    quantity: 1, // Initialize quantity for each item
                }));
                setFlashSales(updatedListings);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFlashSales();
    }, []);

    // Update quantity of items
    const handleQuantityChange = (id, newQuantity) => {
        const target = flashSales.filter(item => item.id === id);
        if (target[0].crop.available_quantity >= newQuantity) {
            setFlashSales((prevFlashSales) =>
                prevFlashSales.map((item) =>
                    item.id === id ? {...item, quantity: newQuantity} : item
                )
            );
        }
    };

    // Handle loading and error states
    if (loading) {
        return (
            <div
                className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                data-testid="loading-state"
            >
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        data-testid={`loading-placeholder-${index}`}
                        className="h-72 animate-pulse rounded-lg bg-gray-200 shadow-md"
                    ></div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="mt-10 text-center text-xl text-red-600"
                data-testid="error-state"
            >
                Error: {error}
            </div>
        );
    }

    return (
        <div className="md:px-4 md:pt-2" data-testid="flash-sales-page">
            <MobileNav/>

            <div
                className="mt-12 md:mt-6 mx-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                data-testid="flash-sales-grid"
            >
                {flashSales.map((item) => {
                    const totalPrice = (item.crop.discounted_price * item.quantity).toFixed(2);

                    return (
                        <div
                            key={item.id}
                            data-testid={`flash-sale-item-${item.id}`}
                            className="relative mt-[40px] rounded-lg border bg-white shadow-md transition-shadow hover:shadow-lg"
                        >
                            <div className="relative">
                                <ListingImagesSlider images={item.images}/>
                            </div>

                            <div className="p-4">
                                <h2
                                    className="text-xl font-semibold text-gray-800"
                                    data-testid={`item-name-${item.id}`}
                                >
                                    {item.crop.crop_name}
                                </h2>
                                <p
                                    className="mt-2 line-clamp-2 text-gray-600"
                                    data-testid={`item-available-quantity-${item.id}`}
                                >
                                    Available Amount: {item.crop.available_quantity} Kg
                                </p>
                                <p
                                    className="text-m mt-2 line-clamp-2 text-green-600 line-through"
                                    data-testid={`item-original-price-${item.id}`}
                                >
                                    Rs.{item.crop.price_per_kg.toFixed(2)} Per Kg
                                </p>
                                <p
                                    className="mt-4 text-xl font-bold text-green-600"
                                    data-testid={`item-discounted-price-${item.id}`}
                                >
                                    Rs. {item.crop.discounted_price.toFixed(2)} Per Kg
                                </p>
                                <p
                                    className="mt-2 text-sm text-gray-500"
                                    data-testid={`item-seller-${item.id}`}
                                >
                                    Seller: {item.user.first_name} {item.user.last_name}
                                </p>

                                <div
                                    className="mt-4 flex items-center justify-between rounded-md bg-green-500 p-4"
                                    data-testid={`quantity-controls-${item.id}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    Math.max(1, item.quantity - 1)
                                                )
                                            }
                                            className="text-xl font-bold text-white"
                                            data-testid={`decrease-quantity-${item.id}`}
                                        >
                                            -
                                        </button>
                                        <p
                                            className="text-lg font-semibold text-white"
                                            data-testid={`quantity-${item.id}`}
                                        >
                                            {item.quantity} kg
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item.id, item.quantity + 1)
                                            }
                                            className="text-xl font-bold text-white"
                                            data-testid={`increase-quantity-${item.id}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p
                                        className="text-xl font-semibold text-white"
                                        data-testid={`total-price-${item.id}`}
                                    >
                                        Rs. {totalPrice}
                                    </p>
                                    <button

                                        className="rounded-md px-4 py-2 font-semibold bg-white text-green-500"
                                        data-testid={`buy-now-${item.id}`}
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setShowOrderCard(true);
                                        }}>
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>


                    );
                })}
            </div>

            {showOrderCard && selectedItem && (
                <OrderCard
                    item={selectedItem}
                    onClose={() => setShowOrderCard(false)}
                    listing={selectedItem.crop}
                />
            )}
        </div>
    );
};

export default FlashSalesPage;
