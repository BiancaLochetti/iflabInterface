import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker"; 
import { styles } from "./styles";
import colors from "../../../colors";
import { RegisterEquipment } from "../../../api/equipmentsRequests";

import StarFull from "../../../assets/icons/UI/quality-1.png";
import StarEmpty from "../../../assets/icons/UI/quality-2.png";

// Componente interativo de estrelas
const StarRatingInput = ({ rating, setRating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity key={i} onPress={() => setRating(i)}>
        <Image
          source={i <= rating ? StarFull : StarEmpty}
          style={{ width: 24, height: 24, marginRight: 5, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    );
  }
  return <View style={{ flexDirection: "row", marginVertical: 10 }}>{stars}</View>;
};

export default function NewEquipmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { labId, labName } = route.params || {};

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [admin, setAdmin] = useState(null);
  const [quality, setQuality] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Estados do dropdown
  const [openAdmin, setOpenAdmin] = useState(false);
  const [adminItems, setAdminItems] = useState([
    { label: "Nível 1", value: "1" },
    { label: "Nível 2", value: "2" },
    { label: "Nível 3", value: "3" },
    { label: "Nível 4", value: "4" },
    { label: "Nível 5", value: "5" },
  ]);

  const isSaveEnabled = name.trim() && description.trim() && quantity.trim();

  async function handleRegisterEquipment() {
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
        labId,
        name,
        "",
        description,
        parseInt(quantity),
        quality,
        admin ? parseInt(admin) : null
      );

      console.log("RegisterEquipment response:", response);

      if (response?.status) {
        Alert.alert("Sucesso", "Equipamento registrado com sucesso!");
        setName("");
        setDescription("");
        setQuantity("");
        setAdmin(null);
        setQuality(0);
        navigation.goBack();
      } else {
        Alert.alert("Erro", response?.msg || "Não foi possível registrar o equipamento.");
      }
    } catch (err) {
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { position: "absolute", top: 50, left: 10, zIndex: 10 }]}
      >
        <MaterialIcons name="close" size={24} color={colors.primary_text_gray} />
      </TouchableOpacity>

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

        <View style={styles.newElementInput}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setQuality(i)}>
                <Image
                  source={i <= quality ? StarFull : StarEmpty}
                  style={{ width: 24, height: 24, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* DROPDOWN */}
        <View style={{ zIndex: 10, width: "100%" }}>
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
            Salvar novo elemento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
