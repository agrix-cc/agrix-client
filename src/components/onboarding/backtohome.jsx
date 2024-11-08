import {IoArrowBack} from "react-icons/io5";
import {Link} from "react-router-dom";

const BackToHome = () => {
    return(
        <Link to="/"
              className="absolute z-10 bg-white text-primary-green px-4 py-2 rounded-full text-lg font-medium shadow-xl active:shadow-md active:translate-y-0.5 transition-all duration-300 m-4 flex justify-between items-center gap-2">
            <IoArrowBack/>
            Back to home
        </Link>
    )
};

export default BackToHome;