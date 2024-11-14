import Post from "../listingPost";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const UserFeed = () => {

    const [listings, setListings] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getListings = async (query) => {

            await axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/0/all/latest/${query}/?limit=20`)
                .then(res => {
                    setListings(res.data.listings);
                })
                .catch(err => {
                    if (err.response) {
                        console.error(err.response.data.message);
                    } else {
                        console.error(err.message);
                    }
                })
        }
        if (user) {
            getListings(`${user.city || 'all'}/${user.district || 'all'}`);
        } else {
            getListings('all/all');
        }
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const getUser = async () => {
            if (!token) return
            const decoded = await jwtDecode(token);
            if (decoded) {
                setUser(decoded.user);
            }
        }
        getUser();
    }, []);

    return (listings &&
        <div className="overflow-hidden py-2 md:ps-[10vw] md:pe-[10vw]">
            <div className="mb-2 flex justify-between items-start px-4">
                <p className="font-medium md:text-xl md:font-normal">{user ? 'Listings near by you' : 'Recently added listings'}</p>
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