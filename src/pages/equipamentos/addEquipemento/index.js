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
import * as ImagePicker from "expo-image-picker";

import { styles } from "./styles";
import colors from "../../../colors";
import { RegisterEquipment } from "../../../api/equipmentsRequests";

import StarFull from "../../../assets/icons/UI/quality-1.png";
import StarEmpty from "../../../assets/icons/UI/quality-2.png";

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

  // --- ESTADOS DA IMAGEM (mesmos dos elementos) ---
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  // Estados do dropdown
  const [openAdmin, setOpenAdmin] = useState(false);
  const [adminItems, setAdminItems] = useState([
    { label: "Nível 1", value: "1" },
    { label: "Nível 2", value: "2" },
    { label: "Nível 3", value: "3" },
  ]);

  const isSaveEnabled = name.trim() && description.trim() && quantity.trim();

  // --- FUNÇÃO DE ADICIONAR IMAGEM (mesma dos elementos) ---
  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos da permissão da sua galeria para selecionar uma imagem."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets?.[0];
      if (asset) {
        setImageUri(asset.uri);
        setImageBase64(asset.base64);
        console.log("Base64 capturado (equipamento):", asset.base64?.slice(0, 50));
      }
    }
  }

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

    const fullBase64 = imageBase64
      ? `data:image/jpeg;base64,${imageBase64}`
      : "";

    console.log("Base64 enviado EQUIPAMENTO:", fullBase64.slice(0, 80));

    try {
      const response = await RegisterEquipment(
        labId,
        name,
        fullBase64, // agora envia a imagem
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
        setImageUri(null);
        setImageBase64(null);
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

          <TouchableOpacity
            style={styles.imagePlaceholder}
            onPress={handlePickImage}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePlaceholder}
                resizeMode="cover"
              />
            ) : (
              <MaterialIcons
                name="add-a-photo"
                size={40}
                color={colors.contrastant_gray}
              />
            )}
          </TouchableOpacity>
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

        <View style={{ zIndex: 10, width: "100%" }}>
          <DropDownPicker
            open={openAdmin}
            value={admin}
            items={adminItems}
            setOpen={setOpenAdmin}
            setValue={setAdmin}
            setItems={setAdminItems}
            placeholder="* Nível de Administração"
            style={{ ...styles.newElementInput, borderWidth: 0 }}
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
            Salvar novo equipamento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
