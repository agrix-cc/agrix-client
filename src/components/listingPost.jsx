//agrix-client\src\components\listingPost.jsx
import React, {useEffect, useState} from "react";
import ProfileBadge from "./profileBadge";
import ListingImagesSlider from "./listingImageSlider";
import {Link} from "react-router-dom";


const Post = (props) => {
    const {listing = null} = props;

    return (listing &&
        <div className="my-4 max-w-md bg-mint-green p-4 md:mx-4 md:w-full md:max-w-none md:rounded-2xl">
            <ProfileBadge
                name={`${listing.user.first_name} ${listing.user.last_name}`}
                image={listing.userImage}
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
                    price: `Rs. ${listing.storage.daily_rate.toFixed(2)} Daily rental`,
                    availableAmount: `${listing.storage.max_capacity} Kg Max Capacity`
                });
                break;
            case "transport":
                setData({
                    price: `Rs. ${listing.transport.price_per_km.toFixed(2)} Pre km`,
                    availableAmount: `${listing.transport.max_weight} Kg Max Capacity`
                });
                break;
            case "crop":
                setData({
                    price: `Rs. ${listing.crop.price_per_kg.toFixed(2)} `,
                    availableAmount: `${listing.crop.available_quantity} Kg`
                });
                break;
            case "wanted":
                setData({
                    // Add a required price (demand)
                    price: `Rs. ${(listing.wantedListing?.wanted_price || 0).toFixed(2)}`,
                    availableAmount: `${listing.wantedListing?.wanted_quantity || 0} Kg`,
                });
                break
            default:    
                setData({
                    price: `Rs. 0.00`,
                    availableAmount: `0 Kg`
                });
        }
    }, [listing]);

    return ((listing && data) &&
        <Link to={`/product/${listing.id}`}>
            <div className="my-2 overflow-hidden rounded-xl bg-white md:grid md:grid-cols-2">
                <ListingImagesSlider images={listing.images}/>
                <div className="p-4 md:grid md:place-content-start">
                    <div>
                        <p className="mb-2 text-lg">{listing.title}</p>
                        <div className="mb-2">
                            <p>
                                {listing.description}
                            </p>
                        </div>
                        <div>
                            <p><span className="text-gray-500">{listing.wantedListing ? "Wanted price" : "Price"}: </span>{data.price}</p>

                            <p><span className="text-gray-500">Location: </span>{listing.city}, {listing.district}</p>
                            <p><span className="text-gray-500">{listing.wantedListing ? "Required amount" : "Availability"}: </span>{data.availableAmount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Post;

















































































