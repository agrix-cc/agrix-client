import {useEffect, useState} from "react";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const Payment = (props) => {
    const {data} = props;
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

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
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/stripe/create-intent`)
                .then(res => {
                    setClientSecret(res.data.client_secret);
                })
                .catch(err => {
                    console.error(err);
                })
        };
        fetchClientSecret();
    }, [])

    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    )
};

export default Payment;