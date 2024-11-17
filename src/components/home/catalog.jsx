import {FaTruck} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {MdWarehouse} from "react-icons/md";
import {IconContext} from "react-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";

const CatalogItem = (props) => {

    const iconMap = {
        "Transport": <FaTruck/>,
        "Crops": <GiCorn/>,
        "Storage": <MdWarehouse/>,
    };

    return (
        <div
            className="cursor-pointer border border-primary-green border-opacity-20 p-4 h-28 w-28 flex flex-col gap-2 rounded-xl items-center justify-center">
            <IconContext.Provider value={{color: "#02542D", size: "3em"}}>
                {iconMap[props.name]}
            </IconContext.Provider>
            <p className="text-primary-green font-medium text-lg">{props.name}</p>
        </div>
    )
}

const Catalog = () => {
    const media = useMediaQuery('(min-width:768px)');


    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <div className="overflow-hidden p-4">
            {
                media ?
                    <div className="w-full ps-[10vw] pe-[10vw]">
                        <div className="mb-2 flex justify-between">
                            <p className="text-xl">Catalog</p>
                            <p className="text-lg text-gray-500">See all ></p>
                        </div>
                        <div className="grid items-center place-content-center w-full">
                            <div className="grid grid-cols-3 gap-8">
                                <Link to="market/transport">
                                    <CatalogItem name="Transport"/>
                                </Link>
                                <Link to="market/crop">
                                    <CatalogItem name="Crops"/>
                                </Link>
                                <Link to="market/storage">
                                    <CatalogItem name="Storage"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="md:hidden">
                        <div className="mb-2 flex justify-between">
                            <p className="font-medium">Catalog</p>
                            <p className="font-medium text-gray-500">See all ></p>
                        </div>
                        <Slider {...sliderSettings}>
                            <Link to="market/transport">
                                <CatalogItem name="Transport"/>
                            </Link>
                            <Link to="market/crop">
                                <CatalogItem name="Crops"/>
                            </Link>
                            <Link to="market/storage">
                                <CatalogItem name="Storage"/>
                            </Link>
                        </Slider>
                    </div>
            }
        </div>

    )
}

export default Catalog;