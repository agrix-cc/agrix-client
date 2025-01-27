import {Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ItemCard = (props) => {
    const {data} = props;
    const listingType = data.listing_type;

    const cardDetails = {
        quantity: "",
        price: "",
        priceDescription: ""
    };

    switch (listingType) {
        case "storage":
            cardDetails.quantity = null;
            cardDetails.price = data.storage.daily_rate;
            cardDetails.priceDescription = "Daily rental";
            break;
        case "transport":
            cardDetails.quantity = null;
            cardDetails.price = data.transport.price_per_km;
            cardDetails.priceDescription = "Price per Km";
            break;
        case "crop":
            cardDetails.quantity = `${data.crop.available_quantity}Kg Available`;
            cardDetails.price = data.crop.is_flash_sale ? data.crop.discounted_price : data.crop.price_per_kg;
            cardDetails.priceDescription = "Price per Kg";
            break;
        default:
            cardDetails.quantity = `Seeking ${data.wantedListing.wanted_quantity}Kg`;
            cardDetails.price = data.wantedListing?.wanted_price || 0;
            cardDetails.priceDescription = "Expecting price per kg";
            break;
    }

    return (
        <Link to={`/product/${data.id}`}>
            <div className="h-full overflow-hidden rounded-lg shadow-lg">
                <div className="h-32 w-full">
                    <img src={data.imageUrl || "/assets/placeholder.webp"} alt=""
                         className="h-full w-full object-cover"/>
                </div>
                <div className="p-2">
                    <p className="text-sm capitalize text-gray-500">
                        {listingType}
                    </p>
                    <Text lineClamp="1" className="text-lg font-medium">
                        {data.title}
                    </Text>
                    <p className="mb-2 font-medium capitalize text-sage-green">
                        {cardDetails.quantity &&
                            (cardDetails.quantity || data.transport.vehicle_type.replace("_", " "))
                        }
                    </p>
                    {
                        data.crop?.is_flash_sale && "Flash sale"
                    }
                    {listingType === "wanted" && data.wantedListing.is_donation
                        ? <div className="rounded bg-lime-green p-2 text-white text-center">
                            <p>Donation request</p>
                        </div>
                        : <>
                            <p className="text-2xl font-medium">Rs. {cardDetails.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">
                                {cardDetails.priceDescription}
                            </p>
                        </>
                    }
                </div>
            </div>
        </Link>
    );
}

export default ItemCard;