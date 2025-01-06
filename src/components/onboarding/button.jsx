import {useNavigate} from "react-router-dom";

const Button = ({type="button", onClick, link, primary, label, className="", id=""}) => {

    const navigate = useNavigate();

    return (
        <button
            id={id}
            type={type}
            onClick={onClick ? (e) => onClick(e) : () => navigate(link)}
            className={`rounded-full py-2 ${primary ? "bg-primary-green text-mint-green" : "bg-mint-green text-primary-green"} text-lg font-medium w-full block text-center shadow-xl active:shadow-md active:translate-y-0.5 transition-all duration-300 ${className}`}>
            {label}
        </button>
    );
};

export default Button;