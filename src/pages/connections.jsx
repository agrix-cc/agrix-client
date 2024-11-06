import {EmptyState} from "../components/ui/empty-state";
import MobileNav from "../components/mobileNav";
import { FaUsers } from "react-icons/fa6";

const Connections = () => {
    return(
        <div>
            <MobileNav />
            <div className="h-dvh flex justify-center items-center">
                <EmptyState
                    icon={<FaUsers/>}
                    title="This feature will be available soon."
                    description="Explore our products and services."
                />
            </div>
        </div>
    )
};

export default Connections;