import {useMediaQuery} from "@mui/material";
import {Badge} from "@chakra-ui/react";
import {useEffect, useState} from "react";

const PurchasesTable = (props) => {

    const isDesktop = useMediaQuery('(min-width: 768px)')

    const {orders, activeType} = props;

    return (orders &&
        <div>
            {isDesktop &&
                <div className="grid grid-cols-5 text-gray-500 mb-4">
                    <p className="grid place-content-center">ID</p>
                    <p className="grid place-content-center">
                        {activeType === "crops" &&
                            "Qty"
                        }
                        {activeType === "transport" &&
                            "Distance"
                        }
                        {activeType === "storage" &&
                            "Start Date"
                        }
                    </p>
                    <p className="grid place-content-center">
                        {activeType !== "storage" &&
                            "Placed"
                        }
                        {activeType === "storage" &&
                            "End Date"
                        }
                    </p>
                    <p className="grid place-content-center">Price</p>
                    <p className="grid place-content-center">Status</p>
                </div>
            }
            {orders &&
                orders.map((order, id) => <PurchasesRow order={order} key={id}/>)
            }
        </div>
    )
};

const PurchasesRow = (props) => {

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
            case "cancelled":
                setBadgeColor("red");
                return;
            default:
                setBadgeColor("");
                return;
        }
    }, [order]);

    return (
        <div
            className="md:grid md:grid-cols-5 bg-white shadow-xl py-4 px-4 md:px-0 rounded-lg md:shadow-none mb-2 md:mb-0">
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Order ID: </span> {order.id}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">
                    {order.CropListingId &&
                        "Qty"
                    }
                    {order.TransportListingId &&
                        "Distance"
                    }
                    {order.StorageListingId &&
                        "Start Date"
                    }
                    :
                </span>
                {order.CropListingId &&
                    `${order.quantity} Kg`
                }
                {order.TransportListingId &&
                    `${order.avg_distance / 1000} Km`
                }
                {order.StorageListingId &&
                    new Date(order.start_date).toLocaleDateString()
                }
            </p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">
                    {order.CropListingId &&
                        "Placed date"
                    }
                    {order.TransportListingId &&
                        "Booked date"
                    }
                    {order.StorageListingId &&
                        "End Date"
                    }:
                </span>
                {order.CropListingId &&
                    new Date(order.createdAt).toLocaleDateString()
                }
                {order.TransportListingId &&
                    new Date(order.booked_date).toLocaleDateString()
                }
                {order.StorageListingId &&
                    new Date(order.end_date).toLocaleDateString()
                }
            </p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden"> Price: </span>
                Rs. {order.Payment.amount.toFixed(2)}
            </p>
            <p className="md:grid md:place-content-center flex justify-between capitalize">
                <span className="md:hidden">Status:</span>
                <Badge
                    colorPalette={badgeColor}>
                    {
                        order.status
                    }
                </Badge>
            </p>
        </div>
    )
};

export default PurchasesTable;