import React from 'react';
import {
    ProgressBar,
    ProgressRoot,
    ProgressValueText,
} from "../ui/progress";

const ListingProgressBar = () => {
    return(
        <ProgressRoot defaultValue={60} maxW="sm">
            <div className="flex flex-col gap-2">
                <ProgressBar className="rounded-full" colorPalette="green"/>
                <div className="self-end">
                    <ProgressValueText className="text-gray-500">40% Remaining</ProgressValueText>
                </div>
            </div>
        </ProgressRoot>
    )
};

export default ListingProgressBar;