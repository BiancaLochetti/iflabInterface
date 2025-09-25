// Imports
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Funções para mudança de cor e texto:
const changeStyle = (type) => {
  switch (type) {
    case "Green":
      return [styles.gButton];
    case "Red":
      return [styles.rButton];
    case "White":
      return [styles.wButton];
  }
};

const changeText = (type) => {
  switch (type) {
    case "Green":
      return [styles.gText];
    case "Red":
      return [styles.rText];
    case "White":
      return [styles.wText];
  }
};

//----------------------------------------------------------------------------------------------

// Componente Principal
const Button = ({ text, onPress, disabled = false, icon = null, type }) => {
  return (
    <TouchableOpacity
      style={[
        changeStyle(type),
        disabled && { backgroundColor: colors.contrastant_gray },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[
        styles.contentW,
        icon && styles.content
      ]}>
        {icon && (
          <Image
            source={icon}
            style={[
              styles.icon,
              disabled && { tintColor: colors.input_text_gray },
              type === "White" && { tintColor: colors.contrastant_gray },
            ]}
            resizeMode="contain"
          />
        )}
        <Text
          style={[
            changeText(type),
            disabled && { color: colors.input_text_gray },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

//----------------------------------------------------------------------------------------------

// Styles
const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "auto",
    padding: 18,
  },

  contentW:{
    justifyContent: 'center',
    alignItems: "center",
    width: "auto",
    padding: 18,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: colors.white_full,
  },

  // Estilos de Cor
  gButton: {
    backgroundColor: colors.primary_green_dark,
    borderRadius: 6,
    width: "auto",
    alignItems: "center",
  },

  gText: {
    color: colors.white_full,
    fontSize: 16,
  },

  rButton: {
    backgroundColor: colors.alert_red_btns,
    borderRadius: 6,
    width: "auto",
    alignItems: "center",
  },

  rText: {
    color: colors.white_full,
    fontSize: 16,
  },

  wButton: {
    backgroundColor: colors.white_full,
    borderRadius: 6,
    width: "auto",
    alignItems: "center",
  },

  wText: {
    color: colors.secundary_green,
    fontSize: 16,
  },
});
