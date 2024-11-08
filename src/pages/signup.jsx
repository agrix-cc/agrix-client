import {Link} from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
    SelectLabel
} from "../components/ui/select";
import {createListCollection} from "@chakra-ui/react";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";
import InputField from "../components/onboarding/inputField";

const SignUp = () => {
    return (
        <div className="h-dvh relative">
            <BackToHome/>
            <div
                className="signin-header">
                <div className="relative">
                    <WelcomeSlider/>
                </div>
            </div>
            <div className="px-4 flex justify-center items-center w-full mt-11">
                <div className="w-full">
                    <form>
                        <div className="mb-4 flex justify-between gap-4">
                            <InputField
                                label="First name"
                                id="first-name"
                                name="first-name"
                                placeholder="Your first name"
                                styles=""
                            />
                            <InputField
                                label="Last name"
                                id="last-name"
                                name="last-name"
                                placeholder="Your last name"
                                styles=""
                            />
                        </div>
                        <div className="mb-4">
                            <ProfileType options={profileTypes} title="Select a profile type" label="Profile type"/>
                        </div>
                        <InputField
                            label="Email Address"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                        />
                        <InputField
                            label="Password"
                            id="password"
                            name="password"
                            placeholder="********"
                            type="password"
                        />
                        <div className="mb-4">
                            <Button
                                link="/signup"
                                label="Sign up"
                                primary={true}
                            />
                        </div>
                        <p className="text-center text-gray-500">
                            Already have an account?
                            <Link to="/signin" className="font-medium text-black"> Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ProfileType = (props) => {
    return (
        <SelectRoot collection={props.options} size="sm">
            <SelectLabel className="text-[16px] font-normal">{props.label}</SelectLabel>
            <SelectTrigger className="border border-gray-300 rounded-full px-4 py-1">
                <SelectValueText placeholder={props.title}/>
            </SelectTrigger>
            <SelectContent>
                {props.options.items.map((option) => (
                    <SelectItem item={option} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}

const profileTypes = createListCollection({
    items: [
        {label: "Farmer", value: "farmer"},
        {label: "Transport", value: "transport"},
        {label: "Storage", value: "storage"},
        {label: "Seller", value: "seller"},
    ],
});

export default SignUp;