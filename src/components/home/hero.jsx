import Search from "../search";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const HeroComponent = () => {

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/search/${keyword}`)
            .then(res => {
                setResults(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [keyword]);

    return (
        <div
            className="h-80 md:h-dvh w-full bg-cover p-4 relative"
            style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.75)), url('assets/hero.webp')"}}
        >
            <div
                className="absolute bottom-0 left-0 p-4 md:h-fit md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <p className="text-white font-medium text-4xl mb-8 leading-relaxed">Connect, Share, Save Agriculture</p>
                <div className="w-full relative">
                    <Search
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {results && keyword &&
                        <div className="bg-white rounded-xl mt-2 grid gap-4 absolute w-full p-4 shadow-md z-50">
                            {results.length > 0 ?
                                results.map(result =>
                                    <Link to={`/product/${result.id}`} key={result.id}>
                                        <div className="h-16 flex gap-2 items-center">
                                            <img src={result.image || "/assets/placeholder.webp"} alt=""
                                                 className="w-16 h-full rounded-lg"/>
                                            <div>
                                                <p>{result.title}</p>
                                                <p className="text-gray-500 capitalize">{result.listing_type}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : <p className="text-center text-gray-500"> No result found </p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroComponent;