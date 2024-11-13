import {Field} from "../ui/field";
import {HStack, Input} from "@chakra-ui/react";
import {Radio, RadioGroup} from "../ui/radio";
import {useEffect, useState} from "react";

const CropOrder = (props) => {
    const {listing, order, setOrder} = props;

    const [controlledInputs, setControlledInputs] = useState(order);

    useEffect(() => {
        console.log(listing);
    }, [listing])

    useEffect(() => {
        setOrder({...controlledInputs});
        console.log("Hello")
    }, [controlledInputs, setOrder]);

    return (
        <div className="mb-4">
            <h1 className="text-xl">Order Summary</h1>
            <div className="py-4">
                <p className="pb-2 text-gray-500">Order type: <span className="text-black">Crop Order</span></p>
                <div className="flex justify-start gap-4 items-center mb-2">
                    <div className="w-32 h-32 overflow-hidden rounded-lg">
                        <img src="/assets/tomatoes.webp" alt="" className="h-full w-full object-cover"/>
                    </div>
                    <div>
                        <p className="text-gray-500">Name: <span className="text-black">{listing.CropListing.crop_name}</span></p>
                        <p className="text-gray-500">Type: <span className="text-black">{listing.CropListing.crop_type}</span></p>
                        <p className="text-gray-500">Location: <span className="text-black">{listing.city}, {listing.district}</span>
                        </p>
                    </div>
                </div>
                <div className="border-b border-gray-300 pb-2 mb-2">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Price per kg:</p>
                        <p className="text-black">Rs. {listing.CropListing.price_per_kg}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Quantity:</p>
                        <p className="text-black">{listing.qty} kg</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-2xl">Total:</p>
                    <p className="text-black text-2xl">Rs. {listing.qty * listing.CropListing.price_per_kg}</p>
                </div>
            </div>
            <div className="mb-4">
                <h1 className="text-xl">Shipping and billing information</h1>
                <div className="py-2 mb-4">
                    <Field label="Name" required className="mb-2">
                        <Input
                            value={controlledInputs.name}
                            onChange={(e) => setControlledInputs({...controlledInputs, name: e.value})}
                            placeHolder="Enter your name"
                            className="px-2 outline-none border border-gray-200"/>
                    </Field>
                    <Field label="Address" required className="mb-2">
                        <Input
                            onChange={(e) => setControlledInputs({...controlledInputs, address: e.value})}
                            placeHolder="Enter your address"
                            className="px-2 outline-none border border-gray-200"/>
                    </Field>
                    <Field label="Delivery option" required>
                        <RadioGroup
                            onChange={(e) => setControlledInputs({...controlledInputs, delivery_option: e.value})}
                            defaultValue="deliver">
                            <HStack gap="8">
                                <Radio value="deliver">Deliver</Radio>
                                <Radio value="pickup">Pickup</Radio>
                            </HStack>
                        </RadioGroup>
                    </Field>
                </div>
            </div>
        </div>
    )
};

export default CropOrder;