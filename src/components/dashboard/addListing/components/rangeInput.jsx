import {NumberInputField, NumberInputRoot} from "../../../ui/number-input";
import {Field} from "../../../ui/field";
import {Checkbox} from "../../../ui/checkbox";
import {useState} from "react";

const RangeInput = (props) => {
    const {
        unit = "fahrenheit",
        minUpper,
        maxUpper,
        minLower,
        maxLower,
        minLabel,
        maxLabel,
        onUpperChange = (e) => {
        },
        onLowerChange = (e) => {
        },
        option = {
            name: "Temperature control availability",
            onCheck: () => {
            }
        },
        error
    } = props;

    const [checked, setChecked] = useState(false);

    return (
        <div>
            <Field invalid={error} errorText={error}>
                <Checkbox
                    key={option.name}
                    className="chakraCheckBox"
                    colorPalette="green"
                    onCheckedChange={(e) => {
                        option.onCheck(e.checked);
                        setChecked(e.checked);
                    }}
                >
                    {option.name}
                </Checkbox>
            </Field>
            {
                checked ?
                    <div className="flex justify-between gap-2 ml-8">
                        <div>
                            <p className="text-sm">{minLabel}</p>
                            <NumberInputRoot
                                min={minLower}
                                max={maxLower}
                                className="border border-gray-400 rounded px-2"
                                defaultValue="0"
                                formatOptions={{
                                    style: "unit",
                                    unit: unit,
                                }}
                                onValueChange={(e) => onLowerChange(e.valueAsNumber)}
                            >
                                <NumberInputField className="outline-none"/>
                            </NumberInputRoot>
                        </div>

                        <div>
                            <p className="text-sm">{maxLabel}</p>
                            <NumberInputRoot
                                max={maxUpper}
                                min={minUpper}
                                className="border border-gray-400 rounded px-2 outline-none"
                                defaultValue="0"
                                formatOptions={{
                                    style: "unit",
                                    unit: unit,
                                }}
                                onValueChange={(e) => onUpperChange(e.valueAsNumber)}
                            >
                                <NumberInputField className="outline-none"/>
                            </NumberInputRoot>
                        </div>

                    </div> : <></>
            }
        </div>

    );
}

export default RangeInput;