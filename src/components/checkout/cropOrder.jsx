import {Field} from "../ui/field";
import {HStack, Input} from "@chakra-ui/react";
import {Radio, RadioGroup} from "../ui/radio";
import formatNumber from "../numberFormater";
import {useEffect, useState} from "react";

const CropOrder = (props) => {
    const {listing, data, setData} = props;

    const [total, setTotal] = useState(0);

    const handleDeliveryChange = (e) => {
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
        setTotal(data.subTotal + data.deliveryFee);
    }, [data])

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
                        <p className="text-black">Rs. {formatNumber(listing.CropListing.price_per_kg)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Quantity:</p>
                        <p className="text-black">{listing.qty} kg</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Delivery fee:</p>
                        <p className="text-black">Rs. {formatNumber(data.deliveryFee)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-2xl">Total:</p>
                    <p className="text-black text-2xl">Rs. {formatNumber(total)}</p>
                </div>
            </div>
            <div className="mb-4 mt-4 md:mt-0">
                <h1 className="text-xl">Shipping and billing information</h1>
                <div className="py-2 mb-4">
                    <Field label="Name" required className="mb-2">
                        {/*TODO ---------------------------------------------------------------------------------------------*/}
                        <Input
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                            placeholder="Enter your name"
                            className="px-2 outline-none border border-gray-200"/>
                    </Field>
                    <Field label="Address" required className="mb-2">
                        {/*TODO ---------------------------------------------------------------------------------------------*/}
                        <Input
                            value={data.address}
                            onChange={(e) => setData({...data, address: e.target.value})}
                            placeholder="Enter your address"
                            className="px-2 outline-none border border-gray-200"/>
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
                    </Field>
                </div>
            </div>
        </div>
    )
};

export default CropOrder;