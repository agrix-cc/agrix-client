import Search from "../search";
import {useMediaQuery} from "@mui/material";
import FilterMenu from "./filterMenu";
import Filters from "./filters";
import {RxReset} from "react-icons/rx";


const MarketHeader = (props) => {
    const {params, setParams, search, setSearch} = props;
    const isDesktop = useMediaQuery('(min-width: 960px)');


    return (
        <div className="mt-16 sticky top-4 bg-white pb-4">
            <p className="text-2xl font-medium mb-2 pt-4 px-4">Market</p>
            <div className="px-4">
                <Search search={search} setSearch={setSearch} setParams={setParams}/>
            </div>
            {
                isDesktop ?
                    <div className="flex w-full justify-between items-center mt-4">
                        <div className="grid grid-cols-4 gap-2 px-4">
                            {/* key is to rerender the select components otherwise its internal states will remain the same */}
                            <Filters key={JSON.stringify(params)} setParams={setParams} params={params}/>
                        </div>
                        <button
                            onClick={() => {
                                setParams({
                                    city: [],
                                    district: [],
                                    sort: [],
                                    type: [],
                                    offset: 0
                                })
                                setSearch("");
                            }}
                            className="flex gap-2 items-center">
                            <RxReset/>
                            Rest Filters
                        </button>
                    </div>
                    : <FilterMenu setParams={setParams} params={params}/>
            }
        </div>
    )
};

export default MarketHeader;