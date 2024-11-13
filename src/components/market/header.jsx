import Search from "../search";
import {useMediaQuery} from "@mui/material";
import FilterMenu from "./filterMenu";
import Filters from "./filters";

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
                    <div className="flex gap-2 mt-4 px-4">
                        <Filters setParams={setParams} params={params}/>
                    </div>
                    : <FilterMenu setParams={setParams} params={params}/>
            }
        </div>
    )
};

export default MarketHeader;