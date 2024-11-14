import Search from "../search";
import {useState} from "react";


const HeroComponent = () => {

    const [keyword, setKeyword] = useState(null);

    return (
        <div
            className="h-80 md:h-dvh w-full bg-cover p-4 relative"
            style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.75)), url('assets/hero.webp')"}}
        >
            <div className="absolute bottom-0 left-0 p-4 md:h-fit md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <p className="text-white font-medium text-4xl mb-8 leading-relaxed">Connect, Share, Save Agriculture</p>
                <Search/>
            </div>
        </div>
    )
}

export default HeroComponent;