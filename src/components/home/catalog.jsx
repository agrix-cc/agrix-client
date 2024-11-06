import {FaTruck} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {MdWarehouse} from "react-icons/md";
import {IconContext} from "react-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CatalogItem = (props) => {

    const iconMap = {
        "Transport": <FaTruck/>,
        "Crops": <GiCorn/>,
        "Storage": <MdWarehouse/>,
    };

    return (
        <div
            className="border border-primary-green border-opacity-20 p-4 h-28 w-28 flex flex-col gap-2 rounded-xl items-center justify-center">
            <IconContext.Provider value={{color: "#02542D", size: "3em"}}>
                {iconMap[props.name]}
            </IconContext.Provider>
            <p className="text-primary-green font-medium text-lg">{props.name}</p>
        </div>
    )
}

const Catalog = () => {

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <div className="overflow-hidden p-4">
            <div className="mb-2 flex justify-between">
                <p className="font-medium">Catalog</p>
                <p className="font-medium text-gray-500">See all ></p>
            </div>
            <Slider {...sliderSettings}>
                <CatalogItem name="Transport"/>
                <CatalogItem name="Crops"/>
                <CatalogItem name="Storage"/>
            </Slider>
        </div>

    )
}

export default Catalog;