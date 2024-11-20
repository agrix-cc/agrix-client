import {SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText} from "../../../ui/select";
import {createListCollection} from "@chakra-ui/react";
import {Field} from "../../../ui/field";

const SelectInput = (props) => {

    const {items = [], onChange = () => {}, placeholder, label, error, required, value="", className="", disabled=false} = props;

    const options = createListCollection({
        items: items,
    });

    return (
        <Field invalid={error} errorText={error}>
            <SelectRoot
                disabled={disabled}
                value={[value]}
                required={required}
                collection={options}
                onValueChange={(e) => onChange(e.value[0])}
                size="sm">
                <SelectLabel className="text-[16px] font-normal">{label}</SelectLabel>
                <SelectTrigger
                    className={`border ${error ? 'border-red-500' : 'border-gray-400'} rounded px-4 py-1`}>
                    <SelectValueText placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent className={className}>
                    {options.items.map((option) => (
                        <SelectItem item={option} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </Field>
    );
};

export default SelectInput;