import React, {useEffect, useState} from 'react';

const ListingInformation = (props) => {

    const {listing} = props;
    listing.wantedListing = undefined;

    const [pricing, setPricing] = useState({
        price: 0,
        priceDescription: "",
        qty: ""
    })

    useEffect(() => {
        switch (listing.listing_type) {
            case "storage":
                setPricing({
                    price: listing.StorageListing.daily_rate,
                    priceDescription: "Daily rental",
                    qty: null
                })
                break;
            case "transport":
                setPricing({
                    price: listing.TransportListing.price_per_km,
                    priceDescription: "Price per km",
                    qty: null
                })
                break;
            case "crop":
                setPricing({
                    price: listing.CropListing.price_per_kg,
                    priceDescription: "Price per kg",
                    qty: listing.CropListing.available_quantity > 0 ?
                        `${listing.CropListing.available_quantity} Kg available` : 'Sold out'
                })
                break;
            case "wanted":
                setPricing({
                    price: listing.WantedListing.wanted_price,
                    priceDescription: "Expecting price per kg",
                    qty: listing.WantedListing.wanted_quantity > 0 ?
                        `${listing.WantedListing.wanted_quantity} Kg Wanted` : 'Sold out'
                })
                break;
            default:
                break
        }
    }, [listing]);

    return (
        <div className="mt-6 px-4 md:mt-20">
            <div className="mb-2">
                <p className="text-2xl font-medium">{listing.title}</p>
                <p className="capitalize text-gray-500">{listing.listing_type}</p>
            </div>
            <div className="mb-2 flex items-center justify-between">
                {!listing.WantedListing?.is_donation &&
                    <div>
                        <p className="text-2xl font-medium">Rs. {pricing.price?.toFixed(2)}</p>
                        <p className="text-gray-500">{pricing.priceDescription}</p>
                    </div>
                }
                {listing.CropListing &&
                    <p className={`font-medium ${listing.CropListing.available_quantity ? 'text-sage-green' : 'text-red-500'}`}>{pricing.qty}</p>
                }
            </div>
            {listing.WantedListing?.is_donation &&
                <div className="rounded bg-lime-green p-2 text-white text-center md:max-w-sm">
                    <p>Donation request</p>
                </div>
            }
            {listing.WantedListing?.wanted_quantity &&
                <div className="mt-4">
                    <p className="text-lg font-medium">Requested quantity</p>
                    <p className="text-lg">{listing.WantedListing?.wanted_quantity} Kg</p>
                </div>
            }
            <div className="mt-2">
                <p className="mb-2 text-lg font-medium">Description</p>
                <p>{listing.description}</p>
            </div>
            <div className="mt-2">
                {listing.CropListing &&
                    <CropInformation {...listing.CropListing}/>
                }
                {listing.TransportListing &&
                    <TransportInformation {...listing.TransportListing}/>
                }
                {listing.StorageListing &&
                    <StorageInformation {...listing.StorageListing}/>
                }
            </div>
            <div className={`mt-2 ${listing.CropListing && "mb-32"}`}>
                <p className='text-lg font-medium'>Location</p>
                <ul className="ml-4">
                    <li>District: {listing.district}</li>
                    <li>City: {listing.city}</li>
                </ul>
            </div>
        </div>
    );
};

