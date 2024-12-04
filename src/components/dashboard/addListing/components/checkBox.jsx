import {Checkbox} from "../../../ui/checkbox";

const CheckBox = (props) => {

    const {
        option = {},
        value,
        id
    } = props;

    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                <Checkbox
                    id={id}
                    key={option.name}
                    className="chakraCheckBox"
                    colorPalette="green"
                    checked={value}
                    onCheckedChange={(e) => option.onCheck(e.checked)}
                >
                    {option.name}
                </Checkbox>
            </div>
        </div>
    );
};

export default CheckBox;