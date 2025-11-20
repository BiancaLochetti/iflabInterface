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
} from "../../../api/elementsRequests";

export default function ElementInfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { elementId } = route.params;

    const [elementInfo, setElementInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);   // <- prevenção do loading infinito

    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [originalValue, setOriginalValue] = useState("");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

    // ---- FUNÇÃO CORRIGIDA ----
    const fetchElementInfo = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await GetElementInfo(elementId);
            console.log("API RESPONSE:", response);

            if (response.status) {
                setElementInfo(response.data);
            } else {
                setError(response.msg || "Não foi possível carregar o elemento.");
            }
        } catch (err) {
            setError("Falha ao comunicar com a API.");
        }

        setIsLoading(false);
    };

    // ---- AGORA CHAMA SÓ UMA VEZ ----
    useEffect(() => {
        fetchElementInfo();
    }, []);

    const handleSaveEdit = async () => {
        if (isSaveDisabled) return;

        setModalVisible(false);
        setIsLoading(true);

        try {
            const apiFunction = apiEditFunctions[editField];
            const response = await apiFunction(elementId, editValue);

            if (response.status) {
                setElementInfo((prev) => ({ ...prev, [editField]: editValue }));
                Alert.alert("Sucesso", "Campo atualizado com sucesso.");
            } else {
                Alert.alert("Erro", response.msg || "Falha ao atualizar o campo.");
            }
        } catch {
            Alert.alert("Erro", "Falha ao comunicar-se com a API.");
        }

        setIsLoading(false);
    };

    const openEditModal = (field, currentValue) => {
        setEditField(field);
        setOriginalValue(currentValue || "");
        setEditValue(currentValue || "");
        setModalVisible(true);
    };

    const handleDeleteElement = async () => {
        setDeleteModalVisible(false);
        setIsLoading(true);

        try {
            const response = await DeleteElement(elementId);
            if (response.status) {
                Alert.alert("Sucesso", "Elemento excluído com sucesso.", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Erro", response.msg || "Não foi possível excluir o elemento.");
            }
        } catch {
            Alert.alert("Erro", "Falha ao comunicar-se com a API.");
        }

        setIsLoading(false);
    };

    // ---- TELA DE LOADING ----
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

    // ---- AVISO DE ERRO (sem loop infinito) ----
    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ color: "red", marginBottom: 15 }}>
                    {error}
                </Text>
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

    /** COMPONENTE EDITÁVEL **/
    const EditableField = ({ field, label, value, isTitle = false }) => {
        const valueStyle = isTitle
            ? { fontSize: 24, fontWeight: "bold", color: colors.primary_text_gray }
            : styles.infoValue;

        return isEditing ? (
            <TouchableOpacity
                style={[styles.infoField, styles.infoFieldEditable]}
                onPress={() => openEditModal(field, value)}
                activeOpacity={0.7}
            >
                {!isTitle && <Text style={styles.infoLabel}>{label}</Text>}
                <Text style={valueStyle}>{value || "Não informado"}</Text>
            </TouchableOpacity>
        ) : (
            <View style={styles.infoField}>
                {!isTitle && <Text style={styles.infoLabel}>{label}</Text>}
                <Text style={valueStyle}>{value || "Não informado"}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.infoScrollContainer}>
                <Image
                    source={{
                        uri:
                            elementInfo.element_image ||
                            "https://via.placeholder.com/600/CCCCCC/808080?text=Sem+Imagem",
                    }}
                    style={styles.infoImageBackground}
                />

                <View style={styles.infoHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.primary_text_gray} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                        <TouchableOpacity
                            onPress={() => setDeleteModalVisible(true)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>Excluir</Text>
                            <MaterialIcons name="delete" size={24} color={colors.alert_red_btns} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
                            <MaterialIcons
                                name={isEditing ? "check" : "edit"}
                                size={24}
                                color={isEditing ? colors.primary_green_dark : colors.primary_text_gray}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <EditableField field="element_name" value={elementInfo.element_name} isTitle />

                <EditableField field="element_quantity" label="Quantidade:" value={elementInfo.element_quantity} />
                <EditableField field="element_molar_mass" label="Massa Molar:" value={elementInfo.element_molar_mass} />
                <EditableField field="element_cas_number" label="Número CAS:" value={elementInfo.element_cas_number} />
                <EditableField field="element_ec_number" label="Número EC:" value={elementInfo.element_ec_number} />
                <EditableField field="element_physical_state" label="Estado Físico:" value={elementInfo.element_physical_state} />
                <EditableField field="element_validity" label="Validade:" value={elementInfo.element_validity} />
                <EditableField field="element_admin_level" label="Nível de Administração:" value={elementInfo.element_admin_level} />
            </ScrollView>

            {/* MODAL EDIÇÃO */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Editar {editField}</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editValue}
                            onChangeText={setEditValue}
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

            {/* MODAL EXCLUSÃO */}
            <Modal animationType="fade" transparent={true} visible={deleteModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Deseja excluir este elemento?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setDeleteModalVisible(false)}
                                style={styles.modalCancelButton}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDeleteElement}
                                style={[styles.modalSaveButton, { backgroundColor: colors.alert_red_btns }]}
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
