import {Avatar} from "../ui/avatar";

const ProfileOverview = (props) => {
    const {
        user = {
            first_name: "",
            last_name: "",
            email: "",
            profile_pic: null,
            district: "",
            city: "",
            profile_type: ""
        }
    } = props;
    return (
        <div>
            <p className="text-2xl">Hello {user.first_name}!</p>
            <div className="flex gap-4 items-center py-4">
                <Avatar
                    src={user.image}
                    size="2xl"
                    name={user.first_name + " " + user.last_name}/>
                <div>
                    <p className="capitalize">{user.first_name} {user.last_name}</p>
                    <p>{user.email.length > 19 ? user.email.substring(0, 19) + "..." : user.email}</p>
                    <p>{user.district}</p>
                    <p className="capitalize">{user.profile_type}</p>
                </div>
            </div>
        </div>
    )
};

export default ProfileOverview;