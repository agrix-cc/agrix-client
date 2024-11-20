import {
    DialogActionTrigger,
    DialogBody, DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import SelectInput from "./addListing/components/selectInput";
import {useEffect, useState} from "react";
import axios from "axios";
import {toaster} from "../ui/toaster";

const OrderView = (props) => {

    const {order} = props;

    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!status) return;

        const type = order.TransportListing ? "transport" : (order.StorageListing ? "storage" : "crop");

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

        axios.put(`${process.env.REACT_APP_SERVER_URL}/orders/edit`, {status: status, type: type, id: order.id})
            .then(res => {
                toaster.create({
                    title: "Order status changed successfully!",
                    type: "success",
                })
            })
            .catch(err => {
                let message = err.response ? err.response.data.message : err.message;
                toaster.create({
                    title: message,
                    type: "error",
                })
            })

    }, [status, order]);

    return (order &&
        <DialogRoot
            placement="center">
            <DialogTrigger asChild>
                <button className="text-primary-green border border-primary-green px-4 rounded-full">
                    View
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">View order</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <table className="w-full">
                        <tbody>
                        <tr className="border-b border-zinc-200">
                            <td className="py-2">Order ID</td>
                            <td className="py-2">{order.id}</td>
                        </tr>
                        <tr className="border-b border-zinc-200">
                            <td className="py-2">Date</td>
                            <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                        <tr className="border-b border-zinc-200">
                            <td className="py-2">Customer ID</td>
                            <td className="py-2">{order.customer_id}</td>
                        </tr>
                        {order.TransportListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Listing ID</td>
                                <td className="capitalize py-2">{order.TransportListing.id}</td>
                            </tr>
                        }
                        {order.StorageListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Listing ID</td>
                                <td className="capitalize py-2">{order.StorageListing.id}</td>
                            </tr>
                        }
                        {order.StorageListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Storage Type</td>
                                <td className="capitalize py-2">{order.StorageListing.storage_type}</td>
                            </tr>
                        }
                        {order.CropListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Address</td>
                                <td className="py-2">{order.placed_address}</td>
                            </tr>
                        }
                        {order.CropListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Delivery method</td>
                                <td className="capitalize py-2">{order.delivery_method}</td>
                            </tr>
                        }
                        {order.CropListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Crop name</td>
                                <td className="capitalize py-2">{order.CropListing.crop_name}</td>
                            </tr>
                        }
                        {order.CropListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Quantity</td>
                                <td className="capitalize py-2">{order.quantity} Kg</td>
                            </tr>
                        }
                        {order.TransportListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Booked Date</td>
                                <td className="capitalize py-2">{new Date(order.booked_date).toLocaleDateString()}</td>
                            </tr>
                        }
                        {order.TransportListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Origin</td>
                                <td className="capitalize py-2">{order.origin_address}</td>
                            </tr>
                        }
                        {order.TransportListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Destination</td>
                                <td className="capitalize py-2">{order.destination_address}</td>
                            </tr>
                        }
                        {order.TransportListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Distance</td>
                                <td className="capitalize py-2">{order.avg_distance / 1000}Km</td>
                            </tr>
                        }
                        {order.TransportListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Vehicle type</td>
                                <td className="capitalize py-2">{order.TransportListing.vehicle_type}</td>
                            </tr>
                        }
                        {order.StorageListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Rental Start</td>
                                <td className="capitalize py-2">{new Date(order.start_date).toLocaleDateString()}</td>
                            </tr>
                        }
                        {order.StorageListing &&
                            <tr className="border-b border-zinc-200">
                                <td className="py-2">Rental End</td>
                                <td className="capitalize py-2">{new Date(order.end_date).toLocaleDateString()}</td>
                            </tr>
                        }
                        <tr className="border-b border-zinc-200">
                            <td className="py-2">Payment</td>
                            <td className="capitalize py-2">Rs. {order.Payment.amount.toFixed(2)} ({order.Payment.status})</td>
                        </tr>
                        <tr className="border-b border-zinc-200">
                            <td className="py-2">Change status</td>
                            <td className="py-2">
                                <SelectInput
                                    className="z-[1500] text-sm"
                                    items={
                                        (order.CropListing && [
                                            {label: "Pending", value: "pending"},
                                            {label: "Processing", value: "processing"},
                                            {label: "Cancelled", value: "canceled"},
                                            {label: "Delivered", value: "delivered"},
                                        ]) || (order.TransportListing && [
                                            {label: "Pending", value: "pending"},
                                            {label: "Accepted", value: "accepted"},
                                            {label: "Awaiting", value: "awaiting"},
                                            {label: "In transit", value: "intransit"},
                                            {label: "Delivered", value: "delivered"},
                                            {label: "Cancelled", value: "canceled"},
                                        ]) || (order.StorageListing && [
                                            {label: "Pending", value: "pending"},
                                            {label: "Accepted", value: "accepted"},
                                            {label: "Awaiting", value: "awaiting"},
                                            {label: "In Storage", value: "instorage"},
                                            {label: "Completed", value: "completed"},
                                            {label: "Overdue", value: "overdue"},
                                            {label: "Abandoned", value: "abandoned"},
                                            {label: "Cancelled", value: "canceled"},
                                        ])
                                    }
                                    onChange={(value) => {
                                        setStatus(value)
                                    }}
                                    value={status}
                                    disabled={order.status === "canceled" || order.status === "delivered" || order.status === "completed" || order.status === "abandoned"}
                                    placeholder="Update status"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <button>Close</button>
                    </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger/>
            </DialogContent>
        </DialogRoot>

    )
}
export default OrderView;