// Imports
import { TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
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
				autoCapitalize="none"
			/>

			{/* //Condição caso o tipo seja senha */}
			{type === "password" ? (
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
const styles = EStyleSheet.create({
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: "0.0625rem",
		borderBottomColor: colors.primary_text_gray,
		paddingLeft: "0.3125rem",
		justifyContent: "space-between",
	},

	inputBorder: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderWidth: "0.0625rem",
		borderColor: colors.primary_text_gray,
		paddingLeft: "0.3125rem",
		borderRadius: "0.5rem",
	},

	input: {
		paddingTop: "1.125rem",
		paddingBottom: "1.125rem",
		color: colors.primary_text_gray,
		outlineStyle: "none",
		fontSize: "1rem",
		width: "100%",
	},

	iconImage: {
		width: "3vw",
		height: "3vh",
		tintColor: colors.primary_text_gray,
		paddingRight: "2.5rem",
	},
});
