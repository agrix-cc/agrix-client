import {Field} from "../../../ui/field";
import {Input} from "@chakra-ui/react";

const TextInput = (props) => {

    const {
        error,
        label,
        value,
        onChange,
        placeholder,
        required,
        disabled = false
    } = props;

    return (
        <div className={label ? "" : "w-full"}>
            <p className={label && "mb-2"}>{label}</p>
            <Field invalid={error} errorText={error}>
                <Input disabled={disabled} placeholder={placeholder} required={required} value={value} onChange={(e) => onChange(e.target.value)} size="lg"
                       className={`border ${error ? "border-red-500" : "border-gray-400"} outline-none px-4`}/>
            </Field>
        </div>
    );
};


export default TextInput;