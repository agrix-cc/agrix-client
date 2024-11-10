import MobileNav from "../components/mobileNav";
import {Button} from "../components/ui/button";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleLogOut = () => {
        localStorage.removeItem("jwtToken");
        navigate('/');
    };

    useEffect(() => {
        const token = jwtDecode(localStorage.getItem("jwtToken"));
        setUser(token.user);
    }, [user]);

    return(
        <div>
            <div className="w-full h-dvh flex justify-center items-center">
                <div>
                    <ul className="max-w-sm">
                        {
                            Object.keys(user).map(key => (
                                <li key={key}>{key} : {user[key]}</li>
                            ))
                        }
                    </ul>
                    <Button
                        className="border border-gray-400 rounded px-4 py-2"
                        onClick={() => handleLogOut()}>
                        Log out
                    </Button>
                </div>
            </div>
            <MobileNav/>
        </div>
    )
};

export default Profile;