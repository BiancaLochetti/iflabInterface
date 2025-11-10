import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import colors from "../../../colors";
import { RegisterEquipment } from "../../../api/equipmentsRequests";

export default function NewEquipmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { labId, labName } = route.params || {};
  console.log("LabId:", labId, "LabName:", labName);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [admin, setAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSaveEnabled = name.trim() && description.trim() && quantity.trim();

  async function handleRegisterEquipment() {
    console.log("Botão pressionado");
    console.log("Campos:", { name, description, quantity, admin });
    console.log("labId:", labId);

    if (!labId) {
      Alert.alert("Erro", "ID do laboratório não encontrado.");
      return;
    }

    if (!isSaveEnabled) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios (*).");
      return;
    }

    setIsLoading(true);
    try {
      const response = await RegisterEquipment(
        name,
        description,
        parseInt(quantity),
        parseInt(admin),
        labId
      );

      console.log("Resposta da API:", response);

      if (response?.status) {
        Alert.alert("Sucesso", "Equipamento registrado com sucesso!");
        // Limpar campos
        setName("");
        setDescription("");
        setQuantity("");
        setAdmin("");
        navigation.goBack();
      } else {
        Alert.alert("Erro", response?.msg || "Não foi possível registrar o equipamento.");
      }
    } catch (err) {
      console.log("Erro no registro:", err);
      Alert.alert("Erro de Conexão", "Falha ao registrar o equipamento.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundary_green} />
        <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
          Registrando Equipamento...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão fechar */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { position: "absolute", top: 50, left: 10, zIndex: 10 }]}
      >
        <MaterialIcons name="close" size={24} color={colors.primary_text_gray} />
      </TouchableOpacity>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.newElementScrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.newElementHeader}>
          <Text style={styles.newElementTitle}>
            Novo equipamento - {labName || "Laboratório"}
          </Text>
          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="build" size={40} color={colors.contrastant_gray} />
          </View>
        </View>

        <TextInput
          style={styles.newElementInput}
          placeholder="* Nome do equipamento"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.input_text_gray}
        />

        <TextInput
          style={styles.newElementInput}
          placeholder="* Descrição"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={colors.input_text_gray}
        />

        <TextInput
          style={styles.newElementInput}
          placeholder="* Quantidade"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor={colors.input_text_gray}
        />

        <TextInput
          style={styles.newElementInput}
          placeholder="Nível de Administração (Opcional)"
          value={admin}
          onChangeText={setAdmin}
          placeholderTextColor={colors.input_text_gray}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.newElementFooter}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: isSaveEnabled ? colors.primary_green_dark : colors.white_dark },
          ]}
          onPress={handleRegisterEquipment}
          disabled={!isSaveEnabled}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: isSaveEnabled ? colors.white_full : colors.contrastant_gray },
            ]}
          >
            Salvar novo equipamento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
