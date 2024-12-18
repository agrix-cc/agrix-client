import { NumberInputField, NumberInputRoot } from "../../../ui/number-input";
import {Field} from "../../../ui/field";

const NumberInput = (props) => {

    const {error, label, value, onChange, min, max, hidden, id} = props;

    return (!hidden &&
        <div>
            <p className="mb-2">{label}</p>
            <Field invalid={error} errorText={error}>
                <NumberInputRoot
                    id={id}
                    defaultValue="0"
                    width="200px"
                    size="lg"
                    value={value}
                    min={min}
                    max={max}
                    className="!w-full"
                    onValueChange={(e) => onChange(e.valueAsNumber)}>
                    <NumberInputField className={`border ${error ? "border-red-500" : "border-gray-400"} outline-none px-4 w-full`}/>
                </NumberInputRoot>
            </Field>
        </div>
    );
};


export default NumberInput;