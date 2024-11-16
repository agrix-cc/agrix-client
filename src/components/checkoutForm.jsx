import {useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {toaster} from "./ui/toaster";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CheckoutForm = (props) => {
    const navigate = useNavigate();
    const {order, listing} = props;
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
                    placeOrder(res.paymentIntent.id);
                } else {
                    toaster.create({
                        title: "Unidentified status!",
                        type: 'error',
                    })
                }
            })

        setIsProcessing(false);
    }

    const placeOrder = async (id) => {
        let orderType = null;
        let processedOrder = null;

        if (listing.CropListing) {
            orderType = "crop";
            processedOrder = {
                stripeId: id,
                order: {
                    cropId: listing.CropListing.id,
                    amount: order.subTotal + order.deliveryFee,
                    qty: listing.qty,
                    deliveryMethod: order.deliveryOption || listing.CropListing.delivery_options,
                    address: order.address
                }
            };
        } else if (listing.TransportListing) {
            orderType = "transport"
            processedOrder = {
                stripeId: id,
                order: {
                    transportId: listing.TransportListing.id,
                    transportInfo: order
                }
            }
        }

        if (!orderType || !processedOrder) return;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/order/${orderType}`, processedOrder)
            .then(_ => {
                toaster.create({
                    title: "Order placed successfully!",
                    type: 'success',
                    duration: 2000,
                    onStatusChange({status}) {
                        if (status === 'unmounted') {
                            navigate('/');
                        }
                    },
                })
            })
            .catch((error) => {
                toaster.create({
                    title: error.response ? error.response.data.message : error.message,
                    type: 'error',
                });
            })
    }

    return (
        <form
            onSubmit={handleSubmit}>
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