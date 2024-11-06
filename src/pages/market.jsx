import MobileNav from "../components/mobileNav";
import MarketHeader from "../components/market/header";
import ItemCard from "../components/market/itemCard";
import Spacer from "../components/spacer";

const Market = () => {
    return(
        <div>
            <MobileNav />
            <MarketHeader/>
            <div className="p-4 grid grid-cols-2 gap-4">
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>
            <Spacer/>
        </div>
    )
};

export default Market;