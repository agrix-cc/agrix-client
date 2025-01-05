//agrix-client\src\components\listingPost.jsx
// import React, {useEffect, useState} from "react";
// import ProfileBadge from "./profileBadge";
// import ListingImagesSlider from "./listingImageSlider";
// import {Link} from "react-router-dom";

// const Post = (props) => {
//     const {listing = null} = props;

//     return (listing &&
//         <div className="my-4 max-w-md bg-mint-green p-4 md:mx-4 md:w-full md:max-w-none md:rounded-2xl">
//             <ProfileBadge
//                 name={`${listing.user.first_name} ${listing.user.last_name}`}
//                 image={listing.userImage}
//                 type={listing.user.profile_type}
//             />
//             <Card listing={listing}/>
//         </div>
//     )
// }

// const Card = (props) => {
//     const {listing = null} = props;

//     const [data, setData] = useState(null);

//     useEffect(() => {
//         switch (listing.listing_type) {
//             case "storage":
//                 setData({
//                     price: `Rs. ${listing.storage.daily_rate.toFixed(2)} Daily rental`,
//                     availableAmount: `${listing.storage.max_capacity} Kg Max Capacity`
//                 });
//                 break;
//             case "transport":
//                 setData({
//                     price: `Rs. ${listing.transport.price_per_km.toFixed(2)} Pre km`,
//                     availableAmount: `${listing.transport.max_weight} Kg Max Capacity`
//                 });
//                 break;
//             case "crop":
//                 setData({
//                     price: `Rs. ${listing.crop.price_per_kg.toFixed(2)} `,
//                     availableAmount: `${listing.crop.available_quantity} Kg`
//                 });
//                 break;
//             case "generaluser":
//                 setData({
//                     // Add a required price (demand)
//                     price: `Rs. `,
//                     availableAmount: `${listing.wantedListing?.wanted_quantity || 0} Kg`
//                 });
//                 break
//             default:
//                 setData({
//                     price: `Rs. 0.00`,
//                     availableAmount: `0 Kg`
//                 });
//         }
//     }, [listing]);

//     const currentDate = new Date();
//     const bestBeforeDate = new Date(listing.best_before_date);
//     let finalPrice = listing.price_per_kg;
//     let isFlashSale = false;

//     if (listing.listing_type === 'crop' && currentDate > bestBeforeDate) {
//         finalPrice = listing.price_per_kg ? listing.price_per_kg * 0.8 : 0; // Apply 20% discount if price_per_kg is defined
//         isFlashSale = true;
//     }

//     return ((listing && data) &&
//         <Link to={`/product/${listing.id}`}>
//             {isFlashSale ? (
//                 <div className="my-2 overflow-hidden rounded-xl bg-red-100 md:grid md:grid-cols-2">
//                     <ListingImagesSlider images={listing.images}/>
//                     <div className="p-4 md:grid md:place-content-start">
//                         <div>
//                             <p className="mb-2 text-lg text-red-600">{listing.title}</p>
//                             <div className="mb-2">
//                                 <p>
//                                     {listing.description}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p><span className="text-gray-500">{listing.wantedListing ? "Wanted price" : "Price"}: </span>{data.price}</p>
//                                 <p><span className="text-gray-500">Price per kg: Rs. </span>{finalPrice? finalPrice.toFixed(2): 'N/A'}</p>
//                                 <p style={{ color: 'red' }}>Flash Sale: 20% off!</p>
//                                 <p><span className="text-gray-500">Location: </span>{listing.city}, {listing.district}</p>
//                                 <p><span className="text-gray-500">{listing.wantedListing ? "Required amount" : "Availability"}: </span>{data.availableAmount}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="my-2 overflow-hidden rounded-xl bg-white md:grid md:grid-cols-2">
//                     <ListingImagesSlider images={listing.images}/>
//                     <div className="p-4 md:grid md:place-content-start">
//                         <div>
//                             <p className="mb-2 text-lg">{listing.title}</p>
//                             <div className="mb-2">
//                                 <p>
//                                     {listing.description}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p><span className="text-gray-500">{listing.wantedListing ? "Wanted price" : "Price"}: </span>{data.price}</p>
                        
//                                 <p><span className="text-gray-500">Location: </span>{listing.city}, {listing.district}</p>
//                                 <p><span className="text-gray-500">{listing.wantedListing ? "Required amount" : "Availability"}: </span>{data.availableAmount}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </Link>
//     )
// }
// export default Post;

















































































