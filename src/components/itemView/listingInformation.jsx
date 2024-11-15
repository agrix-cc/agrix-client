import React, {useEffect, useState} from 'react';
import ListingProgressBar from "./listingProgressBar";

const ListingInformation = (props) => {

    const {listing} = props;

    const [pricing, setPricing] = useState({
        price: 0,
        priceDescription: "",
        qty: ""
    })

    useEffect(() => {
        switch (listing.listing_type) {
            case "storage":
                setPricing({
                    price: listing.StorageListing.price_per_unit,
                    priceDescription: "Price per unit",
                    qty: `${listing.StorageListing.total_units} Units available`
                })
                break;
            case "transport":
                setPricing({
                    price: listing.TransportListing.price_per_km,
                    priceDescription: "Price per km",
                    qty: `${listing.TransportListing.service_radius} Max radius`
                })
                break;
            default:
                setPricing({
                    price: listing.CropListing.price_per_kg,
                    priceDescription: "Price per kg",
                    qty: `${listing.CropListing.available_quantity} Kg available`
                })
                break;
        }
    }, [listing]);

    return (
        <div className="mt-6 mb-[120px] md:mb-4 px-4 md:mt-20">
            <div className="mb-2">
                <p className="text-2xl font-medium">{listing.title}</p>
                <p className="text-gray-500 capitalize">{listing.listing_type}</p>
            </div>
            <div className="mb-2 flex justify-between items-center">
                <div>
                    <p className="text-2xl font-medium">Rs. {pricing.price.toFixed(2)}</p>
                    <p className="text-gray-500">{pricing.priceDescription}</p>
                </div>
                <p className="text-sage-green font-medium">{pricing.qty}</p>
            </div>
            {/*TODO Create progress bar*/}
            <ListingProgressBar/>
            <div className="mt-2">
                <p className="text-lg font-medium mb-2">Description</p>
                <p>{listing.description}</p>
            </div>
            <div className="lg:flex lg:justify-around">
                <div className="mt-2">
                    <ul>
                        {
                            listing.CropListing ?
                                <CropInformation {...listing.CropListing}/>
                                : (listing.TransportListing ?
                                    <TransportInformation {...listing.TransportListing}/>
                                    : (listing.StorageListing ? <StorageInformation {...listing.StorageListing}/>
                                        : null))
                        }
                    </ul>
                </div>
                <div className="my-2">
                    <p className="font-medium text-lg">Location</p>
                    <ul className="ml-4">
                        <li>District: {listing.district}</li>
                        <li>City: {listing.city}</li>
                    </ul>
                </div>
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
            <p className="text-lg font-medium mb-2">Crop Information</p>
            <ul className="list-disc mx-6">
                <li className="text-gray-500">Crop Name: <span className="text-black capitalize">{crop_name}</span></li>
                <li className="text-gray-500">Crop Type: <span className="text-black capitalize">{crop_type}</span></li>
                <li className="text-gray-500">Organic: <span className="text-black">{organic ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Condition: <span className="capitalize text-black">{quality_condition}</span></li>
                <li className="text-gray-500">Quality: <span className="text-black">Grade {quality_grade}</span></li>
                <li className="text-gray-500">Harvested date: <span className="text-black">{new Date(harvested_date).toLocaleDateString()}</span></li>
                <li className="text-gray-500">Delivery: <span className="capitalize text-black">{delivery_options === "both" ? 'Pickup and Deliver both' : delivery_options}</span></li>
                {delivery_fare_per_kg &&
                    <li className="text-gray-500">Delivery fare per kg: <span
                        className="capitalize text-black">Rs. {delivery_fare_per_kg.toFixed(2)}</span></li>
                }
                <li className="text-gray-500">Available Quantity: <span
                    className="text-black">{available_quantity} Kg</span></li>
                <li className="text-gray-500">Price per Kg: <span className="text-black">Rs. {price_per_kg.toFixed(2)}</span></li>
                <li className="text-gray-500">Created At: <span className="text-black">{new Date(createdAt).toDateString()}</span></li>
                <li className="text-gray-500">Updated At: <span className="text-black">{new Date(updatedAt).toDateString()}</span></li>
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
        service_radius,
        temperature_control,
        temperature_control_max,
        temperature_control_min,
        vehicle_type,
        createdAt,
        updatedAt,
    } = props;

    return (
        <div>
            <p className="text-lg font-medium mb-2">Transport Information</p>
            <ul className="list-disc mx-6">
                <li className="text-gray-500">Vehicle Type: <span className="capitalize text-black">{vehicle_type}</span></li>
                <li className="text-gray-500">Fuel Type: <span className="capitalize text-black">{fuel_type}</span></li>
                <li className="text-gray-500">Service Radius: <span className="text-black">{service_radius} km</span></li>
                <li className="text-gray-500">Max Volume: <span className="text-black">{max_volume} m³</span></li>
                <li className="text-gray-500">Max Weight: <span className="text-black">{max_weight} kg</span></li>
                <li className="text-gray-500">Price per Km: <span className="text-black">Rs. {price_per_km.toFixed(2)}</span></li>
                <li className="text-gray-500">Refrigerated: <span className="text-black">{refrigerated ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Temperature Control: <span className="text-black">{temperature_control ? "Yes" : "No"}</span></li>
                {temperature_control && (
                    <>
                        <li className="text-gray-500">Temperature Control Max: <span className="text-black">{temperature_control_max}°F</span></li>
                        <li className="text-gray-500">Temperature Control Min: <span className="text-black">{temperature_control_min}°F</span></li>
                    </>
                )}
                <li className="text-gray-500">Created At: <span className="text-black">{new Date(createdAt).toDateString()}</span></li>
                <li className="text-gray-500">Updated At: <span className="text-black">{new Date(updatedAt).toDateString()}</span></li>
            </ul>
        </div>
    );
}

const StorageInformation = (props) => {
    const {
        humidity_control_availability,
        max_capacity_per_unit,
        pest_control_availability,
        price_per_unit,
        storage_type,
        temperature_control,
        temperature_control_max,
        temperature_control_min,
        total_units,
        ventilation_availability,
        volume_per_unit,
        createdAt,
        updatedAt,
    } = props;

    return (
        <div>
            <p className="text-lg font-medium mb-2">Storage Information</p>
            <ul className="list-disc mx-6">
                <li className="text-gray-500">Storage Type: <span className="text-black">{storage_type === "cold_room" ? "Cold Room" : "Dry Room" }</span></li>
                <li className="text-gray-500">Max Capacity per Unit: <span className="text-black">{max_capacity_per_unit} kg</span></li>
                <li className="text-gray-500">Volume per Unit: <span className="text-black">{volume_per_unit} m³</span></li>
                <li className="text-gray-500">Total Units: <span className="text-black">{total_units}</span></li>
                <li className="text-gray-500">Price per Unit: <span className="text-black">Rs. {price_per_unit.toFixed(2)}</span></li>
                <li className="text-gray-500">Humidity Control: <span className="text-black">{humidity_control_availability ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Pest Control: <span className="text-black">{pest_control_availability ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Ventilation: <span className="text-black">{ventilation_availability ? "Yes" : "No"}</span></li>
                <li className="text-gray-500">Temperature Control: <span className="text-black">{temperature_control ? "Yes" : "No"}</span></li>
                {temperature_control && (
                    <>
                        <li className="text-gray-500">Temperature Control Max: <span className="text-black">{temperature_control_max}°F</span></li>
                        <li className="text-gray-500">Temperature Control Min: <span className="text-black">{temperature_control_min}°F</span></li>
                    </>
                )}
                <li className="text-gray-500">Created At: <span className="text-black">{new Date(createdAt).toDateString()}</span></li>
                <li className="text-gray-500">Updated At: <span className="text-black">{new Date(updatedAt).toDateString()}</span></li>
            </ul>
        </div>
    );
}


export default ListingInformation;