// Imports
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
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
        <View style={{ flexDirection: "row", gap: 8 }}>
          {status ? (
            <>
              <Image
                style={iconStyle}
                resizeMode="contain"
                source={require("../../assets/icons/UI/check.png")}
              />
              <Text style={textStyle}>Livre para reservar</Text>
            </>
          ) : (
            <>
              <Image
                style={iconStyle}
                resizeMode="contain"
                source={require("../../assets/icons/UI/alert.png")}
              />
              <Text style={textStyle}>Em uso no momento</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.content}>
        {status ? (
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

//--------------------------------------------------------

// Styles
const styles = StyleSheet.create({
  card: {
    height: 150,
    width: "90%",
    borderRadius: 10,
    padding: 10,
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
    fontSize: 16,
    flexDirection: "row",
  },

  icon: {
    width: 22,
    height: 22,
    marginLeft: 10,
  },
});
