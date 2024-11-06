import {FiSearch} from "react-icons/fi";

const Search = () => {
    return (
        <div className="flex items-center gap-2 rounded-full px-5 py-3 bg-white shadow-lg max-w-[594px] w-full">
            <FiSearch/>
            <input type="text" placeholder="Search anything..." id="search" className="focus:outline-none w-full"/>
        </div>
    )
}

export default Search;