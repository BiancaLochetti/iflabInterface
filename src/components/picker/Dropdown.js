// Imports
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente principal
const Dropdown = ({ items, placeholder, value, setValue }) => {
	const [open, setOpen] = useState(false);

	return (
		<DropDownPicker
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={setValue}
			setItems={() => {}}
			placeholder={placeholder}
			closeOnBlur={true}
			placeholderStyle={{ fontSize: EStyleSheet.value("0.75rem") }}
			style={styles.dropdown}
			dropDownContainerStyle={styles.dropDownContainer}
		/>
	);
};

export default Dropdown;

//----------------------------------------------------------------------------------------------

// Styles
const styles = EStyleSheet.create({
	dropdown: {
		minWidth: "10%",
		backgroundColor: colors.white_medium,
		borderWidth: 0,
	},

	dropDownContainer: {
		minWidth: "10%",
		backgroundColor: colors.white_medium,
		borderWidth: 0,
	},
});
