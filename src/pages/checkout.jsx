import MobileNav from "../components/mobileNav";
import Payment from "../components/payment";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CropOrder from "../components/checkout/cropOrder";
import {jwtDecode} from "jwt-decode";

const Checkout = () => {

    const location = useLocation();
    const [listing, setListing] = useState();

    const [order, setOrder] = useState({
        name: "",
        address: "",
        delivery_option: ""
    });

    useEffect(() => {
        async function getUser() {
            const decoded = await jwtDecode(localStorage.getItem('jwtToken'));
            setOrder(prevState => ({
                ...prevState,
                name: decoded.user.first_name + " " + decoded.user.last_name,
                address: decoded.user.address || "",
            }));
            console.log(decoded.user)
        }
        getUser();
    }, [])

    useEffect(() => {
        setListing(location.state);
    }, [location.state]);

    return ((listing && order.name) &&
        <div>
            <MobileNav/>
            <div className="h-dvh w-full pt-20">
                <div className="flex-col sm:flex-row flex md:justify-center md:gap-8 p-4 w-full">
                    <CropOrder listing={listing} order={order} setOrder={setOrder}/>
                    <div className="lg:max-w-lg md:max-w-md w-full mb-20 sm:mb-0">
                        <h1 className="text-xl mb-4">Payment options</h1>
                        <Payment/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Checkout;