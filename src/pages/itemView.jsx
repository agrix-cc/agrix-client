import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import MobileNav from "../components/mobileNav";
import Spacer from "../components/spacer";
import ProfileBadge from "../components/profileBadge";
import ListingImagesSlider from "../components/listingImageSlider";
import ListingInformation from "../components/itemView/listingInformation";
import FloatingIslandCrop from "../components/itemView/floatingIslandCrop";
import {Toaster} from "../components/ui/toaster";
import FloatingIsland from "../components/itemView/floatingIsland";

const ItemView = () => {
    const {id} = useParams();

    const [data, setData] = useState({
        listing: {},
        images: [],
    })

    const [isLoading, setIsLoading] = useState(true);

    const [value, setValue] = useState();

    // this will fetch the data from the server
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/view/${id}`)
            .then(res => {
                setData(data => ({...data, listing: res.data.listing, images: res.data.images}));
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        isLoading ? <></> :
            <div className="relative pb-20">
                <MobileNav/>
                <Toaster/>
                <div className="md:grid md:grid-cols-2 md:pe-[5vw] md:ps-[5vw]">

                    <div>
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

                    <ListingInformation listing={data.listing}/>
                </div>
                {data.listing.CropListing &&
                    <FloatingIslandCrop
                        value={value}
                        orderData={{...data.listing, image: data.images[0]}}
                        unit={'kg'}
                        setValue={(e) => setValue(e.valueAsNumber)}
                        price={data.listing.CropListing?.price_per_kg || 0}
                        max={data.listing.CropListing?.available_quantity || 0}
                    />
                }
                {data.listing.TransportListing &&
                    <FloatingIsland
                        listingInfo={{
                            id: data.listing.TransportListing.id,
                            price_per_km: data.listing.TransportListing.price_per_km,
                        }}
                        label="Rent Transport"
                        location="/rent-transport"/>
                }
                {data.listing.StorageListing &&
                    <FloatingIsland label="Rent Storage"/>
                }
                <Spacer/>
            </div>
    );
}

export default ItemView;