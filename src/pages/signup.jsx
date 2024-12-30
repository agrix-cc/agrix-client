import {Link, useNavigate} from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import {
    SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText, SelectLabel
} from "../components/ui/select";
import {createListCollection} from "@chakra-ui/react";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";
import InputField from "../components/onboarding/inputField";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Spacer from "../components/spacer";

const SignUp = () => {

    const navigate = useNavigate();

    const isFirstRender = useRef(true);

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profile_type: ""
    });

    const [error, setError] = useState({
        first_name: {
            isActive: false,
            message: "First name is required"
        },
        last_name: {
            isActive: false,
            message: "Last name is required"
        },
        email: {
            isActive: false,
            message: "Invalid email address"
        },
        password: {
            isActive: false,
            message: "Password too weak. Use at least 8 characters with letters, numbers, and symbols."
        },
        confirmPassword: {
            isActive: false,
            message: "Password is not matching"
        },
        profile_type: {
            isActive: false,
            message: "Please select you profile type"
        },
        serverResponse: {
            message: ""
        }
    })

    const handleChange = (e) => {
        isFirstRender.current = false;
        setData({...data, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        let isValid = true;
        let newStateError = {...error};

        // Validate first name
        if (!data.first_name) {
            newStateError.first_name.isActive = true;
            isValid = false;
        } else {
            newStateError.first_name.isActive = false;
        }

        // Validate last name
        if (!data.last_name) {
            newStateError.last_name.isActive = true;
            isValid = false;
        } else {
            newStateError.last_name.isActive = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            newStateError.email.isActive = true;
            isValid = false;
        } else {
            newStateError.email.isActive = false;
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
        if (!passwordRegex.test(data.password)) {
            newStateError.password.isActive = true;
            isValid = false;
        } else {
            newStateError.password.isActive = false;
        }

        // Validate confirm password
        if (data.confirmPassword !== data.password) {
            newStateError.confirmPassword.isActive = true;
            isValid = false;
        } else {
            newStateError.confirmPassword.isActive = false;
        }

        // Validate profile type
        if (!data.profile_type) {
            newStateError.profile_type.isActive = true;
            isValid = false;
        } else {
            newStateError.profile_type.isActive = false;
        }

        setError(newStateError);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return
        }
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, data)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                navigate('/');
            })
            .catch(err => {
                if (err.response) {
                    setError({...error, serverResponse: {message: err.response.data.message}});
                } else {
                    setError({...error, serverResponse: {message: err.message}});
                }
            })
    };

    // Validate password on input change
    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }
        setError(prevError => {
            // Temporary object to hold error
            const passwordError = {...prevError.password};
            // Check password strength
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
            // Set is active to be false when password is not match with regex
            passwordError.isActive = !passwordRegex.test(data.password);
            // update error state
            return {...prevError, password: passwordError};
        });
    }, [data.password]);

    // Validate confirm password on input change
    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }
        setError(prevError => {
            // Temporary object to hold error
            const confirmPasswordError = {...prevError.confirmPassword};
            // Set is active to be false when confirm password and password doesn't match
            confirmPasswordError.isActive = data.confirmPassword !== data.password;
            // update error state
            return {...prevError, confirmPassword: confirmPasswordError};
        });
    }, [data.confirmPassword, data.password]);

    return (<div className="h-dvh relative">
        <BackToHome/>
        <div
            className="signin-header">
            <div className="relative sm:max-w-sm">
                <WelcomeSlider/>
            </div>
        </div>
        <div className="px-4 flex justify-center items-center w-full mt-11">
            <div className="w-full sm:max-w-sm">
                <form>
                    <div className="mb-4 flex justify-between gap-4">
                        <div>
                            <InputField
                                label="First name"
                                id="first_name"
                                name="first_name"
                                placeholder="Your first name"
                                type="text"
                                value={data.first_name}
                                styles=""
                                onChange={(e) => handleChange(e)}
                                error={error.first_name.isActive}
                                autoComplete="given-name"
                            />
                            {error.first_name.isActive ?
                                <p className="text-center text-red-500 font-medium">{error.first_name.message}</p> : ""}
                        </div>

                        <div>
                            <InputField
                                label="Last name"
                                id="last_name"
                                name="last_name"
                                placeholder="Your last name"
                                type="text"
                                value={data.last_name}
                                styles=""
                                onChange={(e) => handleChange(e)}
                                error={error.last_name.isActive}
                                autoComplete="family-name"
                            />
                            {error.last_name.isActive ?
                                <p className="text-center text-red-500 font-medium">{error.last_name.message}</p> : ""}
                        </div>

                    </div>
                    <div className="mb-4">
                        <ProfileType
                            options={profileTypes}
                            onChange={(value) => {
                                setData({...data, profile_type: value});
                            }}
                            error={error.profile_type.isActive}
                            title="Select a profile type"
                            label="Profile type"/>
                        {error.profile_type.isActive ?
                            <p className="text-center text-red-500 font-medium">{error.profile_type.message}</p> : ""}
                    </div>
                    <div className="mb-4">
                        <InputField
                            label="Email Address"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                            styles=""
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                            error={error.email.isActive}
                            autoComplete="email"
                        />
                        {error.email.isActive ?
                            <p className="text-center text-red-500 font-medium">{error.email.message}</p> : ""}
                    </div>
                    <div className="mb-4">
                        <InputField
                            label="Password"
                            id="password"
                            name="password"
                            placeholder="********"
                            type="password"
                            styles=""
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => {
                                handleChange(e);
                                if (data.password !== data.confirmPassword) {
                                    setError({
                                        ...error, confirmPassword: {...error.confirmPassword, isActive: true}
                                    });
                                } else {
                                    setError({
                                        ...error, confirmPassword: {...error.confirmPassword, isActive: false}
                                    });
                                }
                            }}
                            error={error.password.isActive}
                        />
                        {error.password.isActive ?
                            <p className="text-center text-red-500 font-medium">{error.password.message}</p> : ""}
                    </div>
                    <div className="mb-4">
                        <InputField
                            label="Confirm password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="********"
                            type="password"
                            styles=""
                            value={data.confirmPassword}
                            autoComplete="new-password"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            error={error.confirmPassword.isActive}
                        />
                        {error.confirmPassword.isActive ?
                            <p className="text-center text-red-500 font-medium">{error.confirmPassword.message}</p> : ""}
                    </div>
                    <div className="pt-2">
                        <Button
                            label="Sign up"
                            primary={true}
                            onClick={(e) => handleSubmit(e)}
                        />
                    </div>
                    {error.serverResponse.message ? <p className="text-center text-red-500 font-medium mt-2">
                        {error.serverResponse.message}
                    </p> : ""}
                    <p className="text-center text-gray-500 mt-4">
                        Already have an account?
                        <Link to="/signin" className="font-medium text-black"> Sign in</Link>
                    </p>
                </form>
                <Spacer/>
            </div>
        </div>
    </div>)
}

const ProfileType = (props) => {
    return (<SelectRoot
        collection={props.options}
        onValueChange={(select) => props.onChange(select.value[0])}
        size="sm">
        <SelectLabel className="text-[16px] font-normal">{props.label}</SelectLabel>
        <SelectTrigger
            className={`border ${props.error ? 'border-red-500' : 'border-lime-green'} border-opacity-50 rounded-full px-4 py-1`}>
            <SelectValueText placeholder={props.title}/>
        </SelectTrigger>
        <SelectContent>
            {props.options.items.map((option) => (<SelectItem item={option} key={option.value}>
                {option.label}
            </SelectItem>))}
        </SelectContent>
    </SelectRoot>);
}

const profileTypes = createListCollection({
    items: [{label: "Farmer", value: "farmer"}, {label: "Transport", value: "transport"}, {
        label: "Storage", value: "storage"
    }, {label: "Seller", value: "seller"},{label: "Manufacturer", value: "manufacturer"}],
});

export default SignUp;