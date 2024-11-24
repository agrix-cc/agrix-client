import {useNavigate} from 'react-router-dom';
import {Avatar} from "./ui/avatar";

const UserCard = (props) => {
    const {user} = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/user/${user.id}`); // Navigate to user profile page
    };

    return (
        <div
            className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-center text-center w-full max-w-xs md:max-w-sm mx-auto cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Profile Picture */}
            <Avatar
                src={user.image}
                name={user.first_name + " " + user.last_name}
                size="2xl"
            />
            {/* Name */}
            <h2 className="text-xl font-bold text-gray-800">{user.first_name + " " + user.last_name}</h2>
            {/* Category */}
            <p className="text-sm text-gray-500 mt-1">{user.profile_type}</p>
        </div>
    );
};

export default UserCard;
