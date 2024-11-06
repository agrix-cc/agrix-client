import Slider from "react-slick";

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
        <div className="mb-4 listing-image-slider">
            <Slider {...settings}>
                <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
                <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
                <img src="assets/hero.webp" alt="" className="w-full h-full object-cover"/>
                <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
                <img src="assets/tomatoes.webp" alt="" className="w-full h-full object-cover"/>
            </Slider>
        </div>
    );
}

export default ListingImagesSlider;