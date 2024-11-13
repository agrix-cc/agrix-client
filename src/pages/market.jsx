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

    // This state is to check whether the page is loading with the request
    const [isLoading, setIsLoading] = useState(true);

    const [isEnd, setIsEnd] = useState(false);

    const [search, setSearch] = useState("");

    // This state object is to manage filters
    const [params, setParams] = useState({
        city: [],
        district: [],
        sort: [],
        type: [],
        offset: 0
    });

    // this will fetch the data from the server
    useEffect(() => {
        const type = params.type.length ? params.type : 'all';
        const sort = params.sort.length ? params.sort : 'default';
        const city = params.city.length ? params.city : 'all';
        const district = params.district.length ? params.district : 'all';

        axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/${params.offset}/${type}/${sort}/${city}/${district}/${search}`)
            .then(res => {
                setIsLoading(false);
                if (params.offset > 0) {
                    setListings(prevListing => [...prevListing, ...res.data.listings]);
                } else {
                    setListings(res.data.listings);
                }
                setIsEnd(res.data.end)
            })
            .catch(error => {
                console.log(error);
            });
    }, [params, search]);

    return (
        <div>
            <MobileNav/>
            <MarketHeader setParams={setParams} params={params} search={search} setSearch={setSearch}/>
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
                listings.length >= 8 && !isEnd ?
                    <div className="flex justify-center items-center py-4">
                        <Button
                            label="Load more"
                            onClick={() => {
                                setParams({...params, offset: params.offset + 1})
                            }}
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