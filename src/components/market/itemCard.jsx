import {Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ItemCard = () => {
    return (
        <Link to="/product">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-32">
                    <img src="assets/hero.webp" alt="" className="w-full h-full object-cover"/>
                </div>
                <div className="p-2">
                    <Text lineClamp="1" className="text-lg font-medium">
                        Fresh Tomatoes for Sale
                    </Text>
                    <p className="text-sage-green font-medium mb-2">24Kg Available</p>
                    <p className="text-2xl font-medium"> Rs. 190.00</p>
                    <p className="text-gray-500">Price per km</p>
                </div>
            </div>
        </Link>
    );
}

export default ItemCard;