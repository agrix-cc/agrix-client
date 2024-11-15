import MobileNav from "../components/mobileNav";
import Payment from "../components/payment";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CropOrder from "../components/checkout/cropOrder";
import {jwtDecode} from "jwt-decode";
import {Toaster, toaster} from "../components/ui/toaster";

const Checkout = () => {

    const location = useLocation();
    const [listing, setListing] = useState(null);
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);

    const handleClick = () => {
        if (!data) {
            toaster.create({
                type: 'error',
                title: 'Order is not initialized!',
                duration: 2000
            });
            setIsProcessing(true);
            return
        }
        if (data && data.name === "") {
            toaster.create({
                type: 'error',
                title: 'Please provide your name!',
                duration: 2000
            });
            setIsProcessing(true);
            return
        }
        if (data && data.address === "") {
            toaster.create({
                type: 'error',
                title: 'Please provide your address!',
                duration: 2000
            });
            setIsProcessing(true);
            return;
        }
        setIsProcessing(false);
    }

    useEffect(() => {
        async function getUser() {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decoded = await jwtDecode(token);
                setUser(decoded.user);
            }
        }

        getUser();
    }, []);

    useEffect(() => {
        setListing(location.state);
    }, [location.state]);

    useEffect(() => {
        if (user && listing && listing.CropListing) {
            const deliveryOption = listing.CropListing.delivery_options === "both" ? 'deliver' : listing.CropListing.delivery_options
            setData({
                name: user.first_name + ' ' + user.last_name,
                address: user.address || "",
                subTotal: listing.qty * listing.CropListing.price_per_kg,
                deliveryFee: (listing.CropListing.delivery_fare_per_kg * listing.qty) || 0,
                deliveryOption: deliveryOption,
            });
        }
    }, [user, listing]);

    return (listing && user && data &&
        <div>
            <Toaster/>
            <MobileNav/>
            <div className="h-dvh w-full">
                <div className="flex justify-center items-center p-4 w-full h-full">
                    <div className="w-full sm:max-w-sm md:max-w-lg">
                        {isProcessing ?
                            <>
                                <CropOrder listing={listing} data={data} setData={setData}/>
                                <button
                                    onClick={handleClick}
                                    type="submit"
                                    disabled={!listing || !data || !user}
                                    className="px-4 py-2 rounded bg-primary-green text-white font-medium mt-4 w-full disabled:opacity-25 shadow-xl active:shadow-md active:translate-y-0.5 transition-all duration-300">
                                    Proceed to checkout
                                </button>
                            </> :
                            <>
                                <h1 className="text-xl mb-8">Payment options</h1>
                                <Payment data={{data, user}}/>
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Checkout;