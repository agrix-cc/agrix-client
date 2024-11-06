import {Link} from "react-router-dom";
import ProfileBadge from "./profileBadge";
import ListingImagesSlider from "./listingImageSlider";

const Post = () => {
    return (
        <div className="bg-mint-green p-4 my-4">
            <ProfileBadge profileType="Farmer"/>
            <Card/>
        </div>
    )
}

const Card = () => {
    return (
        <div className="bg-white my-2 overflow-hidden rounded-xl">
            <ListingImagesSlider/>
            <div className="p-4">
                <p className="mb-2 text-lg">Fresh Tomatoes for sale</p>
                <div className="mb-2">
                    <p>
                        Get 10kg of freshly harvested, vine-ripened tomatoes, perfect for sauces, salads, and more!
                        Grown organically, bursting with flavor, and delivered farm-fresh.
                    </p>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p><span className="text-gray-500">Price: </span>Rs. 200 per Kg</p>
                        <p><span className="text-gray-500">Location: </span>Mathale</p>
                        <p><span className="text-gray-500">Quantity: </span>10Kg</p>
                    </div>
                    <Link to="/product"
                          className="bg-lime-green px-4 py-2 rounded-full hover:shadow-lg hover:-translate-y-0.5 shadow-md active:translate-y-0 transition-all duration-300">
                        <p className="text-white font-medium text-lg">Buy Now</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Post;