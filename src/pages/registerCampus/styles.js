import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  topSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 160,  
    height: 64,
    resizeMode: "contain",
    marginBottom: 16,
  },

  formSection: {
    flex: 1,
    marginTop: 30,      
    marginBottom: 50,    
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#4A4A4A",
    fontWeight: "400",
    lineHeight: 20,
    marginBottom: 28,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    fontSize: 15,
    paddingVertical: 8,
    marginRight: 12,
    color: "#333",
    fontWeight: "300",
  },
  pickerContainer: {
    width: 80,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  picker: {
    height: 40,
    color: "#333",
    fontSize: 14,
  },

  bottomSection: {
    marginTop: "auto",
    marginBottom: 32,
  },
  registerButton: {
    backgroundColor: "#2E5D2F",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
  },
  cancelButton: {
    alignItems: "center",
  },
  cancelText: {
    color: "#2E5D2F",
    fontSize: 14,
    fontWeight: "400",
  },
});