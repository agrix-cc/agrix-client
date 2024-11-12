"use client"
import React from "react";
import {createListCollection} from "@chakra-ui/react"
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
        items: districts.map(district => ({label: district, value: district}))
    });

    return (
        <React.Fragment>
            <FilterDropDown
                onChange={(e) => setParams(params => ({...params, type: e.value}))}
                filterOptions={listingTypes} title="Type" value={params.type}/>
            <FilterDropDown
                onChange={(e) => setParams(params => ({...params, sort: e.value}))}
                filterOptions={listingSort} title="Sort by" value={params.sort}/>
            <FilterDropDown
                onChange={e => setParams({...params, district: e.value})}
                filterOptions={districtOptions} title="Disctrict" value={params.district}/>
            {
                params.district && citiesByDistrict[params.district] ?
                    <FilterDropDown
                        onChange={e => setParams({...params, city: e.value})}
                        filterOptions={createListCollection({
                            items: citiesByDistrict[params.district].cities.map(city => ({
                                value: city,
                                label: city
                            }))
                        })}
                        value={params.city}
                        title="City"/>
                    : <></>
            }
        </React.Fragment>
    )
};

const FilterDropDown = (props) => {
    return (
        <SelectRoot
            value={props.value}
            onValueChange={props.onChange}
            collection={props.filterOptions}
            size="sm" className="border border-gray-300 rounded px-2 max-w-xs">
            <SelectTrigger>
                <SelectValueText placeholder={props.title}/>
            </SelectTrigger>
            <SelectContent className="z-[1500]">
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