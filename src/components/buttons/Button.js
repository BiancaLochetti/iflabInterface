// Imports
import { TouchableOpacity, Text, View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Funções para mudança de cor e texto:
const changeStyle = (type) => {
	switch (type) {
		case "Green":
			return [styles.gButton];
		case "Red":
			return [styles.rButton];
		case "White":
			return [styles.wButton];
	}
};

const changeText = (type) => {
	switch (type) {
		case "Green":
			return [styles.gText];
		case "Red":
			return [styles.rText];
		case "White":
			return [styles.wText];
	}
};

//----------------------------------------------------------------------------------------------

// Componente Principal
const Button = ({ text, onPress, disabled = false, icon = null, type }) => {
	return (
		<TouchableOpacity
			style={[
				changeStyle(type),
				disabled && { backgroundColor: colors.contrastant_gray },
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<View style={[styles.contentW, icon && styles.content]}>
				{icon && (
					<Image
						source={icon}
						style={[
							styles.icon,
							disabled && { tintColor: colors.input_text_gray },
							type === "White" && { tintColor: colors.contrastant_gray },
						]}
						resizeMode="contain"
					/>
				)}
				<Text
					style={[
						changeText(type),
						disabled && { color: colors.input_text_gray },
					]}
				>
					{text}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Button;

//----------------------------------------------------------------------------------------------

// Styles
const styles = EStyleSheet.create({
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "0.625rem",
		width: "auto",
		padding: "0.9rem",
	},

	contentW: {
		justifyContent: "center",
		alignItems: "center",
		padding: "0.9rem",
	},

	icon: {
		width: "1rem",
		height: "1rem",
		tintColor: colors.white_full,
	},

	gButton: {
		backgroundColor: colors.primary_green_dark,
		borderRadius: "0.375rem",
		width: "auto",
		alignItems: "center",
	},

	gText: {
		color: colors.white_full,
		textAlign: "center",
		fontSize: "1rem",
	},

	rButton: {
		backgroundColor: colors.alert_red_btns,
		borderRadius: "0.375rem",
		width: "auto",
		alignItems: "center",
	},

	rText: {
		color: colors.white_full,
		textAlign: "center",
		fontSize: "1rem",
	},

	wButton: {
		backgroundColor: colors.white_full,
		borderRadius: "0.375rem",
		width: "auto",
		alignItems: "center",
	},

	wText: {
		color: colors.secundary_green,
		textAlign: "center",
		fontSize: "1rem",
	},
});
