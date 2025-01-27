import {IoCart, IoChevronBack, IoEye, IoTrashBin} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toaster, Toaster} from "../../components/ui/toaster";

const Offers = () => {
    const navigate = useNavigate();
    const [offers, setOffers] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/offers/all`)
            .then(res => {
                console.log(res.data.offers)
                setOffers(res.data.offers);
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                } else {
                    console.log(err.message);
                }
            })
    }, []);

    const handleDelete = (offerId) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/offers/${offerId}`)
            .then(() => {
                setOffers(offers.filter(offer => offer.id !== offerId));
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.message);
                } else {
                    console.log(err.message);
                }
            });
    };

    return (
        <div className="p-4 w-full mb-20">
            <Toaster/>
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="md:hidden md:invisible">
                    <IoChevronBack className="text-2xl"/>
                </button>
                <p className="text-xl font-medium">Offers received</p>
            </div>
            <div className="py-4">
                <div className="grid grid-cols-6">
                    <p className="text-zinc-500 text-center">Id</p>
                    <p className="text-zinc-500 text-center">Offered price</p>
                    <p className="text-zinc-500 text-center">Offered quantity</p>
                    <p className="text-zinc-500 text-center">Offer title</p>
                    <p className="text-zinc-500 text-center">Original Price</p>
                    <p className="text-zinc-500 text-center">Actions</p>
                </div>
                {offers && offers.map((offer, idx) =>
                    <OfferRow offer={offer} key={idx} onDelete={handleDelete}/>
                )}
            </div>
        </div>
    );
};

const OfferRow = (props) => {
    const {offer, onDelete} = props;
    console.log(offer)

    const navigate = useNavigate();

    const handleCheckout = async () => {
        const listing = {};
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/view/${offer.offered_listing.id}`)
            .then(res => {
                listing["data"] = res.data.listing;
                listing["data"]["image"] = res.data.images[0];
            })
            .catch(error => {
                console.log(error);
            });
        listing["data"]["qty"] = offer.offered_qty;
        listing["data"]["CropListing"]["price_per_kg"] = offer.offered_price;
        listing["data"]["offerId"] = offer.id;
        listing["data"]["is_donation"] = offer.wanted_listing?.WantedListing?.is_donation;
        if (listing.data.CropListing.available_quantity < offer.offered_qty) {
            toaster.create({
                type: "error",
                title: "Not enough quantity left to purchase",
            })
        } else {
            navigate('/checkout', {state: listing["data"]});
        }
    }

    return (
        <div className="grid grid-cols-6 py-4 place-content-center">
            <p className="text-black text-center">{offer.id}</p>
            <p className="text-black text-center">Rs. {offer.offered_price.toFixed(2)}</p>
            <p className="text-black text-center">{offer.offered_qty} Kg</p>
            <p className="text-black text-center">{offer.offered_listing.title.length > 25 ? offer.offered_listing.title.slice(0, 25) + "..." : offer.offered_listing.title}</p>
            <p className="text-black text-center">Rs. {offer.offered_listing.CropListing.price_per_kg.toFixed(2)}</p>
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={handleCheckout}
                    className="bg-lime-green px-2 py-1 rounded-md text-white"><IoCart/></button>
                <Link to={`/product/${offer.offered_listing.id}`} target="_blank"
                      className="bg-mint-green px-2 py-1 rounded-md"><IoEye/></Link>
                <button onClick={() => onDelete(offer.id)} className="bg-red-500 px-2 py-1 rounded-md text-white">
                    <IoTrashBin/></button>
            </div>
        </div>
    );
};

export default Offers;