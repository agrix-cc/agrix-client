import {Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ItemCard = (props) => {
    const {data} = props;

    const listingType = data.listing_type;

    return (
        <Link to="/product">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-32">
                    <img src="assets/hero.webp" alt="" className="w-full h-full object-cover"/>
                </div>
                <div className="p-2">
                    <Text lineClamp="1" className="text-lg font-medium">
                        {data.title}
                    </Text>
                    <p className="text-sage-green font-medium mb-2">24Kg Available</p>
                    <p className="text-2xl font-medium"> Rs. 190.00</p>
                    <p className="text-gray-500">
                        {
                            listingType === "crop" ? "Price per kg" :
                                listingType === "transport" ? "Price per km" :
                                    "Price per unit"
                        }
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ItemCard;