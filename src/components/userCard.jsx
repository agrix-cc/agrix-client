import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
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
            <img
                src={user.profilePic}
                alt={`${user.name}'s profile`}
                className="w-20 h-20 rounded-full object-cover mb-4"
            />
            {/* Name */}
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            {/* Category */}
            <p className="text-sm text-gray-500 mt-1">{user.category}</p>
        </div>
    );
};

export default UserCard;
