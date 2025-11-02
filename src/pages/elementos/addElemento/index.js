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
import { RegisterElement } from "../../../api/elementsRequests";

export default function NewElementScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { labId, labName } = route.params || {};
  console.log("LabId:", labId, "LabName:", labName);


  const [name, setName] = useState("");
  const [molarMass, setMolarMass] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cas, setCas] = useState("");
  const [ec, setEc] = useState("");
  const [physicalState, setPhysicalState] = useState("");
  const [validity, setValidity] = useState("");
  const [admin, setAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSaveEnabled =
    name.trim() &&
    molarMass.trim() &&
    quantity.trim() &&
    cas.trim() &&
    ec.trim() &&
    physicalState.trim() &&
    validity.trim();

  async function handleRegisterElement() {
    console.log("Botão pressionado");
    console.log("Campos:", { name, molarMass, quantity, cas, ec, physicalState, validity, admin });
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
      const response = await RegisterElement(
        name,
        "",          
        parseFloat(molarMass),
        parseFloat(quantity),
        cas,
        ec,
        parseInt(admin),
        validity,
        physicalState,
        labId
      );

      console.log("Resposta da API:", response);

      if (response?.status) {
        Alert.alert("Sucesso", "Elemento registrado com sucesso!");
        // Limpar campos
        setName("");
        setMolarMass("");
        setQuantity("");
        setCas("");
        setEc("");
        setPhysicalState("");
        setValidity("");
        setAdmin("");
        navigation.goBack();
      } else {
        Alert.alert("Erro", response?.msg || "Não foi possível registrar o novo elemento.");
      }
    } catch (err) {
      console.log("Erro no registro:", err);
      Alert.alert("Erro de Conexão", "Falha ao registrar o elemento.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundary_green} />
        <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
          Registrando Elemento...
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
      <ScrollView contentContainerStyle={styles.newElementScrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.newElementHeader}>
          <Text style={styles.newElementTitle}>Novo elemento - {labName || "Laboratório"}</Text>
          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="add-a-photo" size={40} color={colors.contrastant_gray} />
          </View>
        </View>

        <TextInput
          style={styles.newElementInput}
          placeholder="* Nome do elemento"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Massa molar"
          value={molarMass}
          onChangeText={setMolarMass}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Quantidade e Unidade (ex: 500ml)"
          value={quantity}
          onChangeText={setQuantity}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Número CAS"
          value={cas}
          onChangeText={setCas}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Número CE"
          value={ec}
          onChangeText={setEc}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Estado Físico (Líquido/Sólido/Gás)"
          value={physicalState}
          onChangeText={setPhysicalState}
          placeholderTextColor={colors.input_text_gray}
        />
       <TextInput
            style={styles.newElementInput}
            placeholder="* Validade (YYYY-MM-DD)"
            value={validity}
            onChangeText={(text) => {
                // Remove tudo que não for número
                const cleaned = text.replace(/\D/g, "");

                // Aplica a máscara YYYY-MM-DD
                let formatted = cleaned;
                if (cleaned.length > 4 && cleaned.length <= 6) {
                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
                } else if (cleaned.length > 6) {
                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
                }

                setValidity(formatted);
            }}
            keyboardType="numeric"
            maxLength={10}
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
          style={[styles.saveButton, { backgroundColor: isSaveEnabled ? colors.primary_green_dark : colors.white_dark }]}
          onPress={handleRegisterElement}
          disabled={!isSaveEnabled}
        >
          <Text style={[styles.saveButtonText, { color: isSaveEnabled ? colors.white_full : colors.contrastant_gray }]}>
            Salvar novo elemento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
