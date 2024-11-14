import React, {useEffect, useState} from "react";
import ProfileBadge from "./profileBadge";
import ListingImagesSlider from "./listingImageSlider";
import {Link} from "react-router-dom";
import formatNumber from "./numberFormater";

const Post = (props) => {
    const {listing = null} = props;

    return (listing &&
        <div className="bg-mint-green p-4 my-4 max-w-md md:max-w-none md:rounded-2xl md:mx-4 md:w-full">
            <ProfileBadge
                name={`${listing.user.first_name} ${listing.user.last_name}`}
                image={listing.user.profile_pic}
                type={listing.user.profile_type}
            />
            <Card listing={listing}/>
        </div>
    )
}

const Card = (props) => {
    const {listing = null} = props;

    const [data, setData] = useState(null);

    useEffect(() => {
        switch (listing.listing_type) {
            case "storage":
                setData({
                    price: `Rs. ${formatNumber(listing.storage.price_per_unit)}`,
                    availableAmount: `${listing.storage.total_units} Units available`
                });
                break;
            case "transport":
                setData({
                    price: `Rs. ${formatNumber(listing.transport.price_per_km)}`,
                    availableAmount: `${listing.transport.service_radius} Units available`
                });
                break;
            default:
                setData({
                    price: `Rs. ${formatNumber(listing.crop.price_per_kg)}`,
                    availableAmount: `${listing.crop.available_quantity} Units available`
                });
                break
        }
    }, [listing]);

    return ((listing && data) &&
        <Link to={`/product/${listing.id}`}>
            <div className="bg-white my-2 overflow-hidden rounded-xl md:grid md:grid-cols-2">
                <ListingImagesSlider/>
                <div className="p-4 md:grid md:place-content-start">
                    <div>
                        <p className="mb-2 text-lg">{listing.title}</p>
                        <div className="mb-2">
                            <p>
                                {listing.description}
                            </p>
                        </div>
                        <div>
                            <p><span className="text-gray-500">Price: </span>{data.price}</p>
                            <p><span className="text-gray-500">Location: </span>{listing.city}, {listing.district}</p>
                            <p><span className="text-gray-500">Availability: </span>{data.availableAmount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Post;