const CropInformation = (props) => {
    const {
        quality_condition,
        quality_grade,
        delivery_options,
        delivery_fare_per_kg,
        best_before_date,
        harvested_date,
        available_quantity,
        crop_name,
        crop_type,
        organic,
        price_per_kg,
        createdAt,
        updatedAt,
    } = props;
    return (
        <div>
            <p className="mb-2 text-lg font-medium">Crop Information</p>
            <ul className="mx-6 list-disc">
                <li className="text-gray-500">Crop Name: <span className="capitalize text-black">{crop_name}</span></li>
                <li className="text-gray-500">Crop Type: <span className="capitalize text-black">{crop_type}</span></li>
                <li className="text-gray-500">Organic: <span className="text-black">{organic ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Condition: <span
                    className="capitalize text-black">{quality_condition}</span></li>
                <li className="text-gray-500">Quality: <span className="text-black">Grade {quality_grade}</span></li>
                <li className="text-gray-500">Harvested date: <span
                    className="text-black">{new Date(harvested_date).toLocaleDateString()}</span></li>
                <li className="text-gray-500">Best before date: <span
                    className="text-black">{new Date(best_before_date).toLocaleDateString()}</span></li>
                <li className="text-gray-500">Delivery: <span
                    className="capitalize text-black">{delivery_options === "both" ? 'Pickup and Deliver both' : delivery_options}</span>
                </li>
                {delivery_fare_per_kg !== 0 &&
                    <li className="text-gray-500">Delivery fare per kg: <span
                        className="capitalize text-black">Rs. {delivery_fare_per_kg.toFixed(2)}</span></li>
                }
                <li className="text-gray-500">Available Quantity: <span
                    className="text-black">{available_quantity} Kg</span></li>
                <li className="text-gray-500">Price per Kg: <span
                    className="text-black">Rs. {price_per_kg.toFixed(2)}</span></li>
                <li className="text-gray-500">Created At: <span
                    className="text-black">{new Date(createdAt).toDateString()}</span></li>
                <li className="text-gray-500">Updated At: <span
                    className="text-black">{new Date(updatedAt).toDateString()}</span></li>
            </ul>
        </div>
    )
}

const TransportInformation = (props) => {
    const {
        fuel_type,
        max_volume,
        max_weight,
        price_per_km,
        refrigerated,
        temperature_control,
        temperature_control_max,
        temperature_control_min,
        vehicle_type,
        createdAt,
        updatedAt,
    } = props;

    return (
        <div>
            <p className="mb-2 text-lg font-medium">Transport Information</p>
            <ul className="mx-6 list-disc">
                <li className="text-gray-500">Vehicle Type: <span
                    className="capitalize text-black">{vehicle_type}</span></li>
                <li className="text-gray-500">Fuel Type: <span className="capitalize text-black">{fuel_type}</span></li>
                <li className="text-gray-500">Max Volume: <span className="text-black">{max_volume} m³</span></li>
                <li className="text-gray-500">Max Weight: <span className="text-black">{max_weight} kg</span></li>
                <li className="text-gray-500">Price per Km: <span
                    className="text-black">Rs. {price_per_km.toFixed(2)}</span></li>
                <li className="text-gray-500">Refrigerated: <span
                    className="text-black">{refrigerated ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Temperature Control: <span
                    className="text-black">{temperature_control ? "Yes" : "No"}</span></li>
                {temperature_control && (
                    <>
                        <li className="text-gray-500">Temperature Control Max: <span
                            className="text-black">{temperature_control_max}°F</span></li>
                        <li className="text-gray-500">Temperature Control Min: <span
                            className="text-black">{temperature_control_min}°F</span></li>
                    </>
                )}
                <li className="text-gray-500">Created At: <span
                    className="text-black">{new Date(createdAt).toDateString()}</span></li>
                <li className="text-gray-500">Updated At: <span
                    className="text-black">{new Date(updatedAt).toDateString()}</span></li>
            </ul>
        </div>
    );
}

const StorageInformation = (props) => {
    const {
        humidity_control_availability,
        max_capacity,
        width,
        length,
        height,
        pest_control_availability,
        daily_rate,
        maximum_days,
        minimum_days,
        storage_type,
        temperature_control,
        temperature_control_max,
        temperature_control_min,
        ventilation_availability,
        createdAt,
        updatedAt,
    } = props;

    return (
        <div>
            <p className="mb-2 text-lg font-medium">Storage Information</p>
            <ul className="mx-6 list-disc">
                <li className="text-gray-500">Storage Type: <span
                    className="text-black">{storage_type === "cold_room" ? "Cold Room" : "Dry Room"}</span></li>
                <li className="text-gray-500">Maximum Capacity: <span
                    className="text-black">{max_capacity} kg</span></li>
                <li className="text-gray-500">Size: <span className="text-black">{width} x {length} x {height} m³</span>
                </li>
                <li className="text-gray-500">Pricing: <span className="capitalize text-black">Daily rental</span></li>
                <li className="text-gray-500">Daily rental: <span
                    className="text-black">Rs. {daily_rate.toFixed(2)}</span></li>
                <li className="text-gray-500">Minimum rental duration: <span
                    className="text-black">{minimum_days} Days</span></li>
                <li className="text-gray-500">Maximum rental duration: <span
                    className="text-black">{maximum_days} Days</span></li>
                <li className="text-gray-500">Humidity Control: <span
                    className="text-black">{humidity_control_availability ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Pest Control: <span
                    className="text-black">{pest_control_availability ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Ventilation: <span
                    className="text-black">{ventilation_availability ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Temperature Control: <span
                    className="text-black">{temperature_control ? "Yes" : "No"}</span></li>
                {temperature_control && (
                    <>
                        <li className="text-gray-500">Temperature Control Max: <span
                            className="text-black">{temperature_control_max}°F</span></li>
                        <li className="text-gray-500">Temperature Control Min: <span
                            className="text-black">{temperature_control_min}°F</span></li>
                    </>
                )}
                <li className="text-gray-500">Created At: <span
                    className="text-black">{new Date(createdAt).toDateString()}</span></li>
                <li className="text-gray-500">Updated At: <span
                    className="text-black">{new Date(updatedAt).toDateString()}</span></li>
            </ul>
        </div>
    );
}


export default ListingInformation;