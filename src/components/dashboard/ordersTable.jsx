import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {IoIosEye} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";

const OrderTable = (props) => {

    const isDesktop = useMediaQuery('(min-width: 768px)')

    const {orders} = props;

    return (
        <div>
            {isDesktop &&
                <div className="grid grid-cols-5 text-gray-500 mb-4">
                    <p className="grid place-content-center">ID</p>
                    <p className="grid place-content-center">Title</p>
                    <p className="grid place-content-center">Description</p>
                    <p className="grid place-content-center">Created</p>
                    <p className="grid place-content-center">Actions</p>
                </div>
            }
            {orders &&
                orders.map(order => <OrderRow order={order}/>)
            }
        </div>
    )
};

const OrderRow = (props) => {

    const {order} = props;

    return (
        <div className="md:grid md:grid-cols-5 bg-white shadow-xl py-4 px-4 md:px-0 rounded-lg md:shadow-none ">
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">ID: </span> {order.id}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Title: </span> {}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Description: </span> {}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Date: </span> {new Date().toLocaleDateString()}</p>
            <p className="grid place-content-center"><ActionButtons id={order.id}/></p>
        </div>
    )
};

const ActionButtons = (props) => {

    const {id} = props;

    const navigate = useNavigate();

    return (
        <div className="flex gap-2 items-center md:text-xl text-3xl">
            <button
                onClick={() => {}}>
                <IoIosEye/>
            </button>
            <button>
                <MdModeEdit/>
            </button>
            <button className="text-red-500">
                <MdDeleteForever/>
            </button>
        </div>
    )
};

export default OrderTable;