import {useEffect, useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {toaster, Toaster} from "./ui/toaster";
import {useNavigate} from "react-router-dom";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [response, setResponse] = useState({
        message: null,
        status: null
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/market`,
            },
            redirect: "if_required"
        })

        if (error) {
            setResponse({
                message: error.message,
                status: 'error'
            })
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setResponse({
                message: "Payment successful",
                status: 'success'
            })
        } else {
            setResponse({
                message: "Unidentified status",
                status: 'error',
            })
        }

        setIsProcessing(false);
    }

    useEffect(() => {
        if (response.message) {
            toaster.create({
                title: response.message,
                type: response.status === 'error' ? 'error' : 'success',
                onStatusChange({ status }) {
                    if (response.status !== 'error' && status === 'unmounted') {
                        navigate('/');
                    }
                },
            })
        }
    }, [response, navigate])

    return (
        <form
            onSubmit={handleSubmit}>
            <Toaster/>
            <PaymentElement id="payment-element"/>
            <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-2 rounded bg-primary-green text-white font-medium mt-4 w-full disabled:opacity-25">
                Pay now
            </button>
        </form>
    )
}

export default CheckoutForm;