// agrix-client/src/components/listingPost.jsx
import React, { useEffect, useState } from "react";
import ProfileBadge from "./profileBadge";
import ListingImagesSlider from "./listingImageSlider";
import { Link } from "react-router-dom";

const Post = (props) => {
    const { listing = null } = props;

    return (
        listing && (
            <div className="my-4 max-w-md bg-mint-green p-4 md:mx-4 md:w-full md:max-w-none md:rounded-2xl">
                <ProfileBadge
                    name={`${listing.user.first_name} ${listing.user.last_name}`}
                    image={listing.userImage}
                    type={listing.user.profile_type}
                />
                <Card listing={listing} />
            </div>
        )
    );
};

const Card = (props) => {
    const { listing = null } = props;
    const [data, setData] = useState(null);

    useEffect(() => {
        switch (listing.listing_type) {
            case "storage":
                setData({
                    price: `Rs. ${listing.storage.daily_rate.toFixed(2)} Daily rental`,
                    availableAmount: `${listing.storage.max_capacity} Kg Max Capacity`,
                });
                break;
            case "transport":
                setData({
                    price: `Rs. ${listing.transport.price_per_km.toFixed(2)} Per km`,
                    availableAmount: `${listing.transport.max_weight} Kg Max Capacity`,
                });
                break;
            case "crop":
                setData({
                    price: `Rs. ${listing.crop.price_per_kg.toFixed(2)}`,
                    availableAmount: `${listing.crop.available_quantity} Kg`,
                });
                break;
            case "generaluser":
                setData({
                    price: `Rs. `,
                    availableAmount: `${listing.wantedListing?.wanted_quantity || 0} Kg`,
                });
                break;
            default:
                setData({
                    price: `Rs. 0.00`,
                    availableAmount: `0 Kg`,
                });
        }
    }, [listing]);

    const currentDate = new Date();
    const bestBeforeDate = new Date(listing.best_before_date);
    let finalPrice = listing.price_per_kg;
    let isFlashSale = false;

    if (listing.listing_type === "crop" && currentDate > bestBeforeDate) {
        finalPrice = listing.price_per_kg ? listing.price_per_kg * 0.8 : 0; // Apply 20% discount
        isFlashSale = true;
    }

    return (
        listing &&
        data && (
            <Link to={`/product/${listing.id}`}>
                {isFlashSale ? (
                    <div className="my-2 overflow-hidden rounded-xl bg-red-100 md:grid md:grid-cols-2">
                        <ListingImagesSlider images={listing.images} />
                        <div className="p-4 md:grid md:place-content-start">
                            <div>
                                <p className="mb-2 text-lg text-red-600">{listing.title}</p>
                                <div className="mb-2">
                                    <p>{listing.description}</p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-gray-500">{listing.wantedListing ? "Wanted price" : "Price"}: </span>
                                        {data.price}
                                    </p>
                                    <p>
                                        <span className="text-gray-500">Price per kg: Rs. </span>
                                        {finalPrice ? finalPrice.toFixed(2) : "N/A"}
                                    </p>
                                    <p style={{ color: "red" }}>Flash Sale: 20% off!</p>
                                    <p>
                                        <span className="text-gray-500">Location: </span>
                                        {listing.city}, {listing.district}
                                    </p>
                                    <p>
                                        <span className="text-gray-500">
                                            {listing.wantedListing ? "Required amount" : "Availability"}:{" "}
                                        </span>
                                        {data.availableAmount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="my-2 overflow-hidden rounded-xl bg-white md:grid md:grid-cols-2">
                        <ListingImagesSlider images={listing.images} />
                        <div className="p-4 md:grid md:place-content-start">
                            <div>
                                <p className="mb-2 text-lg">{listing.title}</p>
                                <div className="mb-2">
                                    <p>{listing.description}</p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-gray-500">{listing.wantedListing ? "Wanted price" : "Price"}: </span>
                                        {data.price}
                                    </p>
                                    <p>
                                        <span className="text-gray-500">Location: </span>
                                        {listing.city}, {listing.district}
                                    </p>
                                    <p>
                                        <span className="text-gray-500">
                                            {listing.wantedListing ? "Required amount" : "Availability"}:{" "}
                                        </span>
                                        {data.availableAmount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Link>
        )
    );
};

export default Post;
