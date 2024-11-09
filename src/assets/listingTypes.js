const listingTypes = {
    crop: [
        {
            name: "crop_name",
            type: "text",
            label: "Crop name",
            placeholder: "Enter title of the listing to be",
            required: true
        },
        {
            name: "crop_type",
            type: "select",
            label: "Crop type",
            items: [
                {label: "Vegetable", value: "vegetable"},
                {label: "Fruit", value: "fruit"},
                {label: "Grains", value: "grain"},
            ],
            placeholder: "Select crop type",
            required: true
        },
        {
            name: "verity",
            type: "text",
            label: "Verity",
            placeholder: "Enter specific verity of crop",
            required: true
        },
        {
            name: "harvested_date",
            type: "date",
            label: "Harvested Date",
            required: true
        },
        {
            name: "available_quantity",
            type: "number",
            label: "Available quantity in kg",
            min: 1,
            required: true
        },
        {
            name: "price_per_kg",
            type: "number",
            label: "Price per kg (Rs.)",
            min: 0,
            required: true
        },
        {
            name: "quality_condition",
            type: "select",
            label: "Crop condition",
            items: [
                {label: "Fresh", value: "fresh"},
                {label: "Rotten", value: "rotten"},
                {label: "Overripe", value: "overripe"},
            ],
            placeholder: "Select the quality condition of crop",
            required: true
        },
        {
            name: "quality_grade",
            type: "select",
            label: "Crop grade",
            items: [
                {label: "Garde A", value: "A"},
                {label: "Grade B", value: "B"},
                {label: "Grade C", value: "C"},
            ],
            placeholder: "Select the quality grade of crop",
            required: true
        },
        {
            name: "delivery_options",
            type: "select",
            label: "Delivery options",
            items: [
                {label: "Pick up", value: "pickup"},
                {label: "Delivery", value: "deliver"},
                {label: "Both", value: "both"},
            ],
            placeholder: "Select available delivery options",
            required: true
        },
        {
            name: "organic",
            type: "checkbox",
            label: "This crop is organically grown.",
        },
    ],
    transport: [
        {
            name: "vehicle_type",
            type: "select",
            label: "Vehicle type",
            items: [
                {label: "Truck", value: "truck"},
                {label: "Van", value: "van"},
                {label: "Tuk", value: "tuk"},
            ],
            placeholder: "Select your vehicle type",
            required: true
        },
        {
            name: "vehicle_model",
            type: "select",
            label: "Vehicle model",
            items: [
                {label: "Honda", value: "honda"},
                {label: "Bajaj", value: "bajaj"},
                {label: "Mazda", value: "mazda"},
            ],
            placeholder: "Select your vehicle make model",
            required: true
        },
        {
            name: "service_radius",
            type: "number",
            label: "Enter maximum service radius (km)",
            min: 0,
            required: true
        },
        {
            name: "price_per_km",
            type: "number",
            label: "Enter price per km (Rs.)",
            min: 0,
            required: true
        },
        {
            name: "max_weight",
            type: "number",
            label: "Enter maximum weight can transport (kg)",
            min: 0,
            required: true
        },
        {
            name: "max_volume",
            type: "number",
            label: "Enter maximum volume can transport (m³)",
            min: 0,
            required: true
        },
        {
            name: "temperature_control",
            type: "range",
            unit: "fahrenheit",
            label: "This vehicle has temperature control facility.",
            minLabel: "Minimum temperature",
            maxLabel: "Maximum temperature",
        },
        {
            name: "refrigerated",
            type: "checkbox",
            label: "This vehicle has refrigerator facility.",
        },
    ],
    storage: [
        {
            name: "storage_type",
            type: "select",
            label: "Storage type",
            items: [
                {label: "Cold room", value: "cold_room"},
                {label: "Dry room", value: "dry_room"},
            ],
            placeholder: "Select your storage type",
            required: true
        },
        {
            name: "total_units",
            type: "number",
            label: "Enter available storage units",
            min: 0,
            required: true
        },
        {
            name: "price_per_unit",
            type: "number",
            label: "Enter price per storage unit (Rs.)",
            min: 0,
            required: true

        },
        {
            name: "volume_per_unit",
            type: "number",
            label: "Enter maximum volume can store per unit (m³)",
            min: 0,
            required: true
        },
        {
            name: "max_capacity_per_unit",
            type: "number",
            label: "Enter maximum capacity can transport (kg)",
            min: 0,
            required: true
        },
        {
            name: "temperature_control",
            type: "range",
            unit: "fahrenheit",
            label: "This storage has temperature control facility.",
            minLabel: "Minimum temperature",
            maxLabel: "Maximum temperature",
        },
        {
            name: "humidity_control_availability",
            type: "checkbox",
            label: "This storage has humidity control facility.",
        },
        {
            name: "ventilation_availability",
            type: "checkbox",
            label: "This storage has ventilation facility.",
        },
        {
            name: "pest_control_availability",
            type: "checkbox",
            label: "This storage has pest control facility.",
        },
    ]
}

export default listingTypes;