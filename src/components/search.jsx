import {FiSearch} from "react-icons/fi";

const Search = (props) => {
    const {search, setSearch, setParams} = props;

    return (
        <div className="flex items-center gap-2 rounded-full px-5 py-3 bg-white shadow-lg max-w-[594px] w-full">
            <FiSearch/>
            <input
                type="text"
                placeholder="Search anything..."
                id="search"
                className="focus:outline-none w-full"
                value={search}
                onChange={(e) => {
                    setParams(params => ({...params, offset: 0}));
                    setSearch(e.target.value)
                }}/>
        </div>
    )
}

export default Search;