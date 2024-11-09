import {Field} from "../../../ui/field";
import {Textarea} from "@chakra-ui/react";

const TextArea = (props) => {

    const {error, label, value, onChange, placeholder, required} = props;

    return (
        <div>
            <p className="mb-2">{label}</p>
            <Field invalid={error} errorText={error}>
                <Textarea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} size="lg"
                       className={`border ${error ? "border-red-500" : "border-gray-400"} outline-none px-4 py-2`} required={required}/>
            </Field>
        </div>
    );
};


export default TextArea;