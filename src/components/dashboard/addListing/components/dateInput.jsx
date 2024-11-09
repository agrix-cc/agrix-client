const DateInput = (props) => {
    const {
        label,
        name,
        onChange = (e) => {},
        required
    } = props;

    return (
        <div className="grid gap-2">
            <label htmlFor={name}>{label}</label>
            <input
                type="date"
                required={required}
                id={name}
                max={`${new Date().toISOString().split('T')[0]}`}
                className="border-gray-400 border px-4 py-2 rounded"
                onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

export default DateInput;