import MobileNav from "../components/mobileNav";
import Spacer from "../components/spacer";
import ProfileBadge from "../components/profileBadge";
import ListingImagesSlider from "../components/listingImageSlider";
import ListingInformation from "../components/itemView/listingInformation";

const ItemView = () => {
    return (
        <div>
            <MobileNav/>

            <div className="mt-20 px-4">
                <ProfileBadge/>
            </div>

            <div className="item-view-slider mt-2 px-4">
                <ListingImagesSlider/>
            </div>

            <div className="mt-6 px-4">
                <ListingInformation/>
            </div>

            <Spacer/>
        </div>
    );
}

export default ItemView;