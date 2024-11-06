import {useEffect, useState, useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {IconContext} from "react-icons";

import {GoHomeFill} from "react-icons/go";
import {GoHome} from "react-icons/go";
import {FaPlus} from "react-icons/fa6";
import {AiFillShop} from "react-icons/ai";
import {AiOutlineShop} from "react-icons/ai";
import {HiMiniUserGroup} from "react-icons/hi2";
import {HiOutlineUserGroup} from "react-icons/hi2";
import {HiOutlineUser} from "react-icons/hi2";
import {HiUser} from "react-icons/hi2";


const MobileNavItem = (props) => {

    // Hash map tp map icons with the props name
    // useMemo cache object so that useEffect doesn't rerender unnecessarily
    const iconMap = useMemo(() => ({
        "Home": <GoHome/>,
        "Home-active": <GoHomeFill/>,
        "Market": <AiOutlineShop/>,
        "Market-active": <AiFillShop/>,
        "add": <FaPlus/>,
        "Connections": <HiOutlineUserGroup/>,
        "Connections-active": <HiMiniUserGroup/>,
        "Profile": <HiOutlineUser/>,
        "Profile-active": <HiUser/>
    }), []);

    // useState hook to hold the icon
    const [icon, setIcon] = useState(<></>);
    // useLocation hook to get the current path name of url
    const location = useLocation();

    // change the icon from outline to fill whenever the location pathname get changes
    useEffect(() => {
        // assign right icon to the menu item by matching props name with hashmap
        setIcon(iconMap[props.name]);

        if (props.name === "Home" && location.pathname === '/') {
            setIcon(iconMap[`${props.name}-active`]);
        } else if (`/${props.name.toLowerCase()}` === location.pathname && !(props.name === "add")) {
            setIcon(iconMap[`${props.name}-active`]);
        }

    }, [props.name, iconMap, location.pathname]);

    return (
        <Link to={props.name === "Home" ? "/" : `/${props.name.toLowerCase()}`}>
            <div className="flex flex-col items-center justify-center">
                {
                    props.name === 'add' ?
                        <div className="bg-primary-green rounded-md h-8 w-8 grid items-center justify-center">
                            <IconContext.Provider value={{color: "white", size: "2em"}}>
                                {icon}
                            </IconContext.Provider>
                        </div>
                        :
                        <IconContext.Provider value={{color: "#02542D", size: "2em"}}>
                            {icon}
                        </IconContext.Provider>
                }
                {
                    props.name !== 'add' ?
                        <p className="text-primary-green text-sm">
                            {props.name}
                        </p>
                        : <></>
                }
            </div>
        </Link>
    )
}

const MobileNav = () => {

    const [colorTopBar, setColorTopBar] = useState(false);
    const location = useLocation();

    function controlTopBarColor() {
        setColorTopBar(window.scrollY > 0);
    }

    useEffect(() => {
        if (location.pathname === "/") {
            window.addEventListener('scroll', controlTopBarColor);
            return () => {
                window.removeEventListener('scroll', controlTopBarColor);
            }
        }
        setColorTopBar(true);
    }, [location.pathname]);

    return (
        <div>
            <div className={`p-4 z-50 fixed top-0 left-0 w-full ${colorTopBar ? "bg-white shadow-lg" : ""} duration-150 transition-all`}>
                <p className={`text-2xl font-medium ${colorTopBar ? "text-primary-green" : "text-white"} duration-200 transition-all`}>Agri<span className="text-primary-green">X</span></p>
            </div>
            <div
                className="fixed bottom-0 z-50 bg-white grid grid-cols-5 items-center w-full py-2 shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)]">
                <MobileNavItem
                    name="Home"
                />
                <MobileNavItem
                    name="Market"
                />
                <MobileNavItem
                    name="add"
                />
                <MobileNavItem
                    name="Connections"
                />
                <MobileNavItem
                    name="Profile"
                />
            </div>
        </div>

    )
};

export default MobileNav;