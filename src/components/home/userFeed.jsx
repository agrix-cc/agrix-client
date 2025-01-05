import Post from "../listingPost";
import {useEffect, useState} from "react";
import axios from "axios";

const UserFeed = () => {

    const [listings, setListings] = useState(null);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/latest`)
            .then(res => {
                setListings(res.data.listings);
                console.log(res.data)
            })
            .catch(err => {
                if (err.response) {
                    console.error(err.response.data.message);
                } else {
                    console.error(err.message);
                }
            })
    }, []);

    return (listings &&
        <div className="overflow-hidden py-2 md:pe-[10vw] md:ps-[10vw]">
            <div className="mb-2 flex items-start justify-between px-4">
                <p className="font-medium md:text-xl md:font-normal">Recently added listings</p>
            </div>
            {
                <div className="md:grid md:place-content-center">
                    {
                        listings.map((listing, id) => (
                            <Post listing={listing} key={id}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default UserFeed;