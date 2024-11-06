import MobileNav from "../components/mobileNav";
import HeroComponent from "../components/home/hero";
import Catalog from "../components/home/catalog";
import UserFeed from "../components/home/userFeed";
import Spacer from "../components/spacer";

const Home = () => {
    return (
        <div>
            <MobileNav/>
            <HeroComponent/>
            <Catalog/>
            <UserFeed/>
            <Spacer/>
        </div>
    )
}

export default Home;