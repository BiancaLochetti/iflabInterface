import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../colors";
import EStyleSheet from "react-native-extended-stylesheet";

const { width } = Dimensions.get("window");
const C = colors;

export const styles = EStyleSheet.create({
	// Tela geral
	container: {
		flex: 1,
		backgroundColor: C.white_full,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: C.white_full,
	},

	// Header superior fixo
	infoHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingTop: 40,
		paddingBottom: 10,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
	},

	deleteButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "transparent",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		marginRight: 10,
	},

	deleteButtonText: {
		color: C.alert_red_btns,
		marginRight: 5,
		fontSize: 14,
	},

	// Scroll da tela
	infoScrollContainer: {
		paddingTop: 120,
		paddingHorizontal: 20,
		paddingBottom: 40,
		backgroundColor: C.white_full,
	},

	// ÁREA DA IMAGEM / CINZA
	infoImageBackground: {
		width: "82%",     // 🔥 ligeiramente menor (antes 85%)
		height: 145,      // 🔥 ligeiramente menor (antes 155)
		backgroundColor: "#E0E0E0",
		borderRadius: 12,

		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",

		marginBottom: 20,
		marginTop: -32,   // 🔥 pouquíssimo mais pra cima
		overflow: "hidden",
	},

	// Campos editáveis
	infoField: {
		backgroundColor: C.white_medium,
		borderRadius: 8,
		padding: 15,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: C.emphasis_gray,
	},

	infoFieldEditable: {
		borderWidth: 2,
		borderColor: C.secundary_green,
		backgroundColor: C.white_full,
		opacity: 1,
	},

	infoLabel: {
		fontSize: 14,
		color: C.contrastant_gray,
	},

	infoValue: {
		fontSize: 16,
		color: C.primary_text_gray,
	},

	// Modal
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},

	modalView: {
		width: width * 0.9,
		backgroundColor: C.white_full,
		borderRadius: 10,
		padding: 25,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		color: C.primary_text_gray,
	},

	modalInput: {
		width: "100%",
		borderWidth: 1,
		borderColor: C.emphasis_gray,
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		fontSize: 16,
		color: C.primary_text_gray,
	},

	modalButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},

	modalCancelButton: {
		flex: 1,
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
		backgroundColor: C.white_dark,
		alignItems: "center",
	},

	modalSaveButton: {
		flex: 1,
		padding: 10,
		borderRadius: 5,
		backgroundColor: C.primary_green_dark,
		alignItems: "center",
	},

	modalSaveButtonDisabled: {
		backgroundColor: C.white_dark,
	},

	modalCancelText: {
		color: C.primary_text_gray,
		fontWeight: "bold",
	},

	modalSaveText: {
		color: C.white_full,
		fontWeight: "bold",
	},
});
