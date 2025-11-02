import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../colors';

const C = colors;

export const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: C.white_full,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: C.white_full,
	},

	backButton: {
		padding: 10,
	},

	newElementScrollContainer: {
		paddingTop: '6rem',
		paddingHorizontal: '1.5rem',
		paddingBottom: '2rem',
	},

	newElementHeader: {
		alignItems: 'center',
		marginBottom: '2rem',
	},

	newElementTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: C.primary_green_dark,
		marginBottom: '1rem',
	},

	imagePlaceholder: {
		width: 80,
		height: 80,
		borderRadius: 12,
		backgroundColor: C.white_medium,
		justifyContent: 'center',
		alignItems: 'center',
	},

	newElementInput: {
		backgroundColor: C.white_medium,
		borderRadius: 12,
		paddingHorizontal: '1rem',
		paddingVertical: '0.9rem',
		fontSize: 15,
		color: C.primary_text_gray,
		marginBottom: '0.8rem',
	},

	newElementFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: '1.5rem',
		paddingVertical: '1rem',
		borderTopWidth: 1,
		borderTopColor: C.white_dark,
	},

	cancelButton: {
		flex: 1,
		backgroundColor: C.white_medium,
		borderRadius: 12,
		paddingVertical: '0.9rem',
		alignItems: 'center',
		marginRight: 10,
	},

	cancelButtonText: {
		color: C.primary_text_gray,
		fontSize: 15,
		fontWeight: 'bold',
	},

	saveButton: {
		flex: 1,
		borderRadius: 12,
		paddingVertical: '0.9rem',
		alignItems: 'center',
	},

	saveButtonText: {
		fontSize: 15,
		fontWeight: 'bold',
	},
});