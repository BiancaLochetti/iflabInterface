import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import colors from "../../colors";

export const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white_full,
		padding: "2rem",
	},

	// ----------------------------------------

	logoView: {
		flex: 1,
		justifyContent: "center",
	},

	logoViewStep2: {
		justifyContent: "center",
	},

	logo: {
		width: "60%",
		height: "60%",
		alignSelf: "center",
	},

	// ----------------------------------------

	formView: {
		flex: 1,
		justifyContent: "center",
		gap: "0.2rem",
	},

	title: {
		fontSize: "1.25rem",
		fontWeight: "500",
		color: colors.primary_green_dark,
		textAlign: "center",
		marginBottom: "2rem",
	},

	subtext: {
		fontSize: "1rem",
		color: colors.contrastant_gray,
		textAlign: "center",
		marginBottom: "2rem",
	},

	// ----------------------------------------

	buttonView: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: "1.5rem",
	},

	terms: {
		fontSize: "0.75rem",
		color: colors.contrastant_gray,
		textAlign: "center",
		marginVertical: "1rem",
	},

	// ----------------------------------------

	dropdown: {
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#f5f5f5",
		paddingHorizontal: 10,
		height: 55,
		justifyContent: "center",
	},

	dropdownContainer: {
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#fff",
		elevation: 3,
		marginTop: 5,
	},

	dropdownPlaceholder: {
		color: "#777",
		fontSize: 16,
	},

	dropdownLabel: {
		color: "#333",
		fontSize: 16,
	},

	dropdownSelected: {
		fontWeight: "bold",
		color: colors.primary_green_dark,
	},

	dropdownItem: {
		fontSize: 15,
		color: "#555",
	},

	dropdownArrow: {
		tintColor: "#333",
	},
});
