"use client"
import {createListCollection} from "@chakra-ui/react"
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "../ui/select";

import Search from "../search";

const MarketHeader = () => {
    return (
        <div className="mt-16 p-4">
            <p className="text-2xl font-medium mb-2">Market</p>
            <Search/>
            <div className="flex justify-between gap-2 mt-4">
                <FilterDropDown filterOptions={listingTypes} title="Select type"/>
                <FilterDropDown filterOptions={listingSort} title="Sort by"/>
                <FilterDropDown filterOptions={listingLocation} title="Location"/>
            </div>
        </div>
    )
};

const FilterDropDown = (props) => {
    return (
        <SelectRoot collection={props.filterOptions} size="sm" className="border border-gray-300 rounded px-2">
            <SelectTrigger>
                <SelectValueText placeholder={props.title}/>
            </SelectTrigger>
            <SelectContent>
                {props.filterOptions.items.map((option) => (
                    <SelectItem item={option} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}

const listingTypes = createListCollection({
    items: [
        { label: "Crops", value: "crop" },
        { label: "Transport Services", value: "transport" },
        { label: "Storage Services", value: "storage" },
    ],
});
const listingSort = createListCollection({
    items: [
        { label: "Default", value: "price" },
        { label: "Date added", value: "date" },
        { label: "Price low to high", value: "price-low" },
        { label: "Price high to low", value: "price-high" },
    ],
});
const listingLocation = createListCollection({
    items: [
        { label: "Colombo", value: "colombo" },
        { label: "Kandy", value: "kandy" },
        { label: "Anuradapura", value: "anuradapura" },
        { label: "Galle", value: "galle" },
    ],
});

export default MarketHeader;