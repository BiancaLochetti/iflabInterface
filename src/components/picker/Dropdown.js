// Imports
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente Principal
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
      placeholderStyle={{ fontSize: 12 }}
      style={{
        width: "auto",
        minWidth: 115,
        height: "auto",
        minHeight: 40,
        backgroundColor: colors.white_medium,
        borderWidth: 0,
      }}
      dropDownContainerStyle={{
        width: "auto",
        minWidth: 115,
        backgroundColor: colors.white_medium,
        borderWidth: 0,
      }}
    />
  );
};

export default Dropdown;
