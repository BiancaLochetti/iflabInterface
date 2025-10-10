// Import
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

export const styles = EStyleSheet.create({
	container: {
		padding: "2rem",
		flex: 1,
		backgroundColor: colors.white_full,
	},

	// ----------------------------------------

	logoView: {
		flex: 1,
		justifyContent: "center",
	},

	logo: {
		width: "60%",
		height: "60%",
		alignSelf: "center",
	},

	// ----------------------------------------

	formView: {
		flex: 2,
		justifyContent: "center",
		gap: "0.5rem",
	},

	label: {
		fontSize: "1.25rem",
		fontWeight: "500",
		color: colors.primary_green_dark,
		textAlign: "center",
		marginBottom: "2rem",
	},

	inputs: {
		gap: "1rem",
		width: "80%",
		alignSelf: "center",
	},

	// ----------------------------------------

	buttonView: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: "1.5rem",
		gap: "0.25rem",
	},

	buttonContainer: {
		gap: "1rem",
	},
});
