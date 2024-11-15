import {useEffect, useState} from "react";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import {toaster, Toaster} from "./ui/toaster";
import {useNavigate} from "react-router-dom";

const Payment = (props) => {
    const {order, user, listing} = props;
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    const navigate= useNavigate();

    useEffect(() => {
        const fetchStripeConfig = async () => {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/stripe/config`)
                .then(res => {
                    setStripePromise(loadStripe(res.data.publishableKey));
                })
                .catch(error => {
                    console.error(error.message);
                })
        };
        fetchStripeConfig();
    }, [])

    useEffect(() => {
        const fetchClientSecret = async () => {
            const createOrder = {
                total: order.subTotal + order.deliveryFee,
                name: user.name,
                description: `payment for Listing id: ${listing.id}, customer: ${user.first_name+' '+user.last_name}`,
            }
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/stripe/create-intent`, {...createOrder})
                .then(res => {
                    setClientSecret(res.data.client_secret);
                })
                .catch(err => {
                    if (err.response) {
                        toaster.create({
                            title: err.response.data.message,
                            type: 'error',
                            onStatusChange({status}) {
                                if (status === "unmounted") {
                                    navigate(-1);
                                }
                            },
                            duration: 2000,
                        })
                        return;
                    }
                    toaster.create({
                        title: err.message,
                        type: 'error',
                        onStatusChange({status}) {
                            if (status === "unmounted") {
                                navigate(-1);
                            }
                        },
                        duration: 2000,
                    })
                })
        };
        fetchClientSecret();
    }, [order, user, navigate, listing])

    return (
        <>
            <Toaster/>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm order={order} listing={listing}/>
                </Elements>
            )}
        </>
    )
};

export default Payment;