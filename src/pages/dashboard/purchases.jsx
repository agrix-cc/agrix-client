import {IoChevronBack} from "react-icons/io5";
import {useEffect, useState} from "react";
import axios from "axios";
import PurchasesTable from "../../components/dashboard/purchasesTable";
import {SegmentedControl} from "../../components/ui/segmented-control";

const Purchases = (props) => {

    const {onBackClick} = props;
    const [orders, setOrders] = useState();
    const [activeType, setActiveType] = useState("crops");

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/payments`)
            .then(res => {
                setOrders(res.data)
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
                <p className="text-xl font-medium">My Purchases</p>
            </div>
            <div className="py-4">
                <SegmentedControl
                    items={[
                        {
                            value: "crops",
                            label: "Crops"
                        },
                        {
                            value: "transport",
                            label: "Transport"
                        },
                        {
                            value: "storage",
                            label: "Storage"
                        },
                    ]}
                    value={activeType}
                    onValueChange={(e) => setActiveType(e.value)}/>
            </div>
            <div className="py-4">
                {orders && activeType &&
                    <PurchasesTable orders={orders[activeType]} activeType={activeType}/>
                }
            </div>
        </div>
    )
};

export default Purchases;