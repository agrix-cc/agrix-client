import {Avatar} from "./ui/avatar";
import {Link} from "react-router-dom";

const DesktopNav = (props) => {
    const {colorTopBar, location} = props;
    return(
        <div className="w-full justify-around items-center relative hidden md:flex">
            <p className={`text-2xl font-medium ${colorTopBar ? "text-primary-green" : "text-white"} duration-200 transition-all`}>Agri<span
                className="text-primary-green">X</span></p>
            <div className="bg-white rounded-full grid grid-cols-3 items-center gap-2 place-content-center overflow-hidden">
                <Link to="/"
                      className={`rounded-full duration-150 transition-all hover:bg-mint-green ${location === "/" ? 'bg-primary-green' : ''}`}>
                    <p className={`px-4 py-2 justify-self-center ${location === "/" ? 'text-white' : 'text-primary-green'} hover:text-primary-green`}>Home</p>
                </Link>
                <Link to="/market" className={`rounded-full duration-150 transition-all hover:bg-mint-green ${location === "/market" ? 'bg-primary-green' : ''}`}>
                    <p className={`px-4 py-2 justify-self-center ${location === "/market" ? 'text-white' : 'text-primary-green'} hover:text-primary-green`}>Market</p>
                </Link>
                <Link to="/connections" className={`rounded-full duration-150 transition-all hover:bg-mint-green ${location === "/connections" ? 'bg-primary-green' : ''}`}>
                    <p className={`px-4 py-2 justify-self-center ${location === "/connections" ? 'text-white' : 'text-primary-green'} hover:text-primary-green`}>Connections</p>
                </Link>
            </div>
            <Link to="/profile">
                <Avatar name={"asd"} src={""}/>
            </Link>
        </div>
    )
};

export default DesktopNav;