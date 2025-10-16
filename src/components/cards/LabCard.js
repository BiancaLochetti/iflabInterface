// Imports
import { Text, View, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente Principal
const LabCard = ({
  onPress,
  lab,
  status,
  responsable,
  hour,
  lastResp = null,
  lastHour = null,
}) => {
  const cardStyle = [
    styles.card,
    {
      backgroundColor: status
        ? colors.emphasis_gray
        : colors.primary_green_dark,
    },
  ];

  const iconStyle = [
    styles.icon,
    { tintColor: status ? colors.primary_text_gray : colors.white_full },
  ];

  const textStyle = [
    styles.text,
    { color: status ? colors.contrastant_gray : colors.white_full },
  ];

  return (
    <TouchableOpacity style={cardStyle} disabled={status === 1} onPress={onPress}>
      <View style={styles.header}>
        <Text style={textStyle}>
          Laboratório <Text style={{ fontWeight: "bold" }}>{lab}</Text>
        </Text>
        <View style={{ flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          {status === 0 ? (
            <>
              <Image
                style={iconStyle}
                resizeMode="contain"
                source={require("../../assets/icons/UI/check.png")}
              />
              <Text style={textStyle}>Livre</Text>
            </>
          ) : (
            <>
              <Image
                style={iconStyle}
                resizeMode="contain"
                source={require("../../assets/icons/UI/alert.png")}
              />
              <Text style={textStyle}>Em uso</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.content}>
        {status === 0 ? (
          <>
            <Text style={textStyle}>Informações da última sessão:</Text>
            <Text style={textStyle}>Responsável: {lastResp}</Text>
            {/* <Text style={textStyle}>Horário: {lastHour}</Text> */}
          </>
        ) : (
          <>
            <Text style={textStyle}>Informações da sessão atual:</Text>
            <Text style={textStyle}>Responsável: {responsable}</Text>
            {/* <Text style={textStyle}>Horário estipulado: {hour}</Text> */}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LabCard;

//----------------------------------------------------------------------------------------------

// Styles
const styles = EStyleSheet.create({
  card: {
    height: "9.375rem",
    width: "100%",
    borderRadius: "0.625rem",
    padding: "0.625rem",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  text: {
    color: colors.white_full,
    fontSize: "0.875rem",
    flexDirection: "row",
  },

  icon: {
    width: "1.375rem",
    height: "1.375rem",
    marginLeft: "0.625rem",
  },
});
