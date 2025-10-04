import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import colors from '../../colors';

const { width } = Dimensions.get('window');

export const loginStyles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_full,
    padding: '2rem',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  logoView: {
    flex: 1,
    alignItems: 'center',
  },

  logo: {
    width: "12.5rem", 
    height: "12.5rem", 
  },

  formView: {
    flex: 1,
    justifyContent: 'center',
  },

  label: {
    fontSize: "1.25rem",
    fontWeight: "500",
    color: colors.primary_green_dark,
    textAlign: "center",
    marginBottom: "2rem",
  },

  inputs: {
    gap: '4rem', 
  },

  buttonView: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: '1rem'
  },

  buttonContainer: {
    gap: '1rem',
  },
});
