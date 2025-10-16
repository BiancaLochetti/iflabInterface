import colors from "../../colors";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_full,
    paddingHorizontal: "1.2rem",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },
});

export default styles;
