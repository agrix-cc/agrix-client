import React from 'react';
import {useNavigate} from "react-router-dom";
import {StepperInput} from "../ui/stepper-input"


const FloatingIsland = (props) => {

    const navigate = useNavigate();

    const {value, setValue, max, price, unit, orderData} = props;
    return (
        <div className="fixed bottom-16 md:bottom-0 left-0 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2">
            <div className="bg-lime-green rounded-xl shadow-lg flex justify-between items-center p-4 m-4">
                <div>
                    <StepperInput
                        value={value}
                        onValueChange={setValue}
                        className="text-white mb-2"
                        variant="filled"
                        formatOptions={unit ? {
                            style: "unit",
                            unit: "kilogram",
                        } : {}}
                        min="1"
                        max={max}
                        defaultValue="0"/>
                    <p className="text-2xl font-medium text-white">Rs. {(price * value) || 0}</p>
                </div>
                <button
                    onClick={() => navigate('/checkout', {state: {...orderData, qty: value}})}
                    className="bg-white rounded-lg px-4 py-2 text-lime-green shadow-lg">
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default FloatingIsland;