import React from 'react';
import {Link} from "react-router-dom";
import {StepperInput} from "../ui/stepper-input"


const FloatingIsland = () => {
    return (
        <div className="fixed bottom-16 md:bottom-0 left-0 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2">
            <div className="bg-lime-green rounded-xl shadow-lg flex justify-between items-center p-4 m-4">
                <div>
                    <StepperInput
                        className="text-white mb-2"
                        variant="filled"
                        formatOptions={{
                            style: "unit",
                            unit: "kilogram",
                        }}
                        min="1"
                        max="25"
                        defaultValue="3"/>
                    <p className="text-2xl font-medium text-white">Rs. 25000.00</p>
                </div>
                <Link to="/purchase" className="bg-white rounded-lg px-4 py-2 text-lime-green shadow-lg">
                    Buy now
                </Link>
            </div>
        </div>
    );
};

export default FloatingIsland;