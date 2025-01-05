// C:\Users\user\Documents\AxgriX\agrix-client\src\pages\FlashSalesPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ListingImagesSlider from "../components/listingImageSlider"; // Corrected import path
// import MobileNav from "../components/mobileNav";


// const FlashSalesPage = () => {
//     const [flashSales, setFlashSales] = useState([]);
//     const [params, setParams] = useState({});
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFlashSales = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/listing/flash-sales`);
//                 setFlashSales(response.data.listings);
//                 console.log(response.data.listings); // Debugging line
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFlashSales();
//     }, []);

//     const getTimeRemaining = (endTime) => {
//         const currentTime = new Date();
//         const timeDiff = new Date(endTime) - currentTime;
        
//         if (timeDiff <= 0) {
//             return "Sale Ended";
//         }

//         const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

//         return `${days}d ${hours}h ${minutes}m`;
//     };

//     if (loading) return <div className="mt-10 text-center text-xl">Loading flash sales...</div>;
//     if (error) return <div className="mt-10 text-center text-xl text-red-600">Error: {error}</div>;

//     return (
//         <div className="md:pe-[4vw] md:ps-[4vw] md:pt-2">
//             <MobileNav />

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {flashSales.map((item) => {
//                     const timeRemaining = getTimeRemaining(item.crop.flash_sale_end); // Assuming `flash_sale_end` is part of item.crop
//                     return (
//                         <div
//                             key={item.id}
//                             className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
//                         >
//                             <ListingImagesSlider images={item.images} />
//                             <div className="p-4">
//                                 <h2 className="text-xl font-semibold text-gray-800">{item.crop.crop_name}</h2>
//                                 <p className="mt-2 text-gray-600">{item.description}</p>
//                                 <p className="mt-4 font-bold text-green-600">
//                                     ${item.crop.discounted_price.toFixed(2)} /kg
//                                 </p>
//                                 <p className="mt-2 text-gray-500">
//                                     Seller: {item.user.first_name} {item.user.last_name}
//                                 </p>
//                                 <p className="mt-2 font-semibold text-red-600">{timeRemaining}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default FlashSalesPage;



















import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingImagesSlider from "../components/listingImageSlider";
import MobileNav from "../components/mobileNav";

const FlashSalesPage = () => {
    const [flashSales, setFlashSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const getTimeRemaining = (endTime) => {
        const currentTime = new Date();
        const timeDiff = new Date(endTime) - currentTime;

        if (timeDiff <= 0) return "Sale Ended";

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}m`;
    };

    const handleQuantityChange = (id, newQuantity) => {
        setFlashSales((prevFlashSales) =>
            prevFlashSales.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

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
            <MobileNav />

            <div
                className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                data-testid="flash-sales-grid"
            >
                {flashSales.map((item) => {
                    const timeRemaining = getTimeRemaining(item.crop.flash_sale_end);
                    const totalPrice = (item.crop.discounted_price * item.quantity).toFixed(2);

                    return (
                        <div
                            key={item.id}
                            data-testid={`flash-sale-item-${item.id}`}
                            className="relative mt-[40px] rounded-lg border bg-white shadow-md transition-shadow hover:shadow-lg"
                        >
                            {/* Flash Sale Banner */}
                            <div
                                className="absolute -right-7 top-7 z-10 rotate-45 transform bg-orange-500 px-4 py-1 text-xl font-bold text-white shadow-lg"
                                data-testid={`flash-sale-banner-${item.id}`}
                            >
                                Flash Sale
                            </div>

                            <ListingImagesSlider images={item.images} />

                            <div className="p-4">
                                <h2
                                    className="text-xl font-semibold text-gray-800"
                                    data-testid={`item-name-${item.id}`}
                                >
                                    {item.crop.crop_name}
                                </h2>
                                <p
                                    className="mt-2 line-clamp-2 text-gray-600"
                                    data-testid={`item-description-${item.id}`}
                                >
                                    {item.description}
                                </p>
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
                                <p
                                    className="mt-2 text-base font-semibold text-red-600"
                                    data-testid={`item-time-remaining-${item.id}`}
                                >
                                    {timeRemaining}
                                </p>

                                {/* Quantity Controls and Buy Now */}
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
                                        className="rounded-md bg-white px-4 py-2 font-semibold text-green-500"
                                        data-testid={`buy-now-${item.id}`}
                                    >
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FlashSalesPage;
