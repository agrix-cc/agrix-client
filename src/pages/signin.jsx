import {Link, useNavigate,  } from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";
import InputField from "../components/onboarding/inputField";
import {useState} from "react";
import axios from "axios";
// import {jwtDecode} from "jwt-decode";

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
        await axios.post('http://127.0.0.1:5050/signin', data)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                setError('');
                navigate('/');
                // const decoded = jwtDecode(token);
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
                <div className="relative">
                    <WelcomeSlider/>
                </div>
            </div>
            <div className="px-4 flex justify-center items-center w-full mt-11">
                <div className="w-full">
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;