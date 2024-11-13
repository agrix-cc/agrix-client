import MobileNav from "../components/mobileNav";
import Spacer from "../components/spacer";
import ProfileBadge from "../components/profileBadge";
import ListingImagesSlider from "../components/listingImageSlider";
import ListingInformation from "../components/itemView/listingInformation";
import FloatingIsland from "../components/itemView/floatingIsland";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const ItemView = () => {

    const {id} = useParams();

    const [data, setData] = useState({
        listing: {},
        images: [],
    })

    const [isLoading, setIsLoading] = useState(true);

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

                <div className="mt-20 px-4">
                    <ProfileBadge
                        name={`${data.listing.User.first_name} ${data.listing.User.last_name}`}
                        image={data.listing.User.profile_pic}
                        type={data.listing.User.profile_type}
                    />
                </div>

                <div className="item-view-slider mt-2 px-4">
                    <ListingImagesSlider images={data.images}/>
                </div>

                <ListingInformation listing={data.listing}/>

                <FloatingIsland/>

                <Spacer/>
            </div>
    );
}

export default ItemView;