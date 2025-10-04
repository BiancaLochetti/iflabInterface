import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import colors from "../../colors";

const { width } = Dimensions.get('window')

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_full,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    padding: '2rem',
  },

  logoView: {
    justifyContent: 'center'
  },

  logo: {
    width: "12.5rem",
    height: "12.5rem",
    alignSelf: "center",
  },

  formView: {
    flex: 1,
    justifyContent: 'center'
  },

  subtitle: {
    alignSelf: "center",
    fontSize: "1.25rem",
    fontWeight: "500",
    textAlign: 'center',
    color: colors.input_text_gray,
    lineHeight: "1.25rem",
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2rem'
    // alignItems: "center",
    // alignSelf: "center",
    // marginBottom: "2.25rem",
    // borderBottomWidth: 1,
    // borderBottomColor: colors.emphasis_gray,
    // zIndex: 1000,
  },

  dropdown: {
    width: width > 400 ? "5rem" : "4.5rem",
    height: "2.5rem",
    borderRadius: "0.5rem",
    borderWidth: 1,
    borderColor: colors.emphasis_gray,
    backgroundColor: "#E0E0E0",
  },

  dropdownContainer: {
    borderRadius: "0.5rem",
    borderWidth: 1,
    borderColor: colors.emphasis_gray,
    backgroundColor: "#fff",
    zIndex: 1000,
  },

  dropdownText: {
    fontSize: "0.875rem",
    color: "#000",
  },

  dropdownPlaceholder: {
    color: "#333",
    fontSize: "0.875rem",
  },

  bottomSection: {
    marginTop: "1.25rem",
    alignItems: "center",
    marginBottom: "2rem",
  },

  registerButton: {
    backgroundColor: colors.primary_green_dark,
    paddingVertical: "0.875rem",
    borderRadius: "0.375rem",
    alignItems: "center",
    marginBottom: "1.5rem",
    width: "100%",
    maxWidth: "22.5rem",
    alignSelf: "center",
  },

  disabledButton: {
    backgroundColor: "#E0E0E0",
  },

  registerText: {
    color: "#FFFFFF",
    fontSize: "0.875rem",
    fontWeight: "400",
  },

  cancelButton: {
    marginBottom: "0.5rem",
  },

  cancelText: {
    color: "#2E5D2F",
    fontSize: "0.875rem",
    fontWeight: "400",
  },
});
