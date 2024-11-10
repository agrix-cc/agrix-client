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
import axios from "axios";
import {Toaster, toaster} from "../../components/ui/toaster";
import {useNavigate} from "react-router-dom";

const AddListing = () => {

    const navigate = useNavigate();

    // This state is to keep track of listing type
    const [listingType, setListingType] = useState("crop");

    // This state object is the store user uploaded files
    const [files, setFiles] = useState([]);

    // This state to keep the submit button disable until client side receives a response
    const [isSubmitting, setIsSubmitting] = useState(false);

    // This state object holds all the possible errors to show error messages in input validations
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
        delivery_options: "",
        organic: "",
        vehicle_type: "",
        fuel_type: "",
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

    // This state object holds main listing information
    const [listingInfo, setListingInfo] = useState({
        title: "",
        description: "",
        district: "",
        city: "",
        listing_type: ""
    });

    // This state object is to hold all the other listing information of (storage, transport, and crop)
    const [additionalInfo, setAdditionalInfo] = useState({});

    // This function handles the user inputs onChange
    const handleInputChange = (name, value) => {
        // Change the value relevant object key using its name
        setAdditionalInfo({...additionalInfo, [name]: value});
        // Clear error message when user input data
        setErrors({...errors, [name]: ""});
    };

    // This function is to handle the form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check whether all the inputs are validated
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // This is a helper function to append data to the formData according to the listing type
        const appendInfo = (listingType, formData) => {
            // Temporary object to hold information to append
            const info = {};
            // Iterate through the prepared listing types and information object
            listingTypes[listingType].forEach(item => {
                // If it is temperature range it handles separately
                if (item.type === "range") {
                    info[`${item.name}_min`] = additionalInfo[`${item.name}_min`];
                    info[`${item.name}_max`] = additionalInfo[`${item.name}_max`];
                }
                info[item.name] = additionalInfo[item.name];
            });
            formData.append(`${listingType}Info`, JSON.stringify({...info}));
        };

        // Create new formData object include all the information
        const formData = new FormData();
        // Append main listing information to the formDate object
        formData.append('listingInfo', JSON.stringify({...listingInfo, listing_type: listingType}));
        // Append other listing information according to the listing type
        switch (listingType) {
            case "storage":
                appendInfo("storage", formData);
                break;
            case "transport":
                appendInfo("transport", formData);
                break;
            // Since listingType is initialized to crop we are adding it in default
            default:
                appendInfo("crop", formData);
                break;
        }

        // Add images to the formData object
        files.forEach((file, index) => {
            formData.append(`images`, file);
        });

        // attach jwt token to the request headers
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/add-new`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((res) => {
                setIsSubmitting(false);
                toaster.create({
                    title: res.data.message,
                    type: "success",
                    duration: 1000,
                    onStatusChange({status}) {
                        if (status === "unmounted") {
                            navigate('/');
                        }
                    }
                });
            })
            .catch((error) => {
                setIsSubmitting(false);
                if (error.response) {
                    toaster.create({
                        title: error.response.data.message,
                        type: "error"
                    });
                    return;
                }
                toaster.create({
                    title: error.message,
                    type: "error"
                });
            })
    };

    // This is to keep track of form validation
    let isValid = true;
    // This is temporary object to keep track of errors and change the state in validateForm function
    const errorState = {...errors};

    const validateForm = () => {

        const errorMessages = {
            requiredFields: {
                title: "Title can not be empty",
                description: "Description can not be empty",
                district: "Please select a district",
                city: "Please select a city",
            },
            cropErrors: {
                crop_name: "Crop name can not be empty",
                crop_type: "Crop type can not be empty",
                harvested_date: "Please enter harvested date",
                available_quantity: "Please enter a valid quantity",
                price_per_kg: "Please enter the price",
                quality_condition: "Please select the condition of crop",
                quality_grade: "Please select the grade of crop",
                delivery_options: "Please select a delivery option",
            },
            transportErrors: {
                vehicle_type: "Please select vehicle type",
                fuel_type: "Please select vehicle fuel type",
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

        validateFields(errorMessages.requiredFields, listingInfo);

        switch (listingType) {
            case "storage":
                validateFields(errorMessages.storageErrors, additionalInfo);
                break;
            case "transport":
                validateFields(errorMessages.transportErrors, additionalInfo);
                break;
            default:
                validateFields(errorMessages.cropErrors, additionalInfo);
                break;
        }

        if ((listingType === "crop") && (additionalInfo.harvested_date && new Date(additionalInfo.harvested_date) > new Date())) {
            isValid = false;
            errorState.harvested_date = "Please enter a valid harvested date";
        }

        if ((listingType === "transport" || listingType === "storage") && additionalInfo.temperature_control) {

            if (isNaN(additionalInfo.temperature_control_min)) {
                isValid = false;
                errorState.temperature_control = "Please enter minimum temperature";
            }

            if (isNaN(additionalInfo.temperature_control_max)) {
                isValid = false;
                errorState.temperature_control = "Please enter maximum temperature";
            }

            if (additionalInfo.temperature_control_min > additionalInfo.temperature_control_max) {
                isValid = false;
                errorState.temperature_control = "Minimum temperature can not be larger than minimum";
            }
        }

        setErrors(errorState);
        return isValid;
    };

    const validateFields = (errorMessages, inputData) => {
        Object.keys(errorMessages).forEach(field => {
            if (!inputData[field]) {
                isValid = false;
                errorState[field] = errorMessages[field];
            } else {
                errorState[field] = "";
            }
        })
    };

    // This determines which listing should provide based on the user type
    useEffect(() => {
        // Decode the stored jwtToken to access user information
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
        if (isSubmitting) {
            toaster.create({
                title: "Submitting!",
                type: "loading",
                description: "Please wait until your listing is submitted!"
            })
        }
    }, [isSubmitting])

    return (
        <div className="mb-20 pb-8">
            <MobileNav/>
            <Toaster/>
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
                </div>
                <div className="px-4 mt-4">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="px-4 py-2 rounded bg-primary-green text-white text-lg w-full shadow-lg active:shadow-md active:translate-y-0.5 translate-y-0 duration-300 transition-all"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default AddListing;