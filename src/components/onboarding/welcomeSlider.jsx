import Slider from "react-slick";

const WelcomeSlider = () => {
    return (
        <div className="text-center">
            <p className="text-6xl text-white font-medium mb-4">AgriX</p>
            <WelcomeTextSlider/>
        </div>
    );
}

const WelcomeTextSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return (
        <Slider {...settings} className="welcome-slider">
            <div>
                <p className="leading-6 text-white">Connect with buyers, access essential services, and manage crops
                    efficiently. AgriX simplifies
                    agriculture by linking you to everything you need for your farm.
                </p>
            </div>
            <div>
                <p className="leading-6 text-white">Connect with buyers, access essential services, and manage crops
                    efficiently. AgriX simplifies
                    agriculture by linking you to everything you need for your farm.
                </p>
            </div>
            <div>
                <p className="leading-6 text-white">Connect with buyers, access essential services, and manage crops
                    efficiently. AgriX simplifies
                    agriculture by linking you to everything you need for your farm.
                </p>
            </div>
            <div>
                <p className="leading-6 text-white">Connect with buyers, access essential services, and manage crops
                    efficiently. AgriX simplifies
                    agriculture by linking you to everything you need for your farm.
                </p>
            </div>
        </Slider>
    );
}

export default WelcomeSlider;