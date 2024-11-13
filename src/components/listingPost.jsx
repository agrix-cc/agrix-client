import ProfileBadge from "./profileBadge";
import ListingImagesSlider from "./listingImageSlider";

const Post = () => {
    return (
        <div className="bg-mint-green p-4 my-4 max-w-md md:max-w-none md:rounded-2xl md:mx-4">
            <ProfileBadge profileType="Farmer"/>
            <Card/>
        </div>
    )
}

const Card = () => {

    return (
        <div className="bg-white my-2 overflow-hidden rounded-xl md:grid md:grid-cols-2">
            <ListingImagesSlider/>
            <div className="p-4 md:grid md:place-content-center">
                <div>
                    <p className="mb-2 text-lg">Fresh Tomatoes for sale</p>
                    <div className="mb-2">
                        <p>
                            Get 10kg of freshly harvested, vine-ripened tomatoes, perfect for sauces, salads, and more!
                            Grown organically, bursting with flavor, and delivered farm-fresh.
                        </p>
                    </div>
                    <div>
                        <p><span className="text-gray-500">Price: </span>Rs. 200 per Kg</p>
                        <p><span className="text-gray-500">Location: </span>Mathale</p>
                        <p><span className="text-gray-500">Quantity: </span>10Kg</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post;