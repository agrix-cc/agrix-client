import {Skeleton, SkeletonText} from "./ui/skeleton";

const LoadingCards = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {
                Array.from(Array(6), (_, i) => {
                    return(
                        <div key={i} className="rounded-lg shadow-lg bg-white min-h-72">
                            <Skeleton height="160px"/>
                            <div className="px-2 py-4">
                                <SkeletonText noOfLines={3}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default LoadingCards;