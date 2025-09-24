import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
    alignItems: "center",
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 32,
    alignSelf: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000000", // preto, como na imagem
    textAlign: "center",
    marginBottom: 24,
  },

  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    width: "100%",
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

  subtext: {
    fontSize: 14,
    color: "#999999", // cinza claro
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#2E5D2F", // verde ativo
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },

  buttonDisabled: {
    backgroundColor: "#D0D0D0", // cinza inativo
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },

  terms: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },

  link: {
    color: "#2E5D2F",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 8,
  },
});