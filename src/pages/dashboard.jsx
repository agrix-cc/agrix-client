import MobileNav from "../components/mobileNav";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import ProfileOverview from "../components/profile/profileOverview";
import HomeButton from "../components/profile/homeButton";
import {
    FaBoxesPacking,
    FaMessage,
    FaNewspaper,
    FaUser,
} from "react-icons/fa6";
import {FaShoppingBag} from "react-icons/fa";
import {Toaster} from "../components/ui/toaster";
import {useMediaQuery} from "@mui/material";
import {LuLogOut} from "react-icons/lu";
import {Outlet, useNavigate} from "react-router-dom";
import {MdCreateNewFolder} from "react-icons/md";
import {HiDocumentReport} from "react-icons/hi";


const Dashboard = () => {
    const navigate = useNavigate();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [user, setUser] = useState(null);

    const handleLogOut = () => {
        localStorage.removeItem("jwtToken");
        navigate("/signin");
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const decoded = jwtDecode(token);
        if (token) {
            setUser(decoded.user);
        }
    }, []);

    return (
        user && (
            <div>
                <MobileNav/>
                <Toaster/>
                <div className="pt-16 md:flex md:pt-14">
                    {isDesktop && (
                        <div
                            className="md:sticky md:top-14 md:h-[calc(100vh-56px)] md:max-w-xs md:self-start md:px-4 md:shadow-xl">
                            <div className="p-4">
                                <ProfileOverview user={user}/>
                            </div>
                            <div>
                                <HomeButton
                                    onClick={() => navigate("profile", {state: {user: user}})}
                                    icon={<FaUser/>}
                                    label="My Profile"
                                />
                                <HomeButton
                                    onClick={() =>
                                        navigate("listings", {
                                            state: {userType: user.user_type},
                                        })
                                    }
                                    icon={<FaNewspaper/>} a
                                    label="My Listings"
                                />
                                {user.profile_type === "generaluser"
                                    ? <HomeButton
                                        onClick={() => navigate("offers")}
                                        icon={<FaBoxesPacking/>}
                                        label="Incoming Offers"
                                    />
                                    : <HomeButton
                                        onClick={() => navigate("orders")}
                                        icon={<FaBoxesPacking/>}
                                        label="Incoming Orders"
                                    />
                                }

                                <HomeButton
                                    onClick={() => navigate("purchases")}
                                    icon={<FaShoppingBag/>}
                                    label="My Purchases"
                                />
                                <HomeButton
                                    onClick={() => navigate("messages")}
                                    icon={<FaMessage/>}
                                    label="Messages"
                                />
                                <HomeButton
                                    onClick={() => navigate("add")}
                                    icon={<MdCreateNewFolder/>}
                                    label="Create new listing"
                                />
                                {
                                    user.profile_type !== "generalUser" &&
                                    <HomeButton
                                        onClick={() => navigate("reports")}
                                        icon={<HiDocumentReport/>}
                                        label="Reports"
                                    />
                                }

                                <HomeButton
                                    isLogOut
                                    onClick={handleLogOut}
                                    icon={<LuLogOut/>}
                                    label="Log out"
                                />
                            </div>
                        </div>
                    )}
                    <div className="sm:max-w-md md:max-w-none md:flex-grow">
                        <div className="w-full md:flex md:justify-center">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
//This a comment

export default Dashboard;
