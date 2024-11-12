import {Button} from "../ui/button";
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import {FaFilter} from "react-icons/fa";
import Filters from "./filters";

const FilterMenu = (props) => {

    const {params, setParams} = props;

    return (
        <DrawerRoot>
            <DrawerBackdrop/>
            <div className="px-4 flex justify-end items-center">
                <DrawerTrigger asChild>
                    <Button
                        className="px-4 py-2 border-gray-400 border mt-4">
                        <FaFilter/> Apply Filters
                    </Button>
                </DrawerTrigger>
            </div>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle
                        className="text-xl font-medium">
                        Apply Filters
                    </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                    <p>
                        You can filter products by location, listing type, price, and added date.
                    </p>
                    <div className="my-4 grid gap-4">
                        <Filters setParams={setParams} params={params}/>
                    </div>
                </DrawerBody>
                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button
                            className="px-4 py-2 border-gray-400 border mt-4 font-medium">
                            Close
                        </Button>
                    </DrawerActionTrigger>
                    <DrawerActionTrigger asChild>
                        <Button
                            onClick={() => {
                                setParams({
                                    city: [],
                                    district: [],
                                    sort: [],
                                    type: [],
                                })
                            }}
                            className="px-4 py-2 border-gray-400 border mt-4 font-medium text-white bg-primary-green">
                            Reset
                        </Button>
                    </DrawerActionTrigger>

                </DrawerFooter>
                <DrawerCloseTrigger/>
            </DrawerContent>
        </DrawerRoot>
    )
}

export default FilterMenu;
