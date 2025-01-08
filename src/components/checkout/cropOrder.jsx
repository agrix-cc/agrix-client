import {Field} from "../ui/field";
import {HStack, Input} from "@chakra-ui/react";
import {Radio, RadioGroup} from "../ui/radio";
import React, {useEffect, useState} from "react";
import {IoClose} from "react-icons/io5";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {PlaceAutocomplete} from "../../pages/dashboard/addNew";
import {useMapsLibrary} from "@vis.gl/react-google-maps";

const CropOrder = (props) => {
    const {listing, data, setData} = props;
    const routesLibrary = useMapsLibrary("routes");

    const [total, setTotal] = useState(0);
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [isOpenedTransportServices, setIsOpenedTransportServices] = useState(false);
    const [location, setLocation] = useState(null);
    const [distance, setDistance] = useState(0);
    const [directionService, setDirectionService] = useState();
    const [transportRented, setTransportRented] = useState(null);

    const handleDeliveryChange = (e) => {
        setDeliveryMethod(e.target.value);
        let deliveryFee = listing.qty * listing.CropListing.delivery_fare_per_kg;
        if (e.target.value === "pickup") {
            setTotal(data.subTotal);
            deliveryFee = 0;
        } else {
            setTotal(data.subTotal + deliveryFee);
        }
        setData(prevState => ({...prevState, deliveryOption: e.target.value, deliveryFee: deliveryFee}));
    };

    useEffect(() => {
        setDeliveryMethod(data.deliveryOption);
        setTotal(data.subTotal + data.deliveryFee);
    }, [data])

    useEffect(() => {
        if (!routesLibrary) return;
        setDirectionService(new routesLibrary.DirectionsService());
    }, [routesLibrary])

    useEffect(() => {
        if (!directionService || !location || !listing) return;
        setData({...data, address: location.name});
        directionService.route({
            origin: {
                lat: listing.lat,
                lng: listing.lng,
            },
            destination: {
                lat: location.lat,
                lng: location.lng,
            },
            travelMode: window.google.maps.TravelMode.DRIVING,
        }).then((res) => {
            if (res.status === 'OK') {
                setDistance(res.routes[0].legs[0].distance.value);
            } else {
                console.error('Directions request failed due to', res.status);
            }
        }).catch(error => {
            console.error('Error fetching directions', error);
        });
    }, [directionService, location, listing, data, setData]);

    return (
        <div className="mb-4">
            <h1 className="text-xl">Order Summary</h1>
            <div className="py-4">
                <p className="pb-2 text-gray-500">Order type: <span className="text-black">Crop Order</span></p>
                <div className="flex justify-start gap-4 items-center mb-2">
                    <div className="w-32 h-32 overflow-hidden rounded-lg">
                        <img src={listing.image || '/assets/placeholder.webp'} alt=""
                             className="h-full w-full object-cover"/>
                    </div>
                    <div>
                        <p className="text-gray-500">Name: <span
                            className="text-black">{listing.CropListing.crop_name}</span></p>
                        <p className="text-gray-500">Type: <span
                            className="text-black">{listing.CropListing.crop_type}</span></p>
                        <p className="text-gray-500">Location: <span
                            className="text-black">{listing.city}, {listing.district}</span>
                        </p>
                    </div>
                </div>
                <div className="border-b border-gray-300 pb-2 mb-2">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Price per kg:</p>
                        <p className="text-black">Rs. {listing.CropListing.price_per_kg.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Quantity:</p>
                        <p className="text-black">{listing.qty} kg</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Delivery fee:</p>
                        <p className="text-black">Rs. {data.deliveryFee.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-2xl">Total:</p>
                    <p className="text-black text-2xl">Rs. {total.toFixed(2)}</p>
                </div>
            </div>
            <div className="mb-4 mt-4 md:mt-0">
                <h1 className="text-xl">Shipping and billing information</h1>
                <div className="py-2 mb-4">
                    <Field label="Name" required className="mb-2">
                        <Input
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                            placeholder="Enter your name"
                            className="px-2 outline-none border border-gray-200"/>
                    </Field>
                    <Field label="Address" required className="mb-2">
                        <PlaceAutocomplete onPlaceSelect={setLocation}/>
                    </Field>
                    <Field
                        helperText="Note: Additional charges apply for delivery."
                        label="Delivery option"
                        required>
                        <RadioGroup
                            onChange={handleDeliveryChange}
                            defaultValue={data.deliveryOption}>
                            <HStack gap="8">
                                <Radio
                                    disabled={listing.CropListing.delivery_options !== "both"}
                                    value="deliver">Deliver</Radio>
                                <Radio
                                    disabled={listing.CropListing.delivery_options !== "both"}
                                    value="pickup">Pickup</Radio>
                            </HStack>
                        </RadioGroup>
                        {deliveryMethod === "pickup" && location &&
                            <button
                                onClick={() => setIsOpenedTransportServices(true)}
                                className="px-4 py-2 bg-mint-green rounded shadow-xl my-2">Click here to find a
                                delivery service</button>
                        }
                        {isOpenedTransportServices &&
                            <TransportMenu
                                closePopup={() => setIsOpenedTransportServices(false)}
                                setData={setData}
                                data={data}
                                setTransportRented={setTransportRented}
                                handleClose={() => setIsOpenedTransportServices(false)} distance={distance}
                                location={location}/>
                        }
                    </Field>
                    {transportRented &&
                        <div className="py-4 flex flex-wrap justify-between">
                            <div className="flex gap-2">
                                <img src={transportRented.imageUrl} alt="transport"
                                     className="w-32 aspect-square object-cover rounded shadow-md"/>
                                <div>
                                    <p>Vehicle type: <span
                                        className="capitalize text-gray-500">{transportRented.listing.TransportListing.vehicle_type}</span>
                                    </p>
                                    <p>Price per km: <span
                                        className="capitalize text-gray-500">Rs. {transportRented.listing.TransportListing.price_per_km.toFixed(2)}</span>
                                    </p>
                                    <p>Max weight: <span
                                        className="capitalize text-gray-500">{transportRented.listing.TransportListing.max_weight} Kg</span>
                                    </p>
                                    <p>Refrigerated: <span
                                        className="capitalize text-gray-500">{transportRented.listing.TransportListing.refrigerated ? 'Yes' : 'No'}</span>
                                    </p>
                                    <p>Location: <span
                                        className="capitalize text-gray-500">{transportRented.listing.TransportListing.address}</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setTransportRented(null);
                                    setData({...data, deliveryFee: 0});
                                }}
                                className="text-white bg-red-400 h-fit px-4 py-2 rounded">
                                Remove
                            </button>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
};

const TransportMenu = (props) => {
    const {handleClose, distance, location, setTransportRented, setData, data, closePopup} = props;
    const [transportServices, setTransportServices] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/transport`)
            .then(res => setTransportServices(res.data.listings))
            .catch(error => console.log(error))
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen backdrop-blur bg-black bg-opacity-35 flex items-center justify-center">
            <div className="bg-white p-4 rounded w-full md:max-w-md h-full max-h-[calc(100vh-128px)]">
                <div className="flex justify-between items-center gap-8">
                    <p>Select a transport service</p>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full bg-mint-green shadow-md">
                        <IoClose/>
                    </button>
                </div>
                <div>
                    {transportServices && transportServices.map((listing, id) => (
                        <TransportItem
                            setData={setData}
                            data={data}
                            setTransportRented={setTransportRented}
                            key={id} listing={listing} distance={distance} location={location}
                            closePopup={closePopup}/>
                    ))}
                </div>
            </div>

        </div>
    )
}

const TransportItem = (props) => {
    const {
        listing, distance, location, setTransportRented, setData, data, closePopup
    } = props
    return (
        <div className="my-2 border-b border-b-zinc-200 pb-4">
            <div className="flex gap-2">
                <img src={listing.imageUrl} alt="transport"
                     className="w-32 aspect-square object-cover rounded shadow-md"/>
                <div>
                    <p>Vehicle type: <span
                        className="capitalize text-gray-500">{listing.listing.TransportListing.vehicle_type}</span></p>
                    <p>Price per km: <span
                        className="capitalize text-gray-500">Rs. {listing.listing.TransportListing.price_per_km.toFixed(2)}</span>
                    </p>
                    <p>Max weight: <span
                        className="capitalize text-gray-500">{listing.listing.TransportListing.max_weight} Kg</span></p>
                    <p>Refrigerated: <span
                        className="capitalize text-gray-500">{listing.listing.TransportListing.refrigerated ? 'Yes' : 'No'}</span>
                    </p>
                    <p>Location: <span
                        className="capitalize text-gray-500">{listing.listing.TransportListing.address}</span></p>
                </div>
            </div>
            <div className="py-2">
                <p>Total: <span
                    className="text-gray-500">Rs. {((distance / 1000) * listing.listing.TransportListing.price_per_km).toFixed(2)}</span>
                </p>
            </div>
            <div className="flex gap-2 py-2">
                <NavLink to={`/product/${listing.listing.id}`}
                         className="px-4 py-2 bg-mint-green h-full w-full block rounded">View</NavLink>
                <button
                    onClick={() => {
                        setData({
                            ...data,
                            deliveryFee: (distance / 1000) * listing.listing.TransportListing.price_per_km,
                            deliveryTransport: listing.listing.TransportListing,
                            distance: distance,
                            location: location,
                        })
                        setTransportRented(listing);
                        closePopup();
                    }}
                    className="px-4 py-2 border border-sage-green h-full w-full block rounded">
                    Rent
                </button>
            </div>
        </div>
    )
}

export default CropOrder;