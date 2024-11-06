import Post from "../listingPost";

const UserFeed = () => {
    return (
        <div className="overflow-hidden py-2">
            <div className="mb-2 flex justify-between items-start px-4">
                <p className="font-medium">Feed</p>
            </div>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}

export default UserFeed;