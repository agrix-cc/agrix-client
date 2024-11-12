import MobileNav from "../components/mobileNav";
import MarketHeader from "../components/market/header";
import ItemCard from "../components/market/itemCard";
import Spacer from "../components/spacer";
import {useEffect, useState} from "react";
import Button from "../components/onboarding/button";
import axios from "axios";
import LoadingCards from "../components/loadingCards";
import {EmptyState} from "../components/ui/empty-state";
import {FaBoxOpen} from "react-icons/fa6";

const Market = () => {

    // This state object holds all the listings fetching from the server
    const [listings, setListings] = useState([]);

    // This state is to maintain the pagination to keep track of the current offset
    const [offset, setOffset] = useState(0);

    // This state is to check whether the page is loading with the request
    const [isLoading, setIsLoading] = useState(true);

    // This state object is to manage filters
    const [params, setParams] = useState({
        city: [],
        district: [],
        sort: [],
        type: [],
    });

    // this will fetch the data from the server
    useEffect(() => {
        const type = params.type.length ? params.type : 'all';
        const sort = params.sort.length ? params.sort : 'default';
        const city = params.city.length ? params.city : 'all';
        const district = params.district.length ? params.district : 'all';

        axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/${offset}/${type}/${sort}/${city}/${district}`)
            .then(res => {
                setIsLoading(false);
                if (offset === 0) {
                    setListings(res.data.listings);
                    console.log(res.data)
                } else {
                    setListings(prevListing => [...prevListing, ...res.data.listings]);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [params, offset]);

    return (
        <div>
            <MobileNav/>
            <MarketHeader setParams={setParams} params={params}/>
            {
                isLoading ?
                    <div className="p-4">
                        <LoadingCards/>
                    </div>
                    :
                    <div className="p-4 grid grid-cols-2 gap-4">
                        {
                            listings.map((listing, i) =>
                                <ItemCard data={listing} key={i}/>
                            )
                        }
                    </div>
            }
            {
                listings.length > 8 ?
                    <div className="flex justify-center items-center py-4">
                        <Button
                            label="Load more"
                            onClick={() => setOffset(prevState => prevState + 16)}
                            className="max-w-xs"
                        />
                    </div>
                    : (listings.length <= 0 ?
                        <div className="flex justify-center items-center">
                            <EmptyState
                                icon={<FaBoxOpen/>}
                                title={`No ${params.type} listings`}
                                description="Try different service or product"
                            />
                        </div>
                        : <></>)
            }
            <Spacer/>
        </div>
    )
};

export default Market;