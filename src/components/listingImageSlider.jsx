import Slider from "react-slick";

const ListingImagesSlider = (props) => {
    const {images = []} = props;

    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        cssEase: "linear",
    };
    return (
        <div className="mb-4 listing-image-slider max-w-md md:max-w-none">
            <Slider {...settings}>
                {
                    images.length ?
                    images.map((image, id) => (
                        <img src={image || "/assets/placeholder.webp"} alt="" className="w-full h-full object-cover" key={id}/>
                    )) : <img src="/assets/placeholder.webp" alt="" className="w-full h-full object-cover"/>
                }
            </Slider>
        </div>
    );
}

export default ListingImagesSlider;