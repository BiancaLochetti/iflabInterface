//Import nativo
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

import InputText from '../../components/inputs/InputText'
import Button from '../../components/buttons/Button'

//Import API
import { registerCampus } from "../../api/campusRequests";

//Import estilização
import { styles } from "./styles";

export function RegisterCampus() {
  const navigation = useNavigation();
  const [campusName, setCampusName] = useState("");
  const [campusUF, setCampusUF] = useState("");
  const [loading, setLoading] = useState(false);

  // Dropdown
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "UF", value: "" },
    { label: "AC", value: "AC" },
    { label: "AL", value: "AL" },
    { label: "AP", value: "AP" },
    { label: "AM", value: "AM" },
    { label: "BA", value: "BA" },
    { label: "CE", value: "CE" },
    { label: "DF", value: "DF" },
    { label: "ES", value: "ES" },
    { label: "GO", value: "GO" },
    { label: "MA", value: "MA" },
    { label: "MT", value: "MT" },
    { label: "MS", value: "MS" },
    { label: "MG", value: "MG" },
    { label: "PA", value: "PA" },
    { label: "PB", value: "PB" },
    { label: "PR", value: "PR" },
    { label: "PE", value: "PE" },
    { label: "PI", value: "PI" },
    { label: "RJ", value: "RJ" },
    { label: "RN", value: "RN" },
    { label: "RS", value: "RS" },
    { label: "RO", value: "RO" },
    { label: "RR", value: "RR" },
    { label: "SC", value: "SC" },
    { label: "SP", value: "SP" },
    { label: "SE", value: "SE" },
    { label: "TO", value: "TO" },
  ]);

  async function handleRegister() {
    if (!campusName || !campusUF) return;

    setLoading(true);
    const result = await registerCampus(campusName, campusUF);
    setLoading(false);

    if (result && result.status) {
      Alert.alert("Mensagem", result.msg || "Campus registrado!");
      setCampusName("");
      setCampusUF("");
    } else {
      Alert.alert("Erro", "Não foi possível registrar o campus.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoView}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formView}>
          <Text style={styles.subtitle}>
            Insira o nome e a unidade federativa do campus
          </Text>

          <View style={styles.inputRow}>
            <View style={{ width: '70%' }}>
              <InputText
                placeHolder="Nome do Campus"
                type="campus"
                onChange={setCampusName}
              />
            </View>
            <View style={{ width: '25%' }}>
              <DropDownPicker
                open={open}
                value={campusUF}
                items={items}
                setOpen={setOpen}
                setValue={setCampusUF}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                placeholder="UF"
                listMode="SCROLLVIEW"
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonView}>
          <Button
            disabled={!(campusName && campusUF)}
            type="Green"
            onPress={handleRegister}
            text="Registrar Campus"
          />
          <Button
            type="White"
            onPress={() => navigation.goBack()}
            text="Cancelar"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
