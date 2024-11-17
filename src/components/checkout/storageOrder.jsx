import {Field} from "../ui/field";
import {Input} from "@chakra-ui/react";

const StorageOrder = (props) => {
    const {listing, data, setData} = props;


    return (
        <div className="mb-4">
            <h1 className="text-xl">Order Summary</h1>
            <div className="py-4">
                <p className="pb-2 text-gray-500">Order type: <span className="text-black">Storage Order</span></p>
                <div className="flex justify-start gap-4 items-center mb-2">
                    <div className="w-44 h-32 overflow-hidden rounded-lg">
                        <img src={listing.image || '/assets/placeholder.webp'} alt=""
                             className="h-full w-full object-cover"/>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-500">Storage type: <span
                            className="text-black capitalize">{listing.StorageListing.storage_type.replace('_', ' ')}</span></p>
                        <p className="text-gray-500">Location: <span
                            className="text-black capitalize">{listing.city}, {listing.district}</span></p>

                    </div>
                </div>
                <div className="border-b border-gray-300 pb-2 mb-2">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Start date:</p>
                        <p className="text-black">{data.startDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">End date:</p>
                        <p className="text-black">{data.endDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Rental duration:</p>
                        <p className="text-black">{data.duration} Days</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500">Rental per day:</p>
                        <p className="text-black">Rs. {listing.StorageListing.daily_rate.toFixed(2)}</p>
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

export default StorageOrder;