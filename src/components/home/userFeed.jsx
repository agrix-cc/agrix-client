import Post from "../listingPost";

const UserFeed = () => {
    return (
        <div className="overflow-hidden py-2 md:ps-[10vw] md:pe-[10vw]">
            <div className="mb-2 flex justify-between items-start px-4">
                <p className="font-medium md:text-xl md:font-normal">Feed</p>
            </div>
            {
                <div className="md:grid md:place-content-center">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            }
        </div>
    )
}

export default UserFeed;