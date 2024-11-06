import {Link} from "react-router-dom";
import Slider from "react-slick";

const Post = () => {
    return (
        <div className="bg-mint-green p-4 my-4">
            <ProfileBadge/>
            <Card/>
        </div>
    )
}

const ListingImagesSlider = () => {
    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        cssEase: "linear"
    };
    return (
        <Slider {...settings}>
            <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
            <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
            <img src="assets/hero.webp" alt="" className="w-full h-full object-cover"/>
            <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
            <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
        </Slider>
    );
}

const ProfileBadge = () => {
    return (
        <div className="flex justify-start items-center gap-2">
            <div className="w-11 h-11 rounded-full overflow-hidden">
                <img src="assets/profile-pic.webp" alt="" className="w-full h-full object-cover"/>
            </div>
            <div>
                <p>Tom Davis</p>
                <p className="text-gray-500">Farmer</p>
            </div>
        </div>
    )
}

const Card = () => {
    return (
        <div className="bg-white my-2 overflow-hidden rounded-xl">
            <div className="mb-4 feed-post-image-slider">
                <ListingImagesSlider/>
            </div>
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