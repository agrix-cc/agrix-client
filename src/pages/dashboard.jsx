import MobileNav from "../components/mobileNav";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import ProfileOverview from "../components/profile/profileOverview";
import HomeButton from "../components/profile/homeButton";
import {FaBoxesPacking, FaNewspaper, FaUser} from "react-icons/fa6";
import {FaShoppingBag} from "react-icons/fa";
import Profile from "./dashboard/profile";
import {Toaster} from "../components/ui/toaster";
import {useMediaQuery} from "@mui/material";
import Listings from "./dashboard/listings";
import {LuLogOut} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import Orders from "./dashboard/orders";
import Purchases from "./dashboard/purchases";
import {MdCreateNewFolder} from "react-icons/md";

const Dashboard = () => {

    const navigate = useNavigate();

    const isDesktop = useMediaQuery('(min-width: 768px)');

    const [activePage, setActivePage] = useState(null);

    const [user, setUser] = useState(null);

    const handleLogOut = () => {
        localStorage.removeItem("jwtToken");
        navigate('/signin')
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        if (token) {
            setUser(decoded.user);
        }
    }, []);

    useEffect(() => {
        if (isDesktop) {
            setActivePage("profile");
        }
    }, [isDesktop])

    return (user &&
        <div>
            <MobileNav/>
            <Toaster/>
            <div className="pt-16 md:flex md:pt-14">
                {(!activePage || isDesktop) &&
                    <div className="md:h-[calc(100vh-56px)] md:max-w-xs md:shadow-xl md:px-4 md:self-start md:sticky md:top-14">
                        <div className="p-4">
                            <ProfileOverview user={user}/>
                        </div>
                        <div>
                            <HomeButton
                                isActive={activePage === "profile"}
                                onClick={() => setActivePage("profile")}
                                icon={<FaUser/>}
                                label="My Profile"/>
                            <HomeButton
                                isActive={activePage === "listings"}
                                onClick={() => setActivePage("listings")}
                                icon={<FaNewspaper/>}
                                label="My Listings"/>
                            <HomeButton
                                isActive={activePage === "orders"}
                                onClick={() => setActivePage("orders")}
                                icon={<FaBoxesPacking/>}
                                label="Incoming Orders"/>
                            <HomeButton
                                isActive={activePage === "purchases"}
                                onClick={() => setActivePage("purchases")}
                                icon={<FaShoppingBag/>}
                                label="My Purchases"/>
                            <HomeButton
                                onClick={() => navigate('/add')}
                                icon={<MdCreateNewFolder/>}
                                label="Create new listing"/>
                            <HomeButton
                                isLogOut
                                onClick={handleLogOut}
                                icon={<LuLogOut/>}
                                label="Log out"/>
                        </div>
                    </div>
                }
                <div className="md:flex-grow sm:max-w-md md:max-w-none">
                    <div className="w-full md:flex md:justify-center">
                        {activePage && activePage === "profile" &&
                            <Profile
                                onBackClick={() => setActivePage(null)}
                                user={user}/>
                        }
                        {activePage && activePage === "listings" &&
                            <Listings
                                onBackClick={() => setActivePage(null)}/>
                        }
                        {activePage && activePage === "orders" &&
                            <Orders
                                onBackClick={() => setActivePage(null)}/>
                        }
                        {activePage && activePage === "purchases" &&
                            <Purchases
                                onBackClick={() => setActivePage(null)}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;