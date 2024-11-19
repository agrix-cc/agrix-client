import ListingTable from "../../components/dashboard/listingTable";
import {IoChevronBack} from "react-icons/io5";
import {useEffect, useState} from "react";
import axios from "axios";

const Listings = (props) => {

    const {onBackClick} = props;
    const [listings, setListings] = useState();

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/user`)
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

    return (
        <div className="p-4 w-full mb-20">
            <div className="flex items-center gap-4">
                <button onClick={onBackClick} className="md:hidden md:invisible">
                    <IoChevronBack className="text-2xl"/>
                </button>
                <p className="text-xl font-medium">My Listings</p>
            </div>
            <div className="py-4">
                {listings &&
                    <ListingTable listings={listings}/>
                }
            </div>
        </div>
    )
};

export default Listings;