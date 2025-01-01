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
import React, {useEffect, useRef, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {citiesByDistrict, districts} from "../../assets/citiesByDistrict";
import axios from "axios";
import {Toaster, toaster} from "../../components/ui/toaster";
import {useNavigate, useParams} from "react-router-dom";
import {APIProvider, useMapsLibrary} from "@vis.gl/react-google-maps";

const AddListing = () => {
    const {id} = useParams();

    const [location, setLocation] = useState(null);

    const navigate = useNavigate();

    // This state is to keep track of listing type
    const [listingType, setListingType] = useState("crop");

    // This state object is the store user uploaded files
    const [files, setFiles] = useState([]);

    // This state to keep the submit button disable until client side receives a response
    const [isSubmitting, setIsSubmitting] = useState(false);

    // This state object holds all the possible errors to show error messages in input validations
    const [errors, setErrors] = useState({});

    // This state object holds main listing information
    const [listingInfo, setListingInfo] = useState({
        title: "",
        description: "",
        district: "",
        city: "",
        listing_type: "",
    });

    // This state object is to hold all the other listing information of (storage, transport, and crop)
    const [additionalInfo, setAdditionalInfo] = useState({});

    // This function handles the user inputs onChange
    const handleInputChange = (name, value) => {
        // Change the value relevant object key using its name
        setAdditionalInfo((prevState) => {
            const newState = {...prevState, [name]: value};

            // Reset temperature_control_min and temperature_control_max when temperature_control changes
            if (name === "temperature_control" && !value) {
                newState.temperature_control_min = 0;
                newState.temperature_control_max = 0;
            }
            if (name === "delivery_options" && value === "pickup") {
                newState.delivery_fare_per_kg = 0;
            }

            return newState;
        });

        // Clear error message when user input data
        setErrors((prevErrors) => ({...prevErrors, [name]: ""}));
    };

    // This function is to handle the form submit
    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        // Check whether all the inputs are validated
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        // This is a helper function to append data to the formData according to the listing type
        const appendInfo = (listingType, formData) => {
            // Temporary object to hold information to append
            const info = {};
            // Iterate through the prepared listing types and information object
            listingTypes[listingType].forEach((item) => {
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
        formData.append(
            "listingInfo",
            JSON.stringify({
                ...listingInfo,
                listing_type: listingType,
                address: location.name,
                lat: location.lat,
                lng: location.lng,
            })
        );
        // Append other listing information according to the listing type
        switch (listingType) {
            case "storage":
                appendInfo("storage", formData);
                break;
            case "transport":
                appendInfo("transport", formData);
                break;
            case "generaluser":
                appendInfo("generaluser", formData);
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

        const route = id ? `edit/${id}` : "add-new";

        // attach jwt token to the request headers
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("jwtToken");

        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/${route}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                toaster.create({
                    title: res.data.message,
                    type: "success",
                    duration: 1000,
                    onStatusChange({status}) {
                        if (status === "unmounted") {
                            setIsSubmitting(false);
                            navigate("/");
                        }
                    },
                });
            })
            .catch((error) => {
                setIsSubmitting(false);
                if (error.response) {
                    toaster.create({
                        title: error.response.data.message,
                        type: "error",
                    });
                    return;
                }
                toaster.create({
                    title: error.message,
                    type: "error",
                });
            });
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
                price_per_km: "Please enter price per km",
                max_weight: "Please enter maximum weight can transport",
                max_volume: "Please enter maximum volume can transport",
            },
            storageErrors: {
                storage_type: "Please select a storage type",
                max_capacity: "Please enter the maximum capacity",
                width: "Please enter the width of storage unit",
                height: "Please enter the height of storage unit",
                length: "Please enter the length of storage unit",
                minimum_days: "Please enter minimum duration to rent",
                maximum_days: "Please enter maximum duration to rent",
                daily_rate: "Please enter daily rental fee",
            },
        };

        validateFields(errorMessages.requiredFields, listingInfo);

        switch (listingType) {
            case "storage":
                validateFields(errorMessages.storageErrors, additionalInfo);
                break;
            case "transport":
                validateFields(errorMessages.transportErrors, additionalInfo);
                break;
            case "crop":
                validateFields(errorMessages.cropErrors, additionalInfo);
                break;
        }

        if (
            listingType === "crop" &&
            additionalInfo.harvested_date &&
            new Date(additionalInfo.harvested_date) > new Date()
        ) {
            isValid = false;
            errorState.harvested_date = "Please enter a valid harvested date";
        }

        if (
            listingType === "crop" &&
            additionalInfo.delivery_options !== "pickup"
        ) {
            if (
                !additionalInfo.delivery_fare_per_kg ||
                additionalInfo.delivery_fare_per_kg <= 0
            ) {
                isValid = false;
                errorState.delivery_fare_per_kg =
                    "Please enter the delivery fare per kg";
            }
        }

        if (
            (listingType === "transport" || listingType === "storage") &&
            additionalInfo.temperature_control
        ) {
            if (isNaN(additionalInfo.temperature_control_min)) {
                isValid = false;
                errorState.temperature_control = "Please enter minimum temperature";
            }

            if (isNaN(additionalInfo.temperature_control_max)) {
                isValid = false;
                errorState.temperature_control = "Please enter maximum temperature";
            }

            if (
                additionalInfo.temperature_control_min >
                additionalInfo.temperature_control_max
            ) {
                isValid = false;
                errorState.temperature_control =
                    "Minimum temperature can not be larger than minimum";
            }
        }

        // if (!location) {
        //   isValid = false;
        // }

        setErrors(errorState);
        if (!isValid) {
            toaster.create({
                title: "Invalid submit!",
                description:
                    "Please fill all the required fields and enter valid details",
                type: "error",
                duration: 1500,
            });
        }
        return isValid;
    };

    const validateFields = (errorMessages, inputData) => {
        Object.keys(errorMessages).forEach((field) => {
            if (!inputData[field]) {
                isValid = false;
                errorState[field] = errorMessages[field];
            } else {
                errorState[field] = "";
            }
        });
    };

    useEffect(() => {
        if (!id) return;
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("jwtToken");
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/view/edit/${id}`)
            .then((res) => {
                const listing = res.data.listing;
                const listingType = listing.listing_type;

                if (listing) {
                    setListingInfo({
                        title: listing.title,
                        description: listing.description,
                        district: listingType.district,
                        city: listing.city,
                        listing_type: listing.listing_type,
                    });
                }

                switch (listingType) {
                    case "transport":
                        setAdditionalInfo({
                            vehicle_type: listing.TransportListing.vehicle_type,
                            fuel_type: listing.TransportListing.fuel_type,
                            price_per_km: listing.TransportListing.price_per_km,
                            max_weight: listing.TransportListing.max_weight,
                            max_volume: listing.TransportListing.max_volume,
                            temperature_control: listing.TransportListing.temperature_control,
                            temperature_control_max:
                                listing.TransportListing.temperature_control_max || 0,
                            temperature_control_min:
                                listing.TransportListing.temperature_control_min || 0,
                            refrigerated: listing.TransportListing.refrigerated,
                        });
                        return;
                    case "storage":
                        setAdditionalInfo({
                            storage_type: listing.StorageListing.storage_type,
                            max_capacity: listing.StorageListing.max_capacity,
                            width: listing.StorageListing.width,
                            length: listing.StorageListing.length,
                            height: listing.StorageListing.height,
                            daily_rate: listing.StorageListing.daily_rate,
                            minimum_days: listing.StorageListing.minimum_days,
                            maximum_days: listing.StorageListing.maximum_days,
                            temperature_control: listing.StorageListing.temperature_control,
                            temperature_control_max:
                                listing.StorageListing.temperature_control_max || 0,
                            temperature_control_min:
                                -listing.StorageListing.temperature_control_min || 0,
                            humidity_control_availability:
                            listing.StorageListing.humidity_control_availability,
                            ventilation_availability:
                            listing.StorageListing.ventilation_availability,
                            pest_control_availability:
                            listing.StorageListing.pest_control_availability,
                        });
                        return;
                    default:
                        setAdditionalInfo({
                            crop_name: listing.CropListing.crop_name,
                            crop_type: listing.CropListing.crop_type,
                            harvested_date: listing.CropListing.harvested_date,
                            available_quantity: listing.CropListing.available_quantity,
                            price_per_kg: listing.CropListing.price_per_kg,
                            quality_condition: listing.CropListing.quality_condition,
                            quality_grade: listing.CropListing.quality_grade,
                            delivery_options: listing.CropListing.delivery_options,
                            delivery_fare_per_kg: listing.CropListing.delivery_fare_per_kg,
                            organic: listing.CropListing.organic,
                        });
                        return;
                }
            })
            .catch((error) => {
                if (error.response) {
                    toaster.create({
                        title: error.response.data.message,
                        duration: 2000,
                        type: "error",
                        onStatusChange({status}) {
                            if (status === "unmounted") {
                                navigate("/dashboard");
                            }
                        },
                    });
                }
            });
    }, [id, navigate]);

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
            case "generaluser":
                setListingType("generaluser");
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
                description: "Please wait until your listing is submitted!",
            });
        }
    }, [isSubmitting]);

    return (
        listingTypes && (
            <div className="mb-20 pb-8 add-listing">
                <MobileNav/>
                <Toaster/>
                <p className="mt-16 p-4 font-medium text-2xl">
                    {id ? `Edit listing Id: #${id}` : "Create new listing"}
                </p>
                <div className="md:flex md:justify-center md:items-center">
                    <form className="md:max-w-md w-full">
                        <div className="mb-2 pb-4 border-b border-gray-400 mx-4">
                            <p className="text-lg font-medium text-gray-500 text-center py-2">
                                Listing Information
                            </p>
                            <div className="grid gap-4">
                                <UploadImages files={files} setFiles={setFiles}/>
                                <p>
                                    Listing type:{" "}
                                    <span className="font-medium text-gray-500 capitalize">
                    {listingType}
                  </span>
                                </p>
                                <TextInput
                                    id="title"
                                    label="Title"
                                    placeholder="Enter title of the listing to be"
                                    error={errors.title}
                                    value={listingInfo.title || ""}
                                    onChange={(value) => {
                                        setListingInfo({...listingInfo, title: value});
                                        setErrors({...errors, title: ""});
                                    }}
                                    required
                                />
                                <TextArea
                                    id="description"
                                    label="Description"
                                    placeholder="Enter description of the listing"
                                    error={errors.description}
                                    value={listingInfo.description || ""}
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
                                            id="district"
                                            items={districts.map((district) => ({
                                                label: district,
                                                value: district,
                                            }))}
                                            value={listingInfo.district}
                                            onChange={(e) => {
                                                setListingInfo({
                                                    ...listingInfo,
                                                    district: e,
                                                    city: "",
                                                });
                                                setErrors({...errors, district: ""});
                                            }}
                                            placeholder="Select district"
                                            label="District"
                                            required
                                            error={errors.district}
                                        />
                                        {listingInfo.district ? (
                                            <SelectInput
                                                id="city"
                                                required
                                                value={listingInfo.city}
                                                items={citiesByDistrict[
                                                    listingInfo.district
                                                    ].cities.map((city) => ({
                                                    label: city,
                                                    value: city,
                                                }))}
                                                onChange={(e) => {
                                                    setListingInfo({...listingInfo, city: e});
                                                    setErrors({...errors, city: ""});
                                                }}
                                                placeholder="Select district"
                                                label="City"
                                                error={errors.city}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        <p>Address</p>
                                        <APIProvider
                                            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                        >
                                            <PlaceAutocomplete onPlaceSelect={setLocation}/>
                                        </APIProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 pb-4 border-b border-gray-400 mx-4">
                            <p className="text-lg font-medium text-gray-500 text-center py-2">
                                Additional Information
                            </p>
                            <div>
                                {listingType &&
                                    listingTypes[listingType].map((listingInput, key) => (
                                        <div key={listingInput.name} className="mb-4">
                                            {listingInput.type === "select" && (
                                                <SelectInput
                                                    id={listingInput.name}
                                                    value={additionalInfo[listingInput.name]}
                                                    items={listingInput.items}
                                                    placeholder={listingInput.placeholder}
                                                    label={listingInput.label}
                                                    onChange={(e) => {
                                                        handleInputChange(listingInput.name, e);
                                                    }}
                                                    error={errors[listingInput.name]}
                                                    required={listingInput.required}
                                                />
                                            )}
                                            {listingInput.type === "number" && (
                                                <NumberInput
                                                    id={listingInput.name}
                                                    value={additionalInfo[listingInput.name] || 0}
                                                    hidden={
                                                        listingInput.name === "delivery_fare_per_kg" &&
                                                        (additionalInfo.delivery_options === "pickup" ||
                                                            !additionalInfo.delivery_options)
                                                    }
                                                    label={listingInput.label}
                                                    min={listingInput.min}
                                                    required={listingInput.required}
                                                    onChange={(e) => {
                                                        handleInputChange(listingInput.name, e);
                                                    }}
                                                    error={errors[listingInput.name]}
                                                />
                                            )}
                                            {listingInput.type === "checkbox" && (
                                                <CheckBox
                                                    id={listingInput.name}
                                                    value={additionalInfo[listingInput.name]}
                                                    option={{
                                                        name: listingInput.label,
                                                        onCheck: (e) => {
                                                            handleInputChange(listingInput.name, e);
                                                        },
                                                    }}
                                                />
                                            )}
                                            {listingInput.type === "range" && (
                                                <RangeInput
                                                    id={listingInput.name}
                                                    unit={listingInput.unit}
                                                    minLabel={listingInput.minLabel}
                                                    maxLabel={listingInput.maxLabel}
                                                    isChecked={
                                                        additionalInfo && additionalInfo[listingInput.name]
                                                    }
                                                    min_val={
                                                        additionalInfo &&
                                                        additionalInfo[listingInput.name + "_min"]
                                                    }
                                                    max_val={
                                                        additionalInfo &&
                                                        additionalInfo[listingInput.name + "_max"]
                                                    }
                                                    onUpperChange={(e) => {
                                                        handleInputChange(
                                                            `${listingInput.name}_max`,
                                                            parseFloat(e)
                                                        );
                                                        setErrors({...errors, temperature_control: ""});
                                                    }}
                                                    onLowerChange={(e) => {
                                                        handleInputChange(
                                                            `${listingInput.name}_min`,
                                                            parseFloat(e)
                                                        );
                                                        setErrors({...errors, temperature_control: ""});
                                                    }}
                                                    option={{
                                                        name: listingInput.label,
                                                        onCheck: (e) => {
                                                            handleInputChange(listingInput.name, e);
                                                        },
                                                    }}
                                                    error={errors.temperature_control}
                                                />
                                            )}
                                            {listingInput.type === "text" && (
                                                <TextInput
                                                    id={listingInput.name}
                                                    label={listingInput.label}
                                                    placeholder={listingInput.placeholder}
                                                    value={additionalInfo[listingInput.name] || ""}
                                                    onChange={(e) => {
                                                        handleInputChange(listingInput.name, e);
                                                    }}
                                                    required={listingInput.required}
                                                    error={errors[listingInput.name]}
                                                />
                                            )}
                                            {listingInput.type === "date" && (
                                                <DateInput
                                                    label={listingInput.label}
                                                    name={listingInput.name}
                                                    value={additionalInfo[listingInput.name]}
                                                    onChange={(e) =>
                                                        handleInputChange(listingInput.name, e)
                                                    }
                                                    required={listingInput.required}
                                                    error={errors[listingInput.name]}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="px-4 mt-4">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="px-4 py-2 rounded bg-primary-green text-white text-lg w-full shadow-lg active:shadow-md active:translate-y-0.5 translate-y-0 duration-300 transition-all disabled:opacity-25"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export const PlaceAutocomplete = (props) => {
    const {onPlaceSelect} = props;

    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;
        const options = {
            fields: ["geometry", "name", "formatted_address"],
            componentRestrictions: {country: "lk"},
        };
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;
        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect({
                lat: placeAutocomplete.getPlace().geometry.location.lat(),
                lng: placeAutocomplete.getPlace().geometry.location.lng(),
                name: placeAutocomplete.getPlace().name,
            });
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <input
            ref={inputRef}
            className="w-full px-4 py-2 rounded outline-none border border-gray-400"
            required
        />
    );
};

export default AddListing;
