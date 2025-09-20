// Imports
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Dropdown from "../picker/Dropdown";
import { useState } from "react";

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
      <View style={{ marginBottom: 10 }}>
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
        <View style={[styles.cardFree]}>
          <TouchableOpacity onPress={restoreDropdowns}>
            <Image
              style={[styles.cardFree, { width: 60, flexBasis: undefined }]}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
  },
  
  header: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
    display: "flex",
  },

  cardFree: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 10,
  },

  titleFree: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
  },
  imageStyle: {
    width: "auto",
    minWidth: 80,
    height: "auto",
    minHeight: 40,
    backgroundColor: "rgba(245,245,245,1)",
    borderWidth: 0,
  },
});
