import {Avatar} from "../ui/avatar";

const ProfileOverview = (props) => {
    const {user = {
        first_name: "Dilanka",
        last_name: "Yasuru",
        email: "dilanka@gmail.com",
        profile_pic: null,
        district: "Colombo",
        city: "Piliyandala",
        profile_type: "farmer"
    }} = props;
    return (
        <div>
            <p className="text-2xl">Hello {user.first_name}!</p>
            <div className="flex gap-4 items-center py-4">
                <Avatar
                    src={user.image}
                    size="2xl"
                    name={user.first_name+" "+user.last_name}/>
                <div>
                    <p className="capitalize">{user.first_name} {user.last_name}</p>
                    <p>{user.email}</p>
                    <p>{user.district}</p>
                    <p className="capitalize">{user.profile_type}</p>
                </div>
            </div>
        </div>
    )
};

export default ProfileOverview;