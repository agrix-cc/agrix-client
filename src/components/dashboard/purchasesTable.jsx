import {useMediaQuery} from "@mui/material";

const PurchasesTable = (props) => {

    const isDesktop = useMediaQuery('(min-width: 768px)')

    const {orders, activeType} = props;

    return (orders &&
        <div>
            {isDesktop &&
                <div className="grid grid-cols-6 text-gray-500 mb-4">
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
                    <p className="grid place-content-center">Actions</p>
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

    return (
        <div
            className="md:grid md:grid-cols-6 bg-white shadow-xl py-4 px-4 md:px-0 rounded-lg md:shadow-none mb-2 md:mb-0">
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
                {
                    order.status
                }
            </p>
            <div className="grid place-content-center">
                <button className="text-primary-green border border-primary-green px-4 rounded-full">
                    View
                </button>
            </div>
        </div>
    )
};

export default PurchasesTable;