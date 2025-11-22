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
import DropDownPicker from "react-native-dropdown-picker";

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
  const [validity, setValidity] = useState("");
  const [admin, setAdmin] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [openPhysical, setOpenPhysical] = useState(false);
  const [physicalState, setPhysicalState] = useState(null);
 
  const [openAdmin, setOpenAdmin] = useState(false);
  const [adminItems, setAdminItems] = useState([
    { label: "Nível 1", value: "1" },
    { label: "Nível 2", value: "2" },
    { label: "Nível 3", value: "3" },
  ]);

  const isSaveEnabled =
    name.trim() &&
    molarMass.trim() &&
    quantity.trim() &&
    cas.trim() &&
    ec.trim() &&
    physicalState.trim() &&
    validity.trim() &&
    admin;

  async function handleRegisterElement() {
    console.log("Botão pressionado");

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
        parseInt(quantity),
        cas,
        ec,
        parseInt(admin),
        validity,
        physicalState,
        labId
      );

      console.log("Resposta do registro:", response);

      if (response?.status) {
        Alert.alert("Sucesso", "Elemento registrado com sucesso!");
        setName("");
        setMolarMass("");
        setQuantity("");
        setCas("");
        setEc("");
        setPhysicalState("");
        setValidity("");
        setAdmin(null);
        navigation.goBack();
      } else {
        Alert.alert("Erro", response?.msg || "Não foi possível registrar o elemento.");
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
      <ScrollView
        contentContainerStyle={styles.newElementScrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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

        
         {/* DROPDOWN */}
        <View style={{ zIndex: 1001, width: "100%" }}>
          <DropDownPicker
           open={openPhysical}
            value={physicalState}
            items={[
              { label: "Líquido", value: "Líquido" },
              { label: "Sólido", value: "Sólido" },
              { label: "Gás", value: "Gás" },
            ]}
            setOpen={setOpenPhysical}
            setValue={setPhysicalState}
           
            placeholder="* Estado Físico"
           
            containerStyle={{
              backgroundColor: colors.white_medium, 
              borderWidth: 0,
              borderRadius: 12,
              marginBottom: "0.8rem",
            }}

            style={{
              backgroundColor: colors.white_medium, 
              borderWidth: 0,
              borderRadius: 12,
              paddingHorizontal: "1rem",
              paddingVertical: "0.9rem",
            }}

            dropDownContainerStyle={{
              backgroundColor: colors.white_full, 
              borderWidth: 0,
              borderRadius: 12,
            }}

            placeholderStyle={{
              fontSize: 15,
              color: colors.input_text_gray,
            }}

            listItemLabelStyle={{
              fontSize: 15,
              color: colors.primary_text_gray,
            }}

            selectedItemLabelStyle={{
              fontSize: 15,
              color: colors.primary_text_gray,
            }}

            selectedItemContainerStyle={{
              backgroundColor: colors.white_full, 
            }}
          />
        </View>

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

        {/* VALIDADE COM MÁSCARA YYYY-MM-DD */}
        <TextInput
          style={styles.newElementInput}
          placeholder="* Validade (YYYY-MM-DD)"
          value={validity}
          onChangeText={(text) => {
            const cleaned = text.replace(/\D/g, "");
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

      
      {/* DROPDOWN */}
        <View style={{ zIndex: 1001, width: "100%" }}>
          <DropDownPicker
            open={openAdmin}
            value={admin}
            items={[
              { label: "Nível 1", value: "1" },
              { label: "Nível 2", value: "2" },
              { label: "Nível 3", value: "3" },
            ]}
            setOpen={setOpenAdmin}
            setValue={setAdmin}
            setItems={setAdminItems}
            placeholder="* Nível de Administração"

            
            style={{
              ...styles.newElementInput,
              borderWidth: 0,      
            }}

            
            dropDownContainerStyle={{
              backgroundColor: colors.white_full,
              borderWidth: 0,      
              borderRadius: 12,
              paddingHorizontal: "1rem",
              paddingVertical: "0.9rem",
            }}

            placeholderStyle={{
              fontSize: 15,
              color: colors.input_text_gray,
            }}

            listItemLabelStyle={{
              fontSize: 15,
              color: colors.primary_text_gray,
            }}
          />
        </View>
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
          onPress={handleRegisterElement}
          disabled={!isSaveEnabled}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: isSaveEnabled ? colors.white_full : colors.contrastant_gray },
            ]}
          >
            Salvar novo elemento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
