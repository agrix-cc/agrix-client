import MobileNav from "../components/mobileNav";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Calendar from "react-calendar";
import SelectInput from "../components/dashboard/addListing/components/selectInput";

const RentStorage = () => {

    const location = useLocation();
    const [listing, setListing] = useState(null);
    const [order, setOrder] = useState(null);
    const [bookedInfo, setBookedInfo] = useState(null);

    useEffect(() => {
        const data = location.state;
        setListing({...data.listing, image: data.images[0]});
    }, [location])

    useEffect(() => {
        console.log(listing);
    }, [listing])

    useEffect(() => {
        if (!listing) return;
        if (listing.StorageListing.pricing_plan !== "both") {
            setOrder({...order, pricing_plan: listing.StorageListing.pricing_plan})
        } else {
            setOrder({...order, pricing_plan: ""})
        }
    }, [listing])

    useEffect(() => {
        console.log(order)
    }, [order]);

    return (listing && order &&
        <div>
            <MobileNav/>
            <div className="px-4 py-20">
                <p className="text-2xl">Rent storage</p>
                <div className="flex justify-start gap-4 py-4">
                    <img
                        className="w-24 h-24 rounded-lg shadow-lg"
                        src={listing.image || '/assets/placeholder.webp'} alt=""/>
                    <div>
                        <p className="capitalize mb-1">{listing.StorageListing.storage_type.replace('_', ' ')}</p>
                        <p className="mb-1">{listing.city}, {listing.district}</p>
                        {order.pricing_plan &&
                            <p>Pricing plan: <span className="capitalize text-gray-500">{order.pricing_plan}</span></p>
                        }
                    </div>
                </div>
                <div className="mb-2">
                    {listing.StorageListing.pricing_plan === "both" &&
                        <SelectInput
                            items={[
                                {label: "Daily rental", value: "daily"},
                                {label: "Monthly rental", value: "monthly"}
                            ]}
                            placeholder="Select the pricing plan for rental"
                            label="Price plan"
                            error={false}
                            required={false}
                            defaultValue="monthly"
                            onChange={(value) => {
                                setOrder({...order, ["pricing_plan"]: value})
                            }}
                        />
                    }
                </div>
                <div>
                    <p className="py-2">Select the rental month or duration</p>
                    <Calendar
                        onChange={(value, event) => {
                            console.log(value);
                        }}
                        showNeighboringMonth={true}
                        returnValue="range"
                        selectRange={order.pricing_plan === "daily"}
                        minDate={new Date()}
                        maxDate={new Date(`${new Date().getFullYear() + 1}/12/31`)}
                        // tileClassName={disableDatesClass}
                        // tileDisabled={disableDatesInput}
                        minDetail="year"
                        defaultView="year"
                    />
                </div>
            </div>
        </div>
    )
};

export default RentStorage;