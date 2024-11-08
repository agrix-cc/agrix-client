import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import BackToHome from "../components/onboarding/backtohome";

const Onboarding = () => {
    return (
        <div>
            <BackToHome/>
            <div className="welcomeHero">
                <div className="relative top-1/2">
                    <WelcomeSlider/>
                </div>
            </div>
            <div className="p-4 flex justify-center items-center w-full">
                <div className="w-full">
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