import {Avatar} from "./ui/avatar";

const ProfileBadge = (props) => {
    const {name = "Anonymous User", image, type} = props;
    return (
        <div className="flex justify-start items-center gap-2">
            <div>
                <Avatar name={name} src={image}/>
            </div>
            <div>
                <p>{name}</p>
                <p className="text-gray-500 capitalize">{type}</p>
            </div>
        </div>
    )
}

export default ProfileBadge;