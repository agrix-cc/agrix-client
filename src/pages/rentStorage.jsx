import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Calendar from "react-calendar";
import {toaster} from "../components/ui/toaster";

const RentStorage = (props) => {

    const {listingInfo} = props;

    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState(null);
    const [total, setTotal] = useState(0);

    const handleDateChange = (value, event) => {
        setDateRange(value);
    }

    const isValidDateRange = () => {
        if (!dateRange) return false;

        const orders = listingInfo.listing.StorageListing.StorageOrders;
        const unavailable = orders.some(order => {
            const startDate = new Date(order.start_date);
            const endDate = new Date(order.end_date);
            return (dateRange[0] <= endDate && dateRange[1] >= startDate);
        });

        const min = listingInfo.listing.StorageListing.minimum_days;
        const max = listingInfo.listing.StorageListing.maximum_days;
        const dateDifference = Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 3600 * 24));
        return {
            availableError: unavailable,
            dateRangeError: (dateDifference > max || dateDifference < min)
        };
    }

    useEffect(() => {
        if (!dateRange) return;
        const dailyRental = listingInfo.listing.StorageListing.daily_rate;
        const dateDifference = Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 3600 * 24));
        setTotal(dateDifference * dailyRental);
    }, [dateRange, listingInfo])

    const handleRedirect = () => {
        const {availableError, dateRangeError} = isValidDateRange();
        if (!dateRange) {
            toaster.create({
                title: "Invalid date range",
                description: "Please select a valid date range",
                type: 'error',
                duration: 1000
            });
            return;
        }

        if (dateRangeError) {
            toaster.create({
                title: "Invalid date range",
                description: `Please select a date range between minimum of ${listingInfo.listing.StorageListing.minimum_days} to ${listingInfo.listing.StorageListing.maximum_days} days`,
                type: 'error',
                duration: 1000
            })
            return;
        }
        if (availableError) {
            toaster.create({
                title: "Selected dates are unavailable",
                description: "Please select a date range not overlapping with unavailable dates",
                type: 'error',
                duration: 2000
            })
            return;
        }
        navigate('/checkout', {
            state: {
                ...listingInfo.listing,
                image: listingInfo.images[0],
                total: total,
                duration: Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 3600 * 24)),
                startDate: dateRange[0],
                endDate: dateRange[1]
            }
        })
    }

    const disableDatesClass = ({date, view}) => {
        const orders = listingInfo.listing.StorageListing.StorageOrders;
        if (!orders) return null;
        return orders.some(order => {
            const startDate = new Date(order.start_date);
            const endDate = new Date(order.end_date);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            return view === "month" && date >= startDate && date <= endDate;
        }) ? 'unavailable-date' : null;
    }

    const disableDatesInput = ({date, view}) => {
        const orders = listingInfo.listing.StorageListing.StorageOrders;
        if (!orders) return null;
        return orders.some(order => {
            const startDate = new Date(order.start_date);
            const endDate = new Date(order.end_date);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            return view === "month" && date >= startDate && date <= endDate;
        });
    }

    return (listingInfo.listing &&
        <div className="px-4 mt-4 md:mb-4">
            <div>
                <p className="mb-1 text-lg font-medium">Select the rental duration</p>
                <p className="text-gray-500 mb-1">Maximum duration can select: <span
                    className="text-black">{listingInfo.listing.StorageListing.maximum_days} Days</span></p>
                <p className="text-gray-500 leading-6 mb-4">Minimum duration can select: <span
                    className="text-black">{listingInfo.listing.StorageListing.minimum_days} Days</span></p>
                <Calendar
                    value={dateRange}
                    onChange={handleDateChange}
                    showNeighboringMonth={true}
                    returnValue="range"
                    selectRange={true}
                    minDate={new Date()}
                    tileClassName={disableDatesClass}
                    tileDisabled={disableDatesInput}
                    minDetail="month"
                    maxDetail="month"
                    defaultView="year"
                />
                <div className="flex justify-start items-center gap-2 py-2">
                    <p className="flex justify-between gap-1 items-center"><span
                        className="w-4 h-4 bg-lime-green block rounded-full"></span>Available</p>
                    <p className="flex justify-between gap-1 items-center"><span
                        className="w-4 h-4 bg-red-300 block rounded-full"></span>Unavailable</p>
                </div>
            </div>
            <FloatingButton
                total={total}
                onClick={handleRedirect}/>
        </div>
    )
};

const FloatingButton = (props) => {

    const {onClick, total} = props;

    return (
        <div
            className="duration-300 transition-all fixed bottom-16 md:bottom-0 left-0 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2">
            <div className="bg-lime-green rounded-xl shadow-lg flex justify-between items-center p-4 m-4">
                <p className="text-white text-xl font-medium">Total: Rs. {total.toFixed(2)}</p>
                <button
                    onClick={onClick}
                    className="font-medium bg-white rounded-lg px-4 py-2 text-lime-green shadow-lg active:shadow-md active:translate-y-0.5 duration-300 transition-all">
                    Rent now
                </button>
            </div>
        </div>
    )
};

export default RentStorage;