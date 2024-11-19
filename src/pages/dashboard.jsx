import MobileNav from "../components/mobileNav";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import ProfileOverview from "../components/profile/profileOverview";
import HomeButton from "../components/profile/homeButton";
import {FaNewspaper, FaUser} from "react-icons/fa6";
import {AiFillDashboard} from "react-icons/ai";
import {FaShoppingBag, FaTruck} from "react-icons/fa";
import {MdWarehouse} from "react-icons/md";
import Profile from "./dashboard/profile";
import {Toaster} from "../components/ui/toaster";
import {useMediaQuery} from "@mui/material";
import Listings from "./dashboard/listings";
import {LuLogOut} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import Orders from "./dashboard/orders";

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
                                isActive={activePage === "dashboard"}
                                onClick={() => setActivePage("dashboard")}
                                icon={<AiFillDashboard/>}
                                label="Dashboard"/>
                            <HomeButton
                                isActive={activePage === "listings"}
                                onClick={() => setActivePage("listings")}
                                icon={<FaNewspaper/>}
                                label="My Listings"/>
                            <HomeButton
                                isActive={activePage === "orders"}
                                onClick={() => setActivePage("orders")}
                                icon={<FaShoppingBag/>}
                                label="My Orders"/>
                            <HomeButton
                                isActive={activePage === "transport"}
                                onClick={() => setActivePage("transport")}
                                icon={<FaTruck/>}
                                label="Rented Transports"/>
                            <HomeButton
                                isActive={activePage === "storage"}
                                onClick={() => setActivePage("storage")}
                                icon={<MdWarehouse/>}
                                label="Rented Storages"/>
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
                        {activePage && activePage === "dashboard" &&
                            <div className="p-4 w-full">
                                <p>Dashboard</p>
                            </div>
                        }
                        {activePage && activePage === "listings" &&
                            <Listings
                                onBackClick={() => setActivePage(null)}/>
                        }
                        {activePage && activePage === "orders" &&
                            <Orders
                                onBackClick={() => setActivePage(null)}/>
                        }
                        {activePage && activePage === "transport" &&
                            <p>Transport rentals</p>
                        }
                        {activePage && activePage === "storage" &&
                            <p>Storage rentals</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;