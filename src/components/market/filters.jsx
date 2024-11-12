import React, {useState} from "react";
import {createListCollection} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "../ui/select";
import {districts, citiesByDistrict} from "../../assets/citiesByDistrict";

const Filters = (props) => {
    const {params, setParams} = props;

    const districtOptions = createListCollection({
        items: [{label: "All", value: "all"}, ...districts.map(district => ({label: district, value: district}))]
    });

    return (
        <React.Fragment>
            <FilterDropDown
                onChange={value => setParams(params => ({...params, type: value}))}
                value={params.type}
                filterOptions={listingTypes} title="Type"/>
            <FilterDropDown
                onChange={value => setParams(params => ({...params, sort: value}))}
                value={params.sort}
                filterOptions={listingSort} title="Sort by"/>
            <FilterDropDown
                onChange={value => setParams(params => ({...params, district: value, city: ["all"]}))}
                value={params.district}
                filterOptions={districtOptions} title="District"/>
            <FilterDropDown
                onChange={value => setParams(params => ({...params, city: value}))}
                value={params.city}
                filterOptions={citiesByDistrict[params.district] ? createListCollection({
                    items: [{label: "All", value: "all"}, ...citiesByDistrict[params.district].cities.map(city => ({
                        value: city,
                        label: city
                    }))]
                }) : createListCollection({
                    items: [{label: "All", value: "all"}]
                })}
                title="City"/>
        </React.Fragment>
    )
};

const FilterDropDown = (props) => {
    const {value, onChange, title, filterOptions} = props;
    const [selectValue, setSelectValue] = useState(value);

    return (
        <SelectRoot
            collection={filterOptions}
            size="sm" className="border border-gray-300 rounded px-2 max-w-xs"
            value={selectValue}
            onValueChange={(e) => {
                setSelectValue(e.value);
                onChange(e.value);
            }}>
            <SelectTrigger>
                <SelectValueText placeholder={title}/>
            </SelectTrigger>
            <SelectContent className="z-[1500]">
                {filterOptions.items.map((option) => (
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
        {label: "All", value: "all"},
        {label: "Crops", value: "crop"},
        {label: "Transport Services", value: "transport"},
        {label: "Storage Services", value: "storage"},
    ],
});
const listingSort = createListCollection({
    items: [
        {label: "Latest", value: "latest"},
        {label: "Oldest", value: "oldest"},
        {label: "Price low to high", value: "price-low"},
        {label: "Price high to low", value: "price-high"},
    ],
});

export default Filters;