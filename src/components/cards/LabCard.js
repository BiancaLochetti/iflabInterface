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
        ? colors.primary_green_dark
        : colors.emphasis_gray,
    },
  ];

  const iconStyle = [
    styles.icon,
    { tintColor: status ? colors.white_full : colors.primary_text_gray },
  ];

  const textStyle = [
    styles.text,
    { color: status ? colors.white_full : colors.contrastant_gray },
  ];

  return (
    <TouchableOpacity style={cardStyle} disabled={!status} onPress={onPress}>
      <View style={styles.header}>
        <Text style={textStyle}>
          Laboratório <Text style={{ fontWeight: "bold" }}>{lab}</Text>
        </Text>
        <View style={{ flexDirection: "row", gap: "0.5rem" }}>
          {status === 0 ? (
            <>
              <Image
                style={iconStyle}
                resizeMode="contain"
                source={require("../../assets/icons/UI/check.png")}
              />
              <Text style={textStyle}>Em uso no momento</Text>
            </>
          ) : (
            <>
              <Image
                style={iconStyle}
                resizeMode="contain"
                source={require("../../assets/icons/UI/alert.png")}
              />
              <Text style={textStyle}>Livre para reservar</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.content}>
        {status === 0 ? (
          <>
            <Text style={textStyle}>Informações da última sessão:</Text>
            <Text style={textStyle}>Responsável: {lastResp}</Text>
            <Text style={textStyle}>Horário: {lastHour}</Text>
          </>
        ) : (
          <>
            <Text style={textStyle}>Informações da sessão atual:</Text>
            <Text style={textStyle}>Responsável: {responsable}</Text>
            <Text style={textStyle}>Horário estipulado: {hour}</Text>
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
    width: "90%",
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
    fontSize: "1rem",
    flexDirection: "row",
  },

  icon: {
    width: "1.375rem",
    height: "1.375rem",
    marginLeft: "0.625rem",
  },
});
