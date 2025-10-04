import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import colors from "../../colors";

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_full,
    justifyContent: "space-around",
    padding: "2rem",
  },

  logoView: {
    flex: 1,
    justifyContent: 'center',
  },

  logoViewStep2:{
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
    gap: '0.5rem',
  },

  title: {
    fontSize: "1.25rem",
    fontWeight: "500",
    color: colors.primary_green_dark,
    textAlign: "center",
    marginBottom: "2rem",
  },
  
  subtext: {
    fontSize: "1rem",
    color: colors.contrastant_gray,
    textAlign: "center",
    marginBottom: "2rem",
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '1.5rem',
    gap: '0.25rem',
    marginTop: '1.5rem'
  },

  terms: {
    fontSize: "0.75rem",
    color: colors.contrastant_gray,
    textAlign: "center",
    marginBottom: "1.5rem",
  },

  icon: {
    width: "1.5rem",
    height: "1.5rem",
    marginRight: "0.5rem",
  },
});
