import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

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
    flex: 1,
    justifyContent: 'center'
  },

  logo: {
    width: "12.5rem",
    height: "12.5rem",
    alignSelf: "center",
  },

  formView: {
    flex: 1,
    justifyContent: 'center',
    gap: '1rem'
  },

  subtitle: {
    alignSelf: "center",
    fontSize: "1.25rem",
    fontWeight: "500",
    textAlign: 'center',
    color: colors.primary_green_dark,
    lineHeight: "1.25rem",
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdown: {
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

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '1.5rem',
    gap: '1rem',
  },

});
