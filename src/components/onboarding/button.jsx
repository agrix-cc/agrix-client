import {Link} from "react-router-dom";

const Button = (props) => {
    return (
        <Link to={props.link}
              className={`rounded-full py-2 ${props.primary ? "bg-primary-green text-mint-green" : "bg-mint-green text-primary-green"} text-lg font-medium w-full block text-center shadow-xl active:shadow-md active:translate-y-0.5 transition-all duration-300`}>
            {props.label}
        </Link>
    );
};

export default Button;