import {Field} from "../ui/field";
import {Input} from "@chakra-ui/react";

const TransportOrder = (props) => {
    const {listing, data, setData} = props;


    return (
        <div className="mb-4">
            <h1 className="text-xl">Order Summary</h1>
            <div className="py-4">
                <p className="pb-2 text-gray-500">Order type: <span className="text-black">Transport Order</span></p>
                <div className="flex justify-start gap-4 items-center mb-2">
                    <div className="w-full h-32 overflow-hidden rounded-lg">
                        <img src={listing.image || '/assets/placeholder.webp'} alt=""
                             className="h-full w-full object-cover"/>
                    </div>
                    <div>
                        <p className="text-gray-500">Vehicle type: <span
                            className="text-black capitalize">{listing.TransportListing.vehicle_type}</span></p>
                        <p className="text-gray-500">Origin: <span
                            className="text-black">{listing.locations.start.address}</span></p>
                        <p className="text-gray-500">Destination: <span
                            className="text-black">{listing.locations.end.address}</span></p>

                    </div>
                </div>
                <div className="border-b border-gray-300 pb-2 mb-2">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Selected Date:</p>
                        <p className="text-black">{data.selectedDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Total distance:</p>
                        <p className="text-black">{(listing.distance / 1000).toFixed(2)} km</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Price per km:</p>
                        <p className="text-black">Rs. {listing.TransportListing.price_per_km.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-2xl">Total:</p>
                    <p className="text-black text-2xl">Rs. {listing.total.toFixed(2)}</p>
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
                        <Input
                            value={data.address}
                            onChange={(e) => setData({...data, address: e.target.value})}
                            placeholder="Enter your address"
                            className="px-2 outline-none border border-gray-200"/>
                    </Field>
                </div>
            </div>
        </div>
    )
};

export default TransportOrder;