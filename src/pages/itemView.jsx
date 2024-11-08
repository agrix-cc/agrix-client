import MobileNav from "../components/mobileNav";
import Spacer from "../components/spacer";
import ProfileBadge from "../components/profileBadge";
import ListingImagesSlider from "../components/listingImageSlider";
import ListingInformation from "../components/itemView/listingInformation";
import FloatingIsland from "../components/itemView/floatingIsland";

const ItemView = () => {
    return (
        <div className="relative pb-20">
            <MobileNav/>

            <div className="mt-20 px-4">
                <ProfileBadge />
            </div>
            <div className="item-view-slider mt-2 px-4">
                <ListingImagesSlider/>
            </div>

            <ListingInformation/>

            <FloatingIsland/>

            <Spacer/>
        </div>
    );
}

export default ItemView;