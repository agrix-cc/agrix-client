const InputField = (props) => {
    return (
        <div className={props.styles}>
            <label className="block text-gray-700 font-medium mb-2" htmlFor={props.id}>
                {props.label}
            </label>
            <input
                className="appearance-none rounded-full border-green-300 border w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={props.id} type={props.type} placeholder={props.placeholder} name={props.name} required={props.required}/>
        </div>
    );
};

InputField.defaultProps = {
    required: false,
    styles: "mb-4",
    type: "text"
}

export default InputField;