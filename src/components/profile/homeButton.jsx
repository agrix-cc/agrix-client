import {IoIosArrowForward} from "react-icons/io";

const HomeButton = (props) => {

    const {label, icon, className = "text-primary-green text-2xl", onClick, isActive = false, isLogOut = false} = props;

    return (
        <button
            onClick={onClick}
            className={`${isActive ? 'bg-mint-green' : ''} ${isLogOut ? 'hover:bg-red-100':''} md:rounded-full flex justify-between w-full active:bg-zinc-200 p-4 duration-300 transition-all`}>
            <div className="flex justify-start gap-4 items-center">
                <div className={className}>
                    {icon}
                </div>
                <p>{label}</p>
            </div>
            {!isLogOut &&
                <IoIosArrowForward className="text-2xl md:hidden"/>
            }
        </button>
    )
}

export default HomeButton;