import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

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

const styles = EStyleSheet.create({
  dropdown: {
    width: "100%",
    minWidth: "7.1875rem",
    minHeight: "2.5rem",
    backgroundColor: colors.white_medium,
    borderWidth: 0,
  },

  dropDownContainer: {
    width: "100%",
    minWidth: "7.1875rem",
    backgroundColor: colors.white_medium,
    borderWidth: 0,
  },
});
