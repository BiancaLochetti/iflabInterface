import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white_full,
		paddingHorizontal: "2rem",
	},

	// ----------------------------------------------------------------

	headerView: {
		height: "10%",
		justifyContent: "center",
	},

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
});

export default styles;
