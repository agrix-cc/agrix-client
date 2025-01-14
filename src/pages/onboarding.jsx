import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Onboarding = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            return navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <BackToHome/>
            <div className="welcomeHero sm:grid sm:place-content-center">
                <div className="relative top-1/2 sm:max-w-md">
                    <WelcomeSlider/>
                </div>
            </div>
            <div className="p-4 flex justify-center items-center w-full">
                <div className="w-full sm:max-w-sm">
                    <div className="mb-4">
                        <Button
                            primary={false}
                            label='Sign in'
                            link='/signin'
                        />
                    </div>
                    <div className="mb-4">
                        <Button
                            primary={true}
                            label='Sign up'
                            link='/signup'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;