import MobileNav from "../../components/mobileNav";
import UploadImages from "../../components/dashboard/addListing/components/uploadImages";
import NumberInput from "../../components/dashboard/addListing/components/numberInput";
import TextInput from "../../components/dashboard/addListing/components/textInput";
import TextArea from "../../components/dashboard/addListing/components/testArea";
import SelectInput from "../../components/dashboard/addListing/components/selectInput";
import CheckBox from "../../components/dashboard/addListing/components/checkBox";
import RangeInput from "../../components/dashboard/addListing/components/rangeInput";
import listingTypes from "../../assets/listingTypes";
import DateInput from "../../components/dashboard/addListing/components/dateInput";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {citiesByDistrict, districts} from "../../assets/citiesByDistrict";

const AddListing = () => {

    const [listingType, setListingType] = useState("transport");

    const [files, setFiles] = useState([]);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        district: "",
        city: "",
        crop_name: "",
        crop_type: "",
        verity: "",
        harvested_date: "",
        available_quantity: "",
        price_per_kg: "",
        quality_condition: "",
        quality_grade: "",
        delivery_option: "",
        organic: "",
        vehicle_type: "",
        vehicle_model: "",
        service_radius: "",
        price_per_km: "",
        max_weight: "",
        max_volume: "",
        temperature_control: "",
        refrigerated: "",
        storage_type: "",
        total_units: "",
        price_per_unit: "",
        volume_per_unit: "",
        max_capacity_per_unit: "",
        humidity_control_availability: "",
        ventilation_availability: "",
        pest_control_availability: "",
    });

    const [listingInfo, setListingInfo] = useState({
        title: "",
        description: "",
        district: "",
        city: "",
    });

    const [additionalInfo, setAdditionalInfo] = useState({});

    const [data, setData] = useState({});

    const handleInputChange = (name, value) => {
        setAdditionalInfo({...additionalInfo, [name]: value});
        setErrors({...errors, [name]: ""});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        // TODO axios post request
        console.log(data);
    };

    let isValid = true;
    const errorState = {...errors};

    const validateForm = () => {

        const errorMessages = {
            requiredFields: {
                title: "Title can not be empty",
                description: "Description can not be empty",
                district: "District can not be empty",
                city: "City can not be empty",
            },
            cropErrors: {
                crop_name: "Crop name can not be empty",
                crop_type: "Crop type can not be empty",
                harvested_date: "Please enter harvested date",
                available_quantity: "Please enter a valid quantity",
                price_per_kg: "Please enter the price",
                quality_condition: "Please select the condition of crop",
                quality_grade: "Please select the grade of crop",
                delivery_option: "Please select a delivery option",
            },
            transportErrors: {
                vehicle_type: "Please select vehicle type",
                vehicle_model: "Please select vehicle model",
                service_radius: "Please enter maximum service radius",
                price_per_km: "Please enter price per km",
                max_weight: "Please enter maximum weight can transport",
                max_volume: "Please enter maximum volume can transport",
            },
            storageErrors: {
                storage_type: "Please select a storage type",
                total_units: "Please enter amount of units",
                price_per_unit: "Please enter price per unit",
                volume_per_unit: "Please enter volume per unit",
                max_capacity_per_unit: "Please enter maximum capacity per unit",
            }
        }

        validateFields(errorMessages.requiredFields);

        if (!listingInfo.city) {
            isValid = false;
            errorState.city = "Please select a city";
        }

        if (!listingInfo.district) {
            isValid = false;
            errorState.district = "Please select a district";
        }

        if (listingType === "crop") {
            validateFields(errorMessages.cropErrors);

            if (data.harvested_date && new Date(data.harvested_date) > new Date()) {
                isValid = false;
                errorState.harvested_date = "Please enter a valid harvested date";
            }
        }

        if (listingType === "transport") {
            validateFields(errorMessages.transportErrors);

            if (data.temperature_control && ((data.temperature_control_min > data.temperature_control_max) || !data.temperature_control_min || !data.temperature_control_max)) {
                isValid = false;
                errorState.temperature_control = "Please enter a valid temperature range";
            }
        }

        if (listingType === "storage") {
            validateFields(errorMessages.storageErrors);

            if (data.temperature_control && ((data.temperature_control_min > data.temperature_control_max) || !data.temperature_control_min || !data.temperature_control_max)) {
                isValid = false;
                errorState.temperature_control = "Please enter a valid temperature range";
            }
        }

        setErrors(errorState);
        return isValid;
    };

    const validateFields = (errorMessages) => {
        Object.keys(errorMessages).forEach(field => {
            if (!data[field]) {
                isValid = false;
                errorState[field] = errorMessages[field];
            } else {
                errorState[field] = "";
            }
        })
    };

    useEffect(() => {
        const decoded = jwtDecode(localStorage.getItem("jwtToken"));
        switch (decoded.user.profile_type) {
            case "transport":
                setListingType("transport");
                break;
            case "storage":
                setListingType("storage");
                break;
            case "farmer":
                setListingType("crop");
                break;
            default:
                setListingType("crop");
                break;
        }
    }, []);

    useEffect(() => {
        setData({...data, ...listingInfo});
    }, [data, listingInfo]);

    useEffect(() => {
        setData({...data, ...additionalInfo});
    }, [data, additionalInfo]);

    useEffect(() => {
        setData({...data, listing_type: listingType});
    }, [data, listingType]);

    useEffect(() => {
        setData({...data, images: files});
    }, [data, files]);

    return (
        <div className="mb-20 pb-8">
            <MobileNav/>
            <form>
                <p className="mt-16 p-4 font-medium text-2xl">Create new listing</p>
                <div className="mb-2 pb-4 border-b border-gray-400 mx-4">
                    <p className="text-lg font-medium text-gray-500 text-center py-2">Listing Information</p>
                    <div className="grid gap-4">

                        <UploadImages files={files} setFiles={setFiles}/>

                        <p>Listing type: <span className="font-medium text-gray-500 capitalize">{listingType}</span></p>

                        <TextInput
                            label="Title"
                            placeholder="Enter title of the listing to be"
                            error={errors.title}
                            value={listingInfo.title}
                            onChange={(value) => {
                                setListingInfo({...listingInfo, title: value});
                                setErrors({...errors, title: ""});
                            }}
                            required
                        />

                        <TextArea
                            label="Description"
                            placeholder="Enter description of the listing"
                            error={errors.description}
                            onChange={(value) => {
                                setListingInfo({...listingInfo, description: value});
                                setErrors({...errors, description: ""});
                            }}
                            required
                        />

                        <div>
                            <p className="text-gray-500 mb-4">Location</p>
                            <div className="grid gap-2">
                                <SelectInput
                                    items={districts.map(district => ({label: district, value: district}))}
                                    onChange={(e) => {
                                        setListingInfo({...listingInfo, district: e, city: ""});
                                        setErrors({...errors, district: ""});
                                    }}
                                    placeholder="Select district"
                                    label="District"
                                    required
                                    error={errors.district}
                                />
                                {
                                    listingInfo.district ? <SelectInput
                                        required
                                        items={citiesByDistrict[listingInfo.district].cities.map(city => ({
                                            label: city,
                                            value: city
                                        }))}
                                        onChange={(e) => {
                                            setListingInfo({...listingInfo, city: e});
                                            setErrors({...errors, city: ""});
                                        }}
                                        placeholder="Select district"
                                        label="City"
                                        error={errors.city}
                                    /> : <></>
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mb-2 pb-4 border-b border-gray-400 mx-4">
                    <p className="text-lg font-medium text-gray-500 text-center py-2">Additional Information</p>
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
                                                        handleInputChange(`${listingInput.name}_max`, e);
                                                        setErrors({...errors, temperature_control: ""});
                                                    }}
                                                    onLowerChange={(e) => {
                                                        handleInputChange(`${listingInput.name}_min`, e);
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
                </div>
                <div className="px-4 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-primary-green text-white text-lg w-full shadow-lg active:shadow-md active:translate-y-0.5 translate-y-0 duration-300 transition-all"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default AddListing;