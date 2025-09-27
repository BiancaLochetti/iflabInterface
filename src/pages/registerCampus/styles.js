import { StyleSheet } from "react-native";
import colors from '../../colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_full,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 64,
  },

  topSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 24,
  },

  formSection: {
    flex: 1,
    marginTop: 24,  
    marginBottom: 50,
  },

  subtitle: {
    alignSelf: "center",
    maxWidth: 360,
    textAlign: "left",
    fontSize: 14,
    color: colors.input_text_gray,
    fontWeight: "400",
    lineHeight: 20,
    marginBottom: 0, 
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 360,
    alignSelf: "center",
    marginBottom: 36,
    borderBottomWidth: 1,
    borderBottomColor: colors.emphasis_gray,
    zIndex: 1000, 
  },

  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    color: "#333",
    fontWeight: "300",
  },

  iconRight: {
    marginHorizontal: 8,
  },

  dropdown: {
    width: 80,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.emphasis_gray,
    backgroundColor: "#E0E0E0",
  },

  dropdownContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.emphasis_gray,
    backgroundColor: "#fff",
    zIndex: 1000,
  },

  dropdownText: {
    fontSize: 14,
    color: "#000",
  },

  dropdownPlaceholder: {
    color: "#333",
    fontSize: 14,
  },

  bottomSection: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 32,
  },

  registerButton: {
    backgroundColor: colors.primary_green_dark,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
    maxWidth: 360,
  },

  disabledButton: {
    backgroundColor: "#E0E0E0",
  },

  registerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
  },

  cancelButton: {
    marginBottom: 8,
  },

  cancelText: {
    color: "#2E5D2F",
    fontSize: 14,
    fontWeight: "400",
  },
});
