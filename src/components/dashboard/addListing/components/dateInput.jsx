import {Field} from "../../../ui/field";

const DateInput = (props) => {
    const {
        label,
        name,
        onChange = (e) => {
        },
        required,
        error,
        value,
    } = props;

    return (
        <div className="grid gap-2">
            <Field invalid={error} errorText={error}>
                <label htmlFor={name}>{label}</label>
                <input
                    type="date"
                    required={required}
                    id={name}
                    value={value ? new Date(value).toISOString().split('T')[0] : ''}
                    max={`${new Date().toISOString().split('T')[0]}`}
                    className={`${error ? 'border-red-500' : 'border-gray-400'} border px-4 py-2 rounded w-full`}
                    onChange={(e) => onChange(e.target.value)}/>
            </Field>
        </div>
    );
};

export default DateInput;