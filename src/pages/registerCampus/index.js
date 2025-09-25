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
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { registerCampus } from "../../api/campusRequests";
import { styles } from "./styles";

export function RegisterCampus() {
  const navigation = useNavigation();
  const [campusName, setCampusName] = useState("");
  const [campusUF, setCampusUF] = useState("");
  const [loading, setLoading] = useState(false);

  const ufs = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
    "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
  ];

  async function handleRegister() {
    if (!campusName || !campusUF) return;

    setLoading(true);
    const result = await registerCampus(
      campusName,
      campusUF,
    );
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
        
        {/* 🔝 TOPO: Logo */}
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

        <View style={styles.formSection}>
          <View style={styles.inputRow}>
            <View style={styles.inputWithIcon}>
              <Ionicons name="school-outline" size={20} color="#4A4A4A" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nome do campus"
                value={campusName}
                onChangeText={setCampusName}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={campusUF}
                onValueChange={(value) => setCampusUF(value)}
                style={styles.picker}
              >
                <Picker.Item label="UF" value="" />
                {ufs.map((uf) => (
                  <Picker.Item key={uf} label={uf} value={uf} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        
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