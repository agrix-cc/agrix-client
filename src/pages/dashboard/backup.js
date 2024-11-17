import listingTypes from "../../assets/listingTypes";
import SelectInput from "../../components/dashboard/addListing/components/selectInput";
import NumberInput from "../../components/dashboard/addListing/components/numberInput";
import CheckBox from "../../components/dashboard/addListing/components/checkBox";
import RangeInput from "../../components/dashboard/addListing/components/rangeInput";
import TextInput from "../../components/dashboard/addListing/components/textInput";
import DateInput from "../../components/dashboard/addListing/components/dateInput";
import TextArea from "../../components/dashboard/addListing/components/testArea";

const Backup = () => {
    return (
        <div className="grid gap-4">
            {listingType &&
                listingTypes[listingType].map(listingInput =>
                    <>
                        {listingInput.type === "select" &&
                            <SelectInput
                                key={listingInput.name}
                                items={listingInput.items}
                                placeholder={listingInput.placeholder}
                                label={listingInput.label}
                                onChange={(e) => {
                                    handleInputChange(listingInput.name, e);
                                }}
                                error={errors[listingInput.name]}
                                required={listingInput.required}
                            />
                        }
                        {listingInput.type === "number" &&
                            <NumberInput
                                hidden={listingInput.name === "delivery_fare_per_kg" && (additionalInfo.delivery_options === 'pickup' || !additionalInfo.delivery_options)}
                                key={listingInput.name}
                                label={listingInput.label}
                                min={listingInput.min}
                                required={listingInput.required}
                                onChange={(e) => {
                                    handleInputChange(listingInput.name, e);
                                }}
                                error={errors[listingInput.name]}
                            />
                        }
                        {listingInput.type === "checkbox" &&
                            <CheckBox
                                key={listingInput.name}
                                option={{
                                    name: listingInput.label,
                                    onCheck: (e) => {
                                        handleInputChange(listingInput.name, e);
                                    }
                                }}
                            />
                        }
                        {listingInput.type === "range" &&
                            <RangeInput
                                key={listingInput.name}
                                unit={listingInput.unit}
                                minLabel={listingInput.minLabel}
                                maxLabel={listingInput.maxLabel}
                                onUpperChange={(e) => {
                                    handleInputChange(`${listingInput.name}_max`, parseFloat(e));
                                    setErrors({...errors, temperature_control: ""});
                                }}
                                onLowerChange={(e) => {
                                    handleInputChange(`${listingInput.name}_min`, parseFloat(e));
                                    setErrors({...errors, temperature_control: ""});
                                }}
                                option={{
                                    name: listingInput.label,
                                    onCheck: (e) => {
                                        handleInputChange(listingInput.name, e);
                                    }
                                }}
                                error={errors.temperature_control}
                            />
                        }
                        {listingInput.type === "text" &&
                            <TextInput
                                key={listingInput.name}
                                label={listingInput.label}
                                placeholder={listingInput.placeholder}
                                onChange={(e) => {
                                    handleInputChange(listingInput.name, e);
                                }}
                                required={listingInput.required}
                                error={errors[listingInput.name]}
                            />
                        }
                        {listingInput.type === "date" &&
                            <DateInput
                                key={listingInput.name}
                                label={listingInput.label}
                                name={listingInput.name}
                                onChange={(e) => {
                                    handleInputChange(listingInput.name, e);
                                }}
                                required={listingInput.required}
                                error={errors[listingInput.name]}
                            />
                        }
                        {listingInput.type === "text" &&
                            <TextArea
                                key={listingInput.name}
                                label={listingInput.label}
                                placeholder={listingInput.placeholder}
                                onChange={(e) => {
                                    handleInputChange(listingInput.name, e);
                                }}
                                required={listingInput.required}
                                error={errors[listingInput.name]}
                            />
                        }
                    </>
                )
            }
        </div>
    )
}

const Extra = () => {
    return (
        <div className="grid gap-4">
            {
                listingTypes[listingType].map(listingInput => (
                    listingInput.type === "select" ?
                        <SelectInput
                            key={listingInput.name}
                            items={listingInput.items}
                            placeholder={listingInput.placeholder}
                            label={listingInput.label}
                            onChange={(e) => {
                                handleInputChange(listingInput.name, e);
                            }}
                            error={errors[listingInput.name]}
                            required={listingInput.required}
                        /> :
                        (listingInput.type === "number" ?
                            <NumberInput
                                hidden={listingInput.name === "delivery_fare_per_kg" && (additionalInfo.delivery_options === 'pickup' || !additionalInfo.delivery_options)}
                                key={listingInput.name}
                                label={listingInput.label}
                                min={listingInput.min}
                                required={listingInput.required}
                                onChange={(e) => {
                                    handleInputChange(listingInput.name, e);
                                }}
                                error={errors[listingInput.name]}
                            /> :
                            (listingInput.type === "checkbox" ?
                                <CheckBox
                                    key={listingInput.name}
                                    option={{
                                        name: listingInput.label,
                                        onCheck: (e) => {
                                            handleInputChange(listingInput.name, e);
                                        }
                                    }}
                                /> :
                                (listingInput.type === "range" ?
                                    <RangeInput
                                        key={listingInput.name}
                                        unit={listingInput.unit}
                                        minLabel={listingInput.minLabel}
                                        maxLabel={listingInput.maxLabel}
                                        onUpperChange={(e) => {
                                            handleInputChange(`${listingInput.name}_max`, parseFloat(e));
                                            setErrors({...errors, temperature_control: ""});
                                        }}
                                        onLowerChange={(e) => {
                                            handleInputChange(`${listingInput.name}_min`, parseFloat(e));
                                            setErrors({...errors, temperature_control: ""});
                                        }}
                                        option={{
                                            name: listingInput.label,
                                            onCheck: (e) => {
                                                handleInputChange(listingInput.name, e);
                                            }
                                        }}
                                        error={errors.temperature_control}
                                    /> :
                                    (listingInput.type === "text" ?
                                        <TextInput
                                            key={listingInput.name}
                                            label={listingInput.label}
                                            placeholder={listingInput.placeholder}
                                            onChange={(e) => {
                                                handleInputChange(listingInput.name, e);
                                            }}
                                            required={listingInput.required}
                                            error={errors[listingInput.name]}
                                        /> :
                                        (listingInput.type === "date" ?
                                            <DateInput
                                                key={listingInput.name}
                                                label={listingInput.label}
                                                name={listingInput.name}
                                                onChange={(e) => {
                                                    handleInputChange(listingInput.name, e);
                                                }}
                                                required={listingInput.required}
                                                error={errors[listingInput.name]}
                                            /> :
                                            <TextArea
                                                key={listingInput.name}
                                                label={listingInput.label}
                                                placeholder={listingInput.placeholder}
                                                onChange={(e) => {
                                                    handleInputChange(listingInput.name, e);
                                                }}
                                                required={listingInput.required}
                                                error={errors[listingInput.name]}
                                            />)))))
                ))
            }
        </div>
    )
}