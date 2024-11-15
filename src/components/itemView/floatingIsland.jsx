import React from "react";
import {useNavigate} from "react-router-dom";


const FloatingIsland = (props) => {

    const {location, label, listingInfo} = props;

    const navigate = useNavigate();

    return (
        <div className="fixed bottom-16 md:bottom-0 left-0 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2">
            <div className="bg-lime-green rounded-xl shadow-lg flex justify-center items-center p-4 m-4">
                <button
                    onClick={() => navigate(location, {state: listingInfo})}
                    className="bg-white w-full rounded-lg px-4 py-2 text-lime-green shadow-lg active:shadow-md active:translate-y-0.5 duration-300 transition-all">
                    {label}
                </button>
            </div>
        </div>
    )
}

export default FloatingIsland;