import { StyleSheet } from "react-native";
import colors from "../../colors";

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

  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.primary_green_dark,
    textAlign: "center",
    marginBottom: 32,
  },

  subtext: {
    fontSize: 14,
    color: colors.contrastant_gray,
    textAlign: "center",
    marginBottom: 32,
  },

  inputGroup: {
    // flexDirection: "row",
    // alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#D0D0D0",
    // borderRadius: 10,
    // backgroundColor: "#FFF",
    // paddingHorizontal: 12,
    // paddingVertical: 10,
    marginBottom: 24,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  button: {
    // backgroundColor: "#2E5D2F",
    // paddingVertical: 16,
    // borderRadius: 10,
    // alignItems: "center",
    marginTop: 24,
    marginBottom: 30,
  },

  buttonDisabled: {
    backgroundColor: "#A5C3A5",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },

  link: {
    color: "#2E5D2F",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 16,
  },

  terms: {
    fontSize: 12,
    color: colors.contrastant_gray,
    textAlign: "center",
    marginBottom: 24,
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    marginTop: 16,
  },

  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.emphasis_gray,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: colors.white_full,
    marginHorizontal: 6,
  },
});