import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: "2rem",
    flex: 1,
    backgroundColor: colors.white_full,
  },

  // -------------------------------------------------------

  headerView: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: "6rem",
    height: "6rem"
  },

  profile: {
    height: "3.125rem",
    width: "3.125rem",
    borderRadius: "3.125rem",
    filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25))",
  },

  // -------------------------------------------------------

  addLabView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "1.25rem",
    zIndex: -10
  },

  // -------------------------------------------------------

  contentView: {
    marginTop: "1.25rem",
    alignItems: "center",
    gap: "0.9375rem",
    paddingVertical: "1rem",
  },


});

export default styles;
