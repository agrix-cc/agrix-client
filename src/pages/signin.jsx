import {Link, useNavigate,} from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";
import InputField from "../components/onboarding/inputField";
import {useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const SignIn = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/signin`, data)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                const decoded = jwtDecode(token);
                setError('');
                if (decoded.user.user_role === "admin") {
                    navigate('/admin/home');
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError(error.message);
                }
            })
    };

    return (
        <div>
            <BackToHome/>
            <div
                className="signin-header">
                <div className="relative sm:max-w-sm">
                    <WelcomeSlider/>
                </div>
            </div>
            <div className="px-4 flex justify-center items-center w-full mt-11">
                <div className="w-full sm:max-w-sm">
                    <form onSubmit={e => handleSubmit(e)}>
                        <InputField
                            label="Email Address"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                            autoComplete="email"
                        />
                        <InputField
                            label="Password"
                            id="password"
                            name="password"
                            placeholder="********"
                            type="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                            autoComplete="current-password"
                        />
                        <div className="mb-2 pt-2">
                            <Button
                                id="signInBtn"
                                primary={true}
                                label='Sign in'
                                type="submit"
                            />
                        </div>
                        {
                            error ? <p className="text-center text-red-500 font-medium">{error}</p> : ""
                        }
                        <p className="text-center text-gray-500 mt-4">Don't have an account?
                            <Link to="/signup"
                                  className="font-medium text-black">
                                Sign up
                            </Link></p>
                            <p className="text-center text-gray-500 mt-4">
                            <Link to="/forgotpassword"
                                  id="forgot-password-link"
                                  className="font-medium text-blue-900">
                                Forgot Password?
                            </Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;