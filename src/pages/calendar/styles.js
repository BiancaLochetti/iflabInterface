import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white_full,
		paddingHorizontal: "1.2rem",
	},

	// ----------------------------------------------------------------

	header:{
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
    },

	// chevronImage: {
	// 	width: "1.5rem",
	// 	height: "1.5rem",
	// 	tintColor: colors.contrastant_gray,
	// 	transform: [{ rotate: "90deg" }],
	// },

	// headerText: {
	// 	flex: 1,
	// 	textAlign: "center",
	// 	fontSize: 16,
	// },

	// ---------------------------------------------------------------

	dataView: {
		marginBottom: "0.625rem",
		justifyContent: "center",
		height: "20%",
	},

	titleFree: {
		fontSize: 16,
		fontWeight: "small",
		fontFamily: "Inter",
		flex: 1,
		textAlign: "center",
	},

	textFont: {
		fontSize: 16,
		color: colors.primary_text_gray,
		fontWeight: "normal",
	},

	loadingText: {
		textAlign: "center",
		color: "#555",
	},
	
	showAllButton: {
		marginTop: "0.5rem",
		alignSelf: "flex-start",
		paddingVertical: "0.25rem",
		paddingHorizontal: "0.75rem",
		backgroundColor: colors.primary_light,
		borderRadius: "0.375rem",
	},

	showAllText: {
		color: colors.primary_text_gray,
		fontSize: "0.875rem",
		fontWeight: "600",
	},

	sessionWrapper: {
		marginBottom: "0.75rem",
	},
});

export default styles;
