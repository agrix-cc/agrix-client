import {Checkbox} from "../../../ui/checkbox";

const CheckBox = (props) => {

    const {
        option = {},
    } = props;

    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                <Checkbox
                    key={option.name}
                    className="chakraCheckBox"
                    colorPalette="green"
                    onCheckedChange={(e) => option.onCheck(e.checked)}
                >
                    {option.name}
                </Checkbox>
            </div>
        </div>
    );
};

export default CheckBox;