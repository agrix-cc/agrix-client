import {Avatar} from "./ui/avatar";
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const DesktopNav = (props) => {
    let decoded;
    let role;
    const token = localStorage.getItem('jwtToken');
    if (token) {
        decoded = jwtDecode(token);
        role = decoded.user.user_role;
    }
    const {colorTopBar, location, user} = props;
    const navigate = useNavigate();
    return (
        <div className="w-full justify-around items-center relative hidden md:flex">
            <Link to="/"
                  className={`text-2xl font-medium ${colorTopBar ? "text-primary-green" : "text-white"} duration-200 transition-all`}>Agri<span
                className="text-primary-green">X</span></Link>
            <div
                className="bg-white rounded-full grid grid-cols-3 items-center gap-2 place-content-center overflow-hidden">
                <Link to="/"
                      className={`rounded-full duration-150 transition-all hover:bg-mint-green ${location === "/" ? 'bg-primary-green' : ''}`}>
                    <p className={`px-4 py-2 justify-self-center ${location === "/" ? 'text-white' : 'text-primary-green'} hover:text-primary-green`}>Home</p>
                </Link>
                <Link to="/market"
                      className={`rounded-full duration-150 transition-all hover:bg-mint-green ${location === "/market" ? 'bg-primary-green' : ''}`}>
                    <p className={`px-4 py-2 justify-self-center ${location === "/market" ? 'text-white' : 'text-primary-green'} hover:text-primary-green`}>Market</p>
                </Link>
                <Link to="/flashsale"
                      className={`rounded-full duration-150 transition-all hover:bg-mint-green ${location === "/flashsale" ? 'bg-primary-green' : ''}`}>
                    <p className={`px-4 py-2 justify-self-center ${location === "/flashsale" ? 'text-white' : 'text-primary-green'} hover:text-primary-green`}>Flash Sales</p>
                </Link>
            </div>
            <button
                onClick={
                    role === "admin" ?
                        () => navigate('admin/home') : () => navigate('/dashboard/profile', {state: {user: user}})
                }>
                {user &&
                    <Avatar name={user.first_name + " " + user.last_name} src={user.image}/>
                }
                {!user &&
                    <Avatar name="Guest User"/>
                }
            </button>
        </div>
    )
};

export default DesktopNav;