import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../colors';

const { width } = Dimensions.get('window');
const C = colors;

export const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: C.white_full,
		paddingHorizontal: '1.2rem',
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: C.white_full,
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: '10%',
		position: 'relative',
	},

	searchRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '1rem',
		width: '100%',
	},

	searchInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: C.white_medium,
		borderRadius: 12,
		paddingHorizontal: '1rem',
		paddingVertical: '0.6rem',
		flex: 1,
	},

	searchInput: {
		flex: 1,
		fontSize: 16,
		color: C.primary_text_gray,
		paddingHorizontal: 10,
	},

	addElementButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: C.white_dark,
		borderRadius: 12,
		paddingHorizontal: 10,
		height: 36,
		maxWidth: '35%',
	},

	addElementText: {
		fontSize: 13,
		color: C.primary_text_gray,
		marginLeft: 4,
		flexShrink: 1,
	},

	qrIcon: {
		marginLeft: 10,
	},

	listContainer: {
		paddingBottom: '2rem',
	},

	listItemContainer: {
		backgroundColor: C.white_medium,
		borderRadius: 10,
		padding: '1rem',
		marginBottom: '0.8rem',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	listItemTextContent: {
		flex: 1,
		paddingRight: '0.5rem',
	},

	listItemName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: C.primary_text_gray,
		marginBottom: 4,
	},

	listItemDetail: {
		fontSize: 14,
		color: C.primary_text_gray,
		marginBottom: 2,
	},

	listItemAdminLevelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 6,
		backgroundColor: C.white_dark,
		borderRadius: 6,
		paddingHorizontal: 6,
		paddingVertical: 4,
	},

	listItemAdminLevelText: {
		marginLeft: 4,
		fontSize: 12,
		color: C.primary_text_gray,
		fontStyle: 'italic',
	},

	listItemRightContent: {
		alignItems: 'flex-end',
	},

	listItemQuantity: {
		fontSize: 14,
		fontWeight: 'bold',
		color: C.primary_text_gray,
		backgroundColor: C.white_dark,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		textAlign: 'center',
		minWidth: 60,
	},

	listItemValidity: {
		fontSize: 12,
		color: C.alert_red_btns,
		marginTop: 6,
	},

	noElementsText: {
		textAlign: 'left',
		fontSize: 14,
		color: C.primary_text_gray,
		marginTop: '1rem',
		paddingHorizontal: '1rem',
	},
});