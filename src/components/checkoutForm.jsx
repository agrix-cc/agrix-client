import {useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {toaster, Toaster} from "./ui/toaster";
import {useNavigate} from "react-router-dom";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/market`,
            },
            redirect: "if_required"
        })
            .then(res => {
                if (res.error) {
                    toaster.create({
                        title: res.error.message,
                        type: 'error',
                    })
                } else if (res.paymentIntent && res.paymentIntent.status === "succeeded") {
                    toaster.create({
                        title: "Payment successful",
                        type: 'success',
                        onStatusChange({status}) {
                            if (status === 'unmounted') {
                                navigate('/');
                            }
                        },
                    })
                } else {
                    toaster.create({
                        title: "Unidentified status!",
                        type: 'error',
                    })
                }
            })

        setIsProcessing(false);
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <Toaster/>
            <PaymentElement id="payment-element"/>
            <button
                type="submit"
                disabled={isProcessing && !stripe && !elements}
                className="px-4 py-2 rounded bg-primary-green text-white font-medium mt-4 w-full disabled:opacity-25">
                Pay now
            </button>
        </form>
    )
}

export default CheckoutForm;