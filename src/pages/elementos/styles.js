import { StyleSheet, Dimensions } from 'react-native';
import colors from "../../colors"; 
import EStyleSheet from "react-native-extended-stylesheet";

const { width } = Dimensions.get('window');

const C = colors; 

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.white_full, 
        paddingHorizontal: "1.2rem",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: C.white_full,
    },
    
    header:{
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
    },
    
    logo: {
        width: 120, 
        height: 48,
        resizeMode: 'contain',
    },
    
    profileImagePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: C.white_dark, 
        borderWidth: 1,
        borderColor: C.emphasis_gray,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.white_full,
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        color: C.primary_text_gray,
    },
    addElementButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: C.white_dark, 
        borderWidth: 0, 
    },
    addElementText: {
        marginLeft: 5,
        color: C.primary_text_gray, 
        fontSize: 12,
        fontWeight: 'normal', 
    },
    qrIcon: {
        marginLeft: 15,
    },
    listContainer: {
        padding: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: C.white_medium, 
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        elevation: 1, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    listItemTextContent: {
        flex: 1,
    },
    listItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: C.primary_text_gray,
    },
    listItemDetail: {
        fontSize: 14,
        color: C.primary_text_gray, 
        marginTop: 2,
    },
    listItemAdminLevelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    listItemAdminLevelText: {
        fontSize: 12,
        color: C.primary_text_gray, 
        marginLeft: 5,
        fontStyle: 'italic',
    },
    listItemRightContent: {
        alignItems: 'flex-end',
    },
    listItemQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: C.primary_text_gray, 
        backgroundColor: C.white_dark, 
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
    },
    listItemValidity: {
        fontSize: 12,
        color: C.alert_red_btns, 
        marginTop: 5,
    },
    noElementsText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: C.contrastant_gray,
    },
    
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, 
    },
    backButton: {
        padding: 10,
        backgroundColor: 'transparent', 
        borderRadius: 50,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent', 
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
    editIcon: {
        padding: 10,
        backgroundColor: 'transparent', 
        borderRadius: 50,
    },
    infoScrollContainer: {
        paddingTop: 200, 
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: C.white_full, 
    },
    infoImageBackground: {
        width: '100%',
        height: 250,
        position: 'absolute',
        top: 0,
        resizeMode: 'cover',
    },
    infoField: {
        backgroundColor: C.white_medium, 
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontWeight: 'normal',
        color: C.primary_text_gray,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoGridItemContainer: {
        width: '48%', 
    },
    
    // Modals
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: width * 0.9,
        backgroundColor: C.white_full,
        borderRadius: 10,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: C.primary_text_gray,
    },
    modalInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: C.emphasis_gray,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        color: C.primary_text_gray,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalCancelButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: C.white_dark, 
        alignItems: 'center',
    },
    modalSaveButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: C.primary_green_dark, 
        alignItems: 'center',
    },
    modalSaveButtonDisabled: {
        backgroundColor: C.white_dark,
    },
    modalCancelText: {
        color: C.primary_text_gray,
        fontWeight: 'bold',
    },
    modalSaveText: {
        color: C.white_full,
        fontWeight: 'bold',
    },
    modalSaveTextDisabled: {
        color: C.contrastant_gray,
    },

    newElementScrollContainer: {
        padding: 20,
        paddingTop: 60, 
        alignItems: 'center',
    },
    newElementHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    newElementTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: C.primary_text_gray,
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        backgroundColor: C.white_medium,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: C.emphasis_gray,
        borderStyle: 'dashed',
    },
    newElementInput: {
        width: '100%',
        backgroundColor: C.white_full,
        borderWidth: 1,
        borderColor: C.emphasis_gray,
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        color: C.primary_text_gray,
    },
    newElementFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: C.emphasis_gray,
        backgroundColor: C.white_full,
    },
    cancelButton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        backgroundColor: C.white_dark,
        marginRight: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: C.primary_text_gray,
        fontWeight: 'bold',
    },
    saveButton: {
        flex: 2,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: C.white_full,
        fontWeight: 'bold',
    },
    saveButtonTextDisabled: {
        color: C.contrastant_gray,
    }
});