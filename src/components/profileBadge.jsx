const ProfileBadge = (props) => {

    return (
        <div className="flex justify-start items-center gap-2">
            <div className="w-11 h-11 rounded-full overflow-hidden">
                <img src="assets/profile-pic.webp" alt="" className="w-full h-full object-cover"/>
            </div>
            <div>
                <p>Tom Davis</p>
                {
                    props.profileType ? <p className="text-gray-500">Farmer</p> : ""
                }
            </div>
        </div>
    )
}

export default ProfileBadge;