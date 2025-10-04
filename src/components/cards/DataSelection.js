// Imports
import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Dropdown from "../picker/Dropdown";
import { useState } from "react";
import colors from "../../colors";
//----------------------------------------------------------------------------------------------

// Componente Principal
export function DataSelection() {
  const year = Array.from({ length: 8 }, (_, i) => ({
    label: String(2025 - i),
    value: String(2025 - i),
  }));

  const month = [
    { label: "Janeiro", value: "Janeiro" },
    { label: "Fevereiro", value: "Fevereiro" },
    { label: "Março", value: "Março" },
    { label: "Abril", value: "Abril" },
    { label: "Maio", value: "Maio" },
    { label: "Junho", value: "Junho" },
    { label: "Julho", value: "Julho" },
    { label: "Agosto", value: "Agosto" },
    { label: "Setembro", value: "Setembro" },
    { label: "Outubro", value: "Outubro" },
    { label: "Novembro", value: "Novembro" },
    { label: "Dezembro", value: "Dezembro" },
  ];

  const day = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

  const restoreDropdowns = () => {
    setValue1(null);
    setValue2(null);
    setValue3(null);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "0.625rem" }}>
        <Text style={styles.titleFree}>Selecione a Data:</Text>
      </View>
      <View style={styles.header}>
        <View style={[styles.cardFree, { zIndex: 1000 }]}>
          <Dropdown
            items={year}
            placeholder="Ano"
            value={value1}
            setValue={setValue1}
          />
        </View>
        <View style={[styles.cardFree, { zIndex: 900 }]}>
          <Dropdown
            items={month}
            placeholder="Mês"
            value={value2}
            setValue={setValue2}
          />
        </View>
        <View style={[styles.cardFree, { zIndex: 800 }]}>
          <Dropdown
            items={day}
            placeholder="Dia"
            value={value3}
            setValue={setValue3}
          />
        </View>
        <View style={styles.cardFree}>
          <TouchableOpacity onPress={restoreDropdowns}>
            <Image
              style={[
                styles.cardFree,
                { width: "3.75rem", flexBasis: undefined },
              ]} // 60px → 3.75rem
              resizeMode="center"
              source={require("../../assets/icons/UI/delete.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

//----------------------------------------------------------------------------------------------

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: "0.625rem",
    paddingBottom: 0,
  },

  header: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "0.625rem",
    width: "100%",
    display: "flex",
  },

  cardFree: {
    borderRadius: "0.625rem",
    padding: "0.625rem",
    marginHorizontal: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "0.625rem",
  },

  titleFree: {
    fontSize: "1.125rem",
    fontWeight: "normal",
    color: "black",
  },

  imageStyle: {
    width: "auto",
    minWidth: "5rem",
    height: "auto",
    minHeight: "2.5rem",
    backgroundColor: colors.emphasis_gray,
    borderWidth: 0,
  },
});
