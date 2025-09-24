// Imports
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { useState } from "react";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente Principal
const InputText = ({ placeHolder, type, icon, onChange, border = false }) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleOnChange(text) {
    setValue(text);
    onChange && onChange(text);
  }

  return (
    <View style={[styles.inputContainer, border && styles.inputBorder]}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor={colors.emphasis_gray}
        secureTextEntry={type === "password" && !showPassword}
        value={value}
        onChangeText={handleOnChange}
        keyboardType={type}
      />

      {/* //Condição caso o tipo seja senha */}
      {type === "password" ? (
        // Se for senha:
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={
              showPassword
                ? require("../../assets/icons/UI/show.png")
                : require("../../assets/icons/UI/hide.png")
            }
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        // Se não for senha:
        <View>
          <Image source={icon} style={styles.iconImage} resizeMode="contain" />
        </View>
      )}
    </View>
  );
};

export default InputText;

//----------------------------------------------------------------------------------------------

// Styles
const styles = StyleSheet.create({
  inputContainer: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary_text_gray,
    paddingLeft: 5
  },

  inputBorder:{
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary_text_gray,
    paddingLeft: 5,
    borderRadius: 8
  },

  input: {
    flex: 1,
    paddingTop: 18,
    paddingBottom: 18,
    color: colors.primary_text_gray,
  },

  iconImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
    tintColor: colors.primary_text_gray,
    paddingRight: 5
  },
});
