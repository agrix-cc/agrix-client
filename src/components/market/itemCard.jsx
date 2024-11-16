import {Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ItemCard = (props) => {
    const {data} = props;
    const listingType = data.listing_type;

    const cardDetails = {
        quantity : "",
        price: "",
        priceDescription: ""
    };

    switch (listingType) {
        case "storage":
            cardDetails.quantity = `${data.storage.total_units} Units available`;
            cardDetails.price = data.storage.price_per_unit;
            cardDetails.priceDescription = "Price per unit";
            break;
        case "transport":
            cardDetails.quantity = null;
            cardDetails.price = data.transport.price_per_km;
            cardDetails.priceDescription = "Price per Km";
            break;
        default:
            cardDetails.quantity = `${data.crop.available_quantity}Kg Available`;
            cardDetails.price = data.crop.price_per_kg;
            cardDetails.priceDescription = "Price per Kg";
            break;
    }

    return (
        <Link to={`/product/${data.id}`}>
            <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <div className="w-full h-32">
                    <img src={data.imageUrl || "assets/placeholder.webp"} alt="" className="w-full h-full object-cover"/>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm capitalize">
                        {listingType}
                    </p>
                    <Text lineClamp="1" className="text-lg font-medium">
                        {data.title}
                    </Text>
                    <p className="text-sage-green font-medium mb-2 capitalize">
                        {cardDetails.quantity || data.transport.vehicle_type}
                    </p>
                    <p className="text-2xl font-medium">Rs. {cardDetails.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">
                        {cardDetails.priceDescription}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ItemCard;