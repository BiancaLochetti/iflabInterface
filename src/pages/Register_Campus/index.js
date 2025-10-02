//Import nativo
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
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

//Import API
import { registerCampus } from "../../api/campusRequests";

//Import estilização
import { styles } from "./styles";

export function Register_Campus() {
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

        {/* TOPO */}
        <View style={styles.topSection}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitle}>
          Insira o nome e a unidade federativa do campus
        </Text>

        {/* FORM */}
        <View style={styles.formSection}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Nome do campus"
              value={campusName}
              onChangeText={setCampusName}
            />

            <Ionicons
              name="school-outline"
              size={20}
              color="#4A4A4A"
              style={styles.iconRight}
            />

            {/* Dropdown UF */}
            <View style={{ zIndex: 1000 }}>
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

        {/* BOTÕES */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[
              styles.registerButton,
              !(campusName && campusUF) && styles.disabledButton,
            ]}
            disabled={!(campusName && campusUF) || loading}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.registerText}>Registrar campus</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
