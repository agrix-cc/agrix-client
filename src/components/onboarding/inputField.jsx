const InputField = ({
                        required = false,
                        styles = "mb-4",
                        type = "text",
                        autoComplete = "off",
                        id,
                        label,
                        placeholder,
                        name,
                        data,
                        onChange,
                        error
                    }) => {
    return (
        <div className={styles}>
            <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                required={required}
                value={data}
                onChange={onChange}
                autoComplete={autoComplete}
                className={
                    `appearance-none
                    rounded-full
                    ${error ? 'border-red-500' : 'border-green-300'}
                    border
                    w-full
                    py-3
                    px-5
                    text-gray-700
                    leading-tight
                    focus:outline-none
                    focus:shadow-outline`
                }
            />
        </div>
    );
};

export default InputField;