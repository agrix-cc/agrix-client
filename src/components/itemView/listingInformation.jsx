import React from 'react';
import ListingProgressBar from "./listingProgressBar";

const ListingInformation = () => {
    return (
        <>
            <div className="mb-2">
                <p className="text-2xl font-medium">Fresh Tomatoes for Sale</p>
                <p className="text-gray-500">Crop</p>
            </div>
            <div className="mb-2 flex justify-between items-center">
                <div>
                    <p className="text-2xl font-medium">Rs. 100.00</p>
                    <p className="text-gray-500">Price per Kg</p>
                </div>
                <p className="text-sage-green font-medium">24 Kg Available</p>
            </div>
            <ListingProgressBar/>
            <div className="mt-2">
                <p className="text-lg font-medium mb-2">Description</p>
                <p>
                    Get 10kg of freshly harvested, vine-ripened tomatoes, perfect for sauces, salads, and more! Grown
                    organically, bursting with flavor, and delivered farm-fresh.
                </p>
            </div>
            <div className="mt-4">
                <p className="text-lg font-medium mb-2">More Information</p>
                <ul className="list-disc mx-6">
                    <li>Condition: Fresh</li>
                    <li>Quality: Grade B</li>
                    <li>Location: Kurunegala</li>
                    <li>Delivery: Not-available</li>
                    <li>Harvested date: 28/09/2024</li>
                </ul>
            </div>
        </>
    );
};

export default ListingInformation;