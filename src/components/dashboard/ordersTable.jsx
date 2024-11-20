import {useMediaQuery} from "@mui/material";
import {Badge} from "@chakra-ui/react";
import OrderView from "./orderView";
import {useEffect, useState} from "react";

const OrderTable = (props) => {

    const isDesktop = useMediaQuery('(min-width: 768px)')

    const {orders, userType} = props;

    return (
        <div>
            {isDesktop &&
                <div className="grid grid-cols-6 text-gray-500 mb-4">
                    <p className="grid place-content-center">ID</p>
                    <p className="grid place-content-center">
                        {userType === "crop" &&
                            "Qty"
                        }
                        {userType === "transport" &&
                            "Distance"
                        }
                        {userType === "storage" &&
                            "Start Date"
                        }
                    </p>
                    <p className="grid place-content-center">
                        {userType !== "storage" &&
                            "Placed"
                        }
                        {userType === "storage" &&
                            "End Date"
                        }
                    </p>
                    <p className="grid place-content-center">Price</p>
                    <p className="grid place-content-center">Status</p>
                    <p className="grid place-content-center">Actions</p>
                </div>
            }
            {orders &&
                orders.map(order => <OrderRow order={order} key={order.id}/>)
            }
        </div>
    )
};

const OrderRow = (props) => {

    const {order} = props;

    const [badgeColor, setBadgeColor] = useState("");

    useEffect(() => {
        const status = order.status;

        switch (status) {
            case "pending":
                setBadgeColor("orange");
                return;
            case "accepted":
                setBadgeColor("blue");
                return;
            case "awaiting":
                setBadgeColor("blue");
                return;
            case "intransit":
                setBadgeColor("blue");
                return;
            case "delivered":
                setBadgeColor("green");
                return;
            case "instorage":
                setBadgeColor("blue");
                return;
            case "completed":
                setBadgeColor("green");
                return;
            case "overdue":
                setBadgeColor("red");
                return;
            case "abandoned":
                setBadgeColor("red");
                return;
            case "canceled":
                setBadgeColor("red");
                return;
            default:
                setBadgeColor("");
                return;
        }
    }, [order]);

    return (
        <div
            className="md:grid md:grid-cols-6 bg-white shadow-xl py-4 px-4 md:px-0 rounded-lg md:shadow-none mb-2 md:mb-0">
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Order ID: </span> {order.id}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">
                    {order.CropListing &&
                        "Qty"
                    }
                    {order.TransportListing &&
                        "Distance"
                    }
                    {order.StorageListing &&
                        "Start Date"
                    }
                    :
                </span>
                {order.CropListing &&
                    `${order.quantity} Kg`
                }
                {order.TransportListing &&
                    `${order.avg_distance / 1000} Km`
                }
                {order.StorageListing &&
                    new Date(order.start_date).toLocaleDateString()
                }
            </p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">
                    {order.CropListing &&
                        "Placed date"
                    }
                    {order.TransportListing &&
                        "Booked date"
                    }
                    {order.StorageListing &&
                        "End Date"
                    }:
                </span>
                {order.CropListing &&
                    new Date(order.createdAt).toLocaleDateString()
                }
                {order.TransportListing &&
                    new Date(order.booked_date).toLocaleDateString()
                }
                {order.StorageListing &&
                    new Date(order.end_date).toLocaleDateString()
                }
            </p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden"> Price: </span>
                Rs. {order.Payment.amount.toFixed(2)}
            </p>
            <p className="md:grid md:place-content-center flex justify-between capitalize">
                <span className="md:hidden">Status:</span>
                <Badge colorPalette={badgeColor}>
                    {
                        order.status
                    }
                </Badge>
            </p>
            <div className="grid place-content-center">
                <OrderView order={order}/>
            </div>
        </div>
    )
};

export default OrderTable;