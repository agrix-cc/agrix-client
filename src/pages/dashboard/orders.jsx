import {IoChevronBack} from "react-icons/io5";
import {useEffect, useState} from "react";
import axios from "axios";
import OrdersTable from "../../components/dashboard/ordersTable";

const Orders = (props) => {

    const {onBackClick} = props;
    const [orders, setOrders] = useState();

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/orders`)
            .then(res => {
                if (res.data.cropOrders) {
                    setOrders(res.data.cropOrders);
                } else if (res.data.transportOrders) {
                    setOrders(res.data.transportOrders)
                } else if (res.data.storageOrders) {
                    setOrders(res.data.storageOrders)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                } else {
                    console.log(err.message);
                }
            })
    }, []);

    return (
        <div className="p-4 w-full mb-20">
            <div className="flex items-center gap-4">
                <button onClick={onBackClick} className="md:hidden md:invisible">
                    <IoChevronBack className="text-2xl"/>
                </button>
                <p className="text-xl font-medium">Incoming Orders</p>
            </div>
            <div className="py-4">
                {orders &&
                    <OrdersTable orders={orders}/>
                }
            </div>
        </div>
    )
};

export default Orders;