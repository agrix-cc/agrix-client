import React from "react";
import Calendar from "react-calendar";

const AvailabilityCalender = (props) => {

    const {
        onChange,
        showNeighboringMonth = true,
        minDate = new Date(),
        maxDate = new Date(`${new Date().getFullYear() + 1}/12/31`),
        minDetail = "year",
        disabledDates=[]
    } = props;

    const disableDatesClass = ({date, view}) => {
        if (!disabledDates) return null;
        return disabledDates.some(disabledDate => view === "month" && date.getFullYear() === disabledDate.getFullYear() && date.getMonth() === disabledDate.getMonth() && date.getDate() === disabledDate.getDate()) ? 'unavailable-date' : null;
    }

    const disableDatesInput = ({date, view}) => {
        if (!disabledDates) return null;
        return disabledDates.some(disabledDate => view === "month" && date.getFullYear() === disabledDate.getFullYear() && date.getMonth() === disabledDate.getMonth() && date.getDate() === disabledDate.getDate());
    }

    return (
        <Calendar
            onChange={onChange}
            showNeighboringMonth={showNeighboringMonth}
            minDate={minDate}
            maxDate={maxDate}
            tileClassName={disableDatesClass}
            tileDisabled={disableDatesInput}
            minDetail={minDetail}
        />
    )
};

export default AvailabilityCalender;