import {Link} from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";
import InputField from "../components/onboarding/inputField";

const SignIn = () => {
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
                    <form>
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
                        <div className="mb-4 pt-2">
                            <Button
                                primary={true}
                                label='Sign in'
                                link='/signin'
                            />
                        </div>
                        <p className="text-center text-gray-500">Don't have an account? <Link to="/signup" className="font-medium text-black"> Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;