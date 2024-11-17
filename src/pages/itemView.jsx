import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import MobileNav from "../components/mobileNav";
import Spacer from "../components/spacer";
import ProfileBadge from "../components/profileBadge";
import ListingImagesSlider from "../components/listingImageSlider";
import ListingInformation from "../components/itemView/listingInformation";
import FloatingIslandCrop from "../components/itemView/floatingIslandCrop";
import {Toaster} from "../components/ui/toaster";
import FloatingIsland from "../components/itemView/floatingIsland";
import Calendar from "react-calendar";
import {EmptyState} from "../components/ui/empty-state";
import {PiEmpty} from "react-icons/pi";
import {jwtDecode} from "jwt-decode";

const ItemView = () => {
    const {id} = useParams();

    const [data, setData] = useState(null)

    const [isLoading, setIsLoading] = useState(true);

    const [value, setValue] = useState();

    const [orders, setOrders] = useState(null);

    const [user, setUser] = useState(null);

    const disableDatesClass = ({date, view}) => {
        if (!orders) return null;
        return orders.some(order => view === "month" && date.getFullYear() === order.getFullYear() && date.getMonth() === order.getMonth() && date.getDate() === order.getDate()) ? 'unavailable-date' : null;
    }

    const disableDatesInput = ({date, view}) => {
        if (!orders) return null;
        return orders.some(order => view === "month" && date.getFullYear() === order.getFullYear() && date.getMonth() === order.getMonth() && date.getDate() === order.getDate());
    }

    // this will fetch the data from the server
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/view/${id}`)
            .then(res => {
                setData({listing: res.data.listing, images: res.data.images});
                if (res.data.listing.listing_type === "transport") {
                    const bookedDates = res.data.listing.TransportListing.TransportOrders;
                    setOrders(bookedDates ? bookedDates.map(date => new Date(date.booked_date)) : []);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decoded = await jwtDecode(token);
                setUser(decoded.user);
            }
        }
        getUser();
    }, []);

    return (!isLoading && data &&
        <div className="relative pb-20 md:h-dvh">
            <MobileNav/>
            <Toaster/>
            {!data.listing &&
                <div className="pt-20">
                    <EmptyState
                        icon={<PiEmpty/>}
                        title="Item not found"
                    />
                </div>
            }
            {data.listing &&
                <div className="md:grid md:grid-cols-2 md:pe-[5vw] md:ps-[5vw] md:h-dvh">

                    <div className="md:sticky md:top-0">
                        <div className="mt-20 px-4">
                            <ProfileBadge
                                name={`${data.listing.User.first_name} ${data.listing.User.last_name}`}
                                image={data.listing.User.profile_pic}
                                type={data.listing.User.profile_type}
                            />
                        </div>

                        <div className="item-view-slider mt-2 px-4">
                            <ListingImagesSlider
                                images={data.images}/>
                        </div>
                    </div>

                    <div className="md:overflow-y-auto md:pb-20 hide-scrollbar">
                        <ListingInformation listing={data.listing}/>
                        {data.listing.TransportListing &&
                            <div className="p-4">
                                <p className="text-lg font-medium mb-2">Select a date</p>
                                <div className="grid items-center justify-center">
                                    {orders &&
                                        <Calendar
                                            onChange={(value, event) => {
                                                setData((data) => ({...data, selectedDate: value}));
                                            }}
                                            showNeighboringMonth={true}
                                            minDate={new Date()}
                                            maxDate={new Date(`${new Date().getFullYear() + 1}/12/31`)}
                                            tileClassName={disableDatesClass}
                                            tileDisabled={disableDatesInput}
                                            minDetail="year"
                                        />
                                    }
                                </div>
                                <div className="flex justify-start items-center gap-2 py-2">
                                    <p className="flex justify-between gap-1 items-center"><span
                                        className="w-4 h-4 bg-lime-green block rounded-full"></span>Available</p>
                                    <p className="flex justify-between gap-1 items-center"><span
                                        className="w-4 h-4 bg-red-300 block rounded-full"></span>Unavailable</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            {data.listing && data.listing.CropListing && (user && user.id !== data.listing.UserId) &&
                <FloatingIslandCrop
                    value={value}
                    orderData={{...data.listing, image: data.images[0]}}
                    setValue={(e) => setValue(e.valueAsNumber)}
                    price={data.listing.CropListing?.price_per_kg || 0}
                    max={data.listing.CropListing?.available_quantity || 0}
                />
            }
            {data.listing && data.listing.TransportListing && (user && user.id !== data.listing.UserId) &&
                <FloatingIsland
                    disabled={!data.selectedDate}
                    disableMessage="Please select the date!"
                    listingInfo={{
                        id: data.listing.TransportListing.id,
                        price_per_km: data.listing.TransportListing.price_per_km,
                        listing: data,
                    }}
                    label="Rent Transport"
                    location="/rent-transport"/>
            }
            {data.listing && data.listing.StorageListing && (user && user.id !== data.listing.UserId) &&
                <FloatingIsland
                    disabled={!user || user.id === data.listing.UserId}
                    label="Rent Storage"/>
            }
            {(!user || user.id === data.listing.UserId) &&
                <div className="fixed bottom-16 md:bottom-0 left-0 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2">
                    <div className="bg-lime-green rounded-xl shadow-lg flex justify-center items-center p-4 m-4">
                        {!user ?
                            <Link to="/signin" className="text-white">Sign in to buy this product or service</Link>
                            : <p className="text-white">You are viewing your own listing</p>
                        }
                    </div>
                </div>
            }
            <Spacer/>
        </div>
    );
}

export default ItemView;