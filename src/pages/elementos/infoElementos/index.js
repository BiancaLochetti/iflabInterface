import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Alert,
    ActivityIndicator,
    Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../../../colors";
import { styles } from "./styles";

import {
    GetElementInfo,
    EditElementName,
    EditElementQuantity,
    EditElementCAS,
    EditElementEC,
    EditElementPhysicalState,
    EditElementValidity,
    EditElementAdministration,
    EditElementMolarMass,
    DeleteElement,
    EditElementImage,
} from "../../../api/elementsRequests";

function formatDateToDisplay(dateString) {
    if (!dateString) {
        return { display: "Não informado", iso: null };
    }

    console.log("🔍 Formatando data recebida:", dateString);

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split("-");
        return { display: `${day}/${month}/${year}`, iso: dateString };
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { display: dateString, iso: null };

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return { display: `${day}/${month}/${year}`, iso: `${year}-${month}-${day}` };
}

export default function ElementInfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // ⭐ ADICIONADO — ESTAVA FALTANDO
    const { elementId, labId, labName } = route.params;

    const [elementInfo, setElementInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [originalValue, setOriginalValue] = useState("");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const isSaveDisabled = editValue === originalValue || editValue.trim() === "";

    const apiEditFunctions = {
        element_name: EditElementName,
        element_quantity: EditElementQuantity,
        element_cas_number: EditElementCAS,
        element_ec_number: EditElementEC,
        element_physical_state: EditElementPhysicalState,
        element_validity: EditElementValidity,
        element_admin_level: EditElementAdministration,
        element_molar_mass: EditElementMolarMass,
    };

    const numericFields = {
        element_quantity: "float",
        element_molar_mass: "float",
        element_admin_level: "int",
    };

    const normalizeResponse = (res) => {
        console.log("📩 Normalize Response:", res);
        if (!res) return null;
        return res?.data ?? res;
    };

    const fetchElementInfo = async () => {
        console.log("🔄 Buscando informações do elemento:", elementId);
        setIsLoading(true);
        setError(null);

        try {
            const raw = await GetElementInfo(elementId);
            const response = normalizeResponse(raw);

            if (response?.status) {
                console.log("✨ Elemento carregado:", response.element);
                setElementInfo(response.element);
            } else {
                setError(response?.msg || "Erro ao carregar.");
            }
        } catch (err) {
            console.log("❌ ERRO AO CHAMAR GetElementInfo:", err);
            setError("Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchElementInfo();
    }, [elementId]);

    const openEditModal = (field, currentValue) => {
        console.log("✏️ Abrindo modal de edição para:", field, "Valor atual:", currentValue);
        setEditField(field);
        setOriginalValue(currentValue ?? "");
        setEditValue(currentValue ?? "");
        setModalVisible(true);
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        if (isSaveDisabled) return;

        console.log("💾 Salvando edição:", editField, "Novo valor:", editValue);

        setModalVisible(false);
        setIsLoading(true);

        const apiFunction = apiEditFunctions[editField];
        if (!apiFunction) {
            Alert.alert("Erro", "Função de edição não encontrada.");
            setIsLoading(false);
            return;
        }

        let parsedValue = editValue;

        if (editField === "element_validity") {
            console.log("📅 Validando data:", editValue);

            if (/^\d{2}\/\d{2}\/\d{4}$/.test(editValue)) {
                const [day, month, year] = editValue.split("/");
                parsedValue = `${year}-${month}-${day}`;
            } else if (/^\d{4}-\d{2}-\d{2}$/.test(editValue)) {
                parsedValue = editValue;
            } else {
                Alert.alert("Erro", "A validade deve estar no formato DD/MM/AAAA ou YYYY-MM-DD.");
                setIsLoading(false);
                return;
            }
        }

        if (numericFields[editField]) {
            parsedValue =
                numericFields[editField] === "int"
                    ? parseInt(editValue)
                    : parseFloat(editValue);

            console.log("🔢 Valor numérico convertido:", parsedValue);

            if (isNaN(parsedValue)) {
                Alert.alert("Erro", "Digite um número válido.");
                setIsLoading(false);
                return;
            }
        }

        try {
            const raw = await apiFunction(elementId, parsedValue);
            const response = normalizeResponse(raw);

            if (response?.status) {
                console.log("✅ Campo atualizado com sucesso!");
                setElementInfo((prev) => ({
                    ...prev,
                    [editField]: parsedValue,
                }));
                Alert.alert("Sucesso", "Campo atualizado!");
            } else {
                Alert.alert("Erro", response?.msg || "Falha ao atualizar.");
            }
        } catch (err) {
            console.log("❌ ERRO AO EDITAR:", err);
            Alert.alert("Erro", "Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    // ⭐ CORRIGIDO — AGORA labId existe
    const handleDeleteElement = async () => {
        console.log("🗑️ Deletando elemento:", elementId);

        setIsLoading(true);

        try {
            const raw = await DeleteElement(elementId, labId);
            const response = normalizeResponse(raw);

            if (response?.status) {
                setDeleteModalVisible(false);

                Alert.alert("Sucesso", "Elemento excluído.");

                navigation.navigate("Elements", { labId, labName });
            } else {
                Alert.alert("Erro", response?.msg || "Falha ao excluir.");
            }
        } catch (err) {
            console.log("❌ ERRO AO DELETAR:", err);
            Alert.alert("Erro", "Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePickAndUploadImage = async () => {
        console.log("🖼️ Tentando escolher imagem...");

        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permissão necessária", "Autorize o acesso à galeria.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (result.canceled) return;

            const asset = result.assets?.[0];
            if (!asset) return;

            const fullBase64 = `data:image/jpeg;base64,${asset.base64}`;

            console.log("📤 Enviando imagem para API...");

            setIsUploadingImage(true);

            const raw = await EditElementImage(elementId, fullBase64);
            const response = normalizeResponse(raw);

            if (response?.status) {
                console.log("✅ Imagem atualizada com sucesso!");
                setElementInfo((prev) => ({
                    ...prev,
                    element_image: fullBase64,
                }));
                Alert.alert("Sucesso", "Imagem atualizada!");
            } else {
                Alert.alert("Erro", response?.msg || "Falha ao atualizar imagem.");
            }
        } catch (err) {
            console.log("❌ ERRO AO ENVIAR IMAGEM:", err);
            Alert.alert("Erro", "Falha ao enviar imagem ao servidor.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.secundary_green} />
                <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
                    Carregando Elemento...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ color: "red", marginBottom: 15 }}>{error}</Text>
                <TouchableOpacity
                    onPress={fetchElementInfo}
                    style={{
                        padding: 10,
                        backgroundColor: colors.primary_green_dark,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#FFF" }}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const EditableField = ({ field, label, value, isTitle = false }) => {
        const valueStyle = isTitle
            ? {
                  fontSize: 24,
                  fontWeight: "bold",
                  color: colors.primary_text_gray,
              }
            : styles.infoValue;

        return isEditing ? (
            <TouchableOpacity
                style={[styles.infoField, styles.infoFieldEditable]}
                onPress={() => openEditModal(field, value)}
            >
                {!isTitle && <Text style={styles.infoLabel}>{label}</Text>}
                <Text style={valueStyle}>{value ?? "Não informado"}</Text>
            </TouchableOpacity>
        ) : (
            <View style={styles.infoField}>
                {!isTitle && <Text style={styles.infoLabel}>{label}</Text>}
                <Text style={valueStyle}>{value ?? "Não informado"}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.infoScrollContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handlePickAndUploadImage}
                        disabled={isUploadingImage}
                    >
                        <Image
                            source={{
                                uri:
                                    elementInfo?.element_image ||
                                    "https://placehold.co/600x400?text=Sem+Imagem",
                            }}
                            style={styles.infoImageBackground}
                        />

                        {isUploadingImage && (
                            <View style={styles.imageUploadingOverlay}>
                                <ActivityIndicator
                                    size="large"
                                    color={colors.primary_green_dark}
                                />
                                <Text
                                    style={{
                                        color: colors.primary_text_gray,
                                        marginTop: 8,
                                    }}
                                >
                                    Enviando imagem...
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ) : (
                    <Image
                        source={{
                            uri:
                                elementInfo?.element_image ||
                                "https://placehold.co/600x400?text=Sem+Imagem",
                        }}
                        style={styles.infoImageBackground}
                    />
                )}

                <View style={styles.infoHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back"
                            size={24}
                            color={colors.primary_text_gray}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                        <TouchableOpacity
                            onPress={() => setDeleteModalVisible(true)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>Excluir</Text>
                            <MaterialIcons
                                name="delete"
                                size={24}
                                color={colors.alert_red_btns}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                console.log(
                                    "✏️ Alternando modo edição. Agora:",
                                    !isEditing
                                );
                                setIsEditing((prev) => !prev);
                            }}
                        >
                            <MaterialIcons
                                name={isEditing ? "check" : "edit"}
                                size={24}
                                color={
                                    isEditing
                                        ? colors.primary_green_dark
                                        : colors.primary_text_gray
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <EditableField
                    field="element_name"
                    value={elementInfo.element_name}
                    isTitle
                />

                <EditableField
                    field="element_quantity"
                    label="Quantidade:"
                    value={elementInfo.element_quantity}
                />

                <EditableField
                    field="element_molar_mass"
                    label="Massa Molar:"
                    value={elementInfo.element_molar_mass}
                />

                <EditableField
                    field="element_cas_number"
                    label="Número CAS:"
                    value={elementInfo.element_cas_number}
                />

                <EditableField
                    field="element_ec_number"
                    label="Número EC:"
                    value={elementInfo.element_ec_number}
                />

                <EditableField
                    field="element_physical_state"
                    label="Estado Físico:"
                    value={elementInfo.element_physical_state}
                />

                {(() => {
                    const formatted = formatDateToDisplay(
                        elementInfo.element_validity
                    );
                    return (
                        <EditableField
                            field="element_validity"
                            label="Validade:"
                            value={formatted.display}
                        />
                    );
                })()}

                <EditableField
                    field="element_admin_level"
                    label="Nível de Administração:"
                    value={elementInfo.element_admin_level}
                />
            </ScrollView>

            {/* MODAL DE EDIÇÃO */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Editar {editField}</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editValue}
                            onChangeText={(txt) => setEditValue(txt)}
                            placeholder={originalValue}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modalCancelButton}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                disabled={isSaveDisabled}
                                onPress={handleSaveEdit}
                                style={[
                                    styles.modalSaveButton,
                                    isSaveDisabled && styles.modalSaveButtonDisabled,
                                ]}
                            >
                                <Text style={styles.modalSaveText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL DE EXCLUSÃO */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            Deseja excluir este elemento?
                        </Text>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setDeleteModalVisible(false)}
                                style={styles.modalCancelButton}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDeleteElement}
                                style={[
                                    styles.modalSaveButton,
                                    { backgroundColor: colors.alert_red_btns },
                                ]}
                            >
                                <Text style={styles.modalSaveText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
