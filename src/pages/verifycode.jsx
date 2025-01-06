import {Link, useNavigate, useLocation} from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import InputField from "../components/onboarding/inputField";
import {useState, useEffect} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {email} = location.state || {};

    const [data, setData] = useState({
        email: "",
        verifycode: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (email) {
            setData((prevData) => ({...prevData, email}));
        }
    }, [email]);

    const verifyCode = async () => {
        if (!data.verifycode || data.verifycode.trim() === "") {
            alert("Verification code is required.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/verify-code`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data.email,
                        verifycode: data.verifycode,
                    }), // Send email and verifycode
                }
            );

            const responseData = await response.json();

            if (responseData.success) {
                alert("Verification successful!");
                navigate("/passwordreset", {state: {email: data.email}}); // Redirect to the reset password page
            } else {
                setError(responseData.message || "Verification failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error verifying the code.");
        }
    };

    return (
        <div>
            <div className="signin-header">
                <div className="relative sm:max-w-sm">
                    <WelcomeSlider/>
                </div>
            </div>
            <div className="px-4 flex justify-center items-center w-full mt-11">
                <div className="w-full sm:max-w-sm">
                    <InputField
                        label="Verfication Code"
                        id="verifycode"
                        name="verifycode"
                        placeholder="Enter your Verification Code"
                        type="text"
                        value=""
                        onChange={(e) => handleChange(e)}
                    />

                    <Button
                        id="verifyBtn"
                        className="flex-1 bg-gray-500 mr-3"
                        primary={true}
                        label="Verify"
                        onClick={verifyCode}
                    />

                    <p className="text-center mt-2 mb-2 font-medium text-blue-900 hover:cursor-pointer">
                        <Link to="/signin">Cancel</Link>
                    </p>

                    {error ? (
                        <p id="errorMsg" className="text-center text-red-500 font-medium">{error}</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;
