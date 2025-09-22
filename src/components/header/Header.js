// Imports
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente Principal
const Header = ({ icon = null, text }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ position: "absolute", left: 20 }}>
        <Image
          source={icon}
          style={{
            tintColor: colors.contrastant_gray,
            width: 30,
            height: 30,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={{ textAlign: "center", fontSize: 16 }}>
        {text}
      </Text>
    </View>
  );
};

export default Header;

//----------------------------------------------------------------------------------------------

// Styles
const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
