import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const OfferScreen = (props) => {
    const {
        closer,
        wantedId,
        sendMessage = false,
        onSend,
        offered_to = null,
        isDonation = false,
    } = props;

    const [listings, setListings] = useState(null);
    const [selectedListing, setSelectedListing] = useState(null);
    const [offerPrice, setOfferPrice] = useState(0);
    const [offerQty, setOfferQty] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/offers/load-listings`)
            .then(res => {
                setListings(res.data.listings);
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                } else {
                    console.log(err.message);
                }
            })
    }, []);

    const handleSubmit = () => {
        if (!selectedListing) {
            setError("Please select a offering listing!");
            return;
        }
        if (offerQty <= 0) {
            setError("Please select a valid offering quantity!");
            return;
        }
        if (offerQty > selectedListing.CropListing.available_quantity) {
            setError("Not enough available quantity!");
            return;
        }
        if (!isDonation && offerPrice <= 0) {
            setError("Please select a valid offering price!");
            return;
        }

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.post(`${process.env.REACT_APP_SERVER_URL}/offers/send`, {
            offered_price: isDonation ? 0 : offerPrice,
            offered_qty: offerQty,
            offered_listing: selectedListing.id,
            wanted_listing: wantedId,
            offered_to: offered_to,
        })
            .then(res => {
                setError("");
                if (sendMessage) {
                    onSend(res.data.offer_id);
                }
                closer();
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.message);
                    setError(err.response.data.message);
                } else {
                    console.log(err.message);
                    setError(err.message);
                }
            })
    }

    return (listings &&
        <div className="shadow-md fixed top-0 left-0 h-screen w-screen z-50 grid place-content-center bg-opacity-10 bg-black backdrop-blur">
            <div className="bg-white rounded relative">
                <div className="flex justify-between items-center gap-4 sticky top-0 left-0 bg-white p-4">
                    <p>Select your offer</p>
                    <button onClick={closer}>
                        <IoClose className="text-lg" />
                    </button>
                </div>
                <div className="max-h-[calc(100vh-512px)] overflow-y-auto">
                    {listings.map((listing, idx) =>
                        <Listing
                            key={idx}
                            listing={listing}
                            selected={selectedListing?.id === listing.listing.id}
                            selectListing={setSelectedListing} />
                    )}
                </div>
                {selectedListing &&
                    <div className="p-4 sticky bottom-0">
                        <p>Selected listing id: {selectedListing.id}</p>
                        {!isDonation &&
                            <div className="flex justify-between items-center my-2">
                                <label htmlFor="offer_price">Offer price per kg: </label>
                                <div>
                                    Rs. <input
                                        required
                                        name="offerPrice"
                                        onChange={(e) => setOfferPrice(e.target.value)}
                                        value={offerPrice}
                                        placeholder="Enter price"
                                        className="p-2 border-zinc-400 border rounded md:w-52"
                                        type="number"
                                        id="offer_price"
                                        min={0} />
                                </div>
                            </div>
                        }
                        <div className="flex justify-between items-center">
                            <label htmlFor="offer_qty">Quantity offering: </label>
                            <div>
                                Kg <input
                                    required
                                    name="offerPrice"
                                    onChange={(e) => setOfferQty(e.target.value)}
                                    value={offerQty}
                                    placeholder="Enter quantity"
                                    className="p-2 border-zinc-400 border rounded md:min-w-52"
                                    type="number"
                                    id="offer_qty"
                                    max={selectedListing.CropListing.available_quantity}
                                    min={0} />
                            </div>
                        </div>
                        {!isDonation &&
                            <div className="flex justify-between items-center mt-4">
                                <p>Total offer: Rs. {(offerPrice * offerQty).toFixed(2)}</p>
                            </div>
                        }
                        <button
                            onClick={handleSubmit}
                            className="mt-2 w-full bg-lime-green text-white rounded-full py-2 shadow-md active:shadow-sm active:translate-y-0.5 transition-all duration-300">
                            Send
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>
                }
            </div>
        </div>
    )
}

const Listing = (props) => {
    const { listing, selectListing, selected } = props;
    return (
        <div
            onClick={() => selectListing(listing.listing)}
            className={`flex justify-between gap-4 cursor-pointer border-b border-zinc-300 p-4 ${selected ? "bg-mint-green" : ""}`}>
            <img className="w-32 h-32 rounded object-cover aspect-square flex-shrink-0" src={listing.listing_image} alt="" />
            <div>
                <p>Id: {listing.listing.id}</p>
                <p>{listing.listing.title.length > 50 ? listing.listing.title.slice(0, 50) + "..." : listing.listing.title}</p>
                <p className="text-zinc-500 break-words max-w-md">{listing.listing.description.length > 50 ? listing.listing.description.slice(0, 50) + "..." : listing.listing.description}</p>
                <p>Price per kg: Rs. {listing.listing.CropListing.price_per_kg.toFixed(2)}</p>
                <p>Available quantity: {listing.listing.CropListing.available_quantity} Kg</p>
            </div>
        </div>
    )
}

export default OfferScreen;