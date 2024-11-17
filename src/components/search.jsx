import {FiSearch} from "react-icons/fi";

const Search = (props) => {
    const {value, onChange} = props;

    return (
        <div className="flex items-center gap-2 rounded-full px-5 py-3 bg-white shadow-lg max-w-[594px] w-full">
            <FiSearch/>
            <input
                type="text"
                placeholder="Search anything..."
                id="search"
                className="focus:outline-none w-full"
                value={value || ""}
                onChange={onChange}/>
        </div>
    )
}

export default Search;