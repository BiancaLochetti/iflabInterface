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

function formatDateToDisplay(dateString) {
    if (!dateString) {
        return { display: "Não informado", iso: null };
    }

    console.log("Recebido para formatar:", dateString);

    // caso venha no formato YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split("-");
        const display = `${day}/${month}/${year}`;
        const iso = `${year}-${month}-${day}`; 

        return { display, iso };
    }

    // caso venha outro formato
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.log("Data inválida recebida!", dateString);
        return { display: dateString, iso: null };
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    const display = `${day}/${month}/${year}`;
    const iso = `${year}-${month}-${day}`; 

    return { display, iso };
}

export default function ElementInfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { elementId } = route.params;

    const [elementInfo, setElementInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [originalValue, setOriginalValue] = useState("");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const isSaveDisabled = editValue === originalValue || editValue.trim() === "";

    console.log("\n====================");
    console.log("Tela carregada. Element ID:", elementId);
    console.log("====================\n");

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
        if (!res) return null;
        return res?.data ?? res;
    };

    const fetchElementInfo = async () => {
        console.log("\n=== BUSCANDO ELEMENTO ===");
        setIsLoading(true);
        setError(null);

        try {
            const raw = await GetElementInfo(elementId);
            console.log("Resposta crua GetElementInfo:", raw);

            const response = normalizeResponse(raw);
            console.log("Resposta normalizada:", response);

            if (response?.status) {
                console.log("Elemento recebido:", response.element);
                setElementInfo(response.element);
            } else {
                setError(response?.msg || "Erro ao carregar.");
            }
        } catch (err) {
            console.log("ERRO AO CHAMAR GetElementInfo:", err);
            setError("Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchElementInfo();
    }, [elementId]);

    const openEditModal = (field, currentValue) => {
        console.log("\n=== ABRINDO MODAL DE EDIÇÃO ===");
        console.log("Campo:", field);
        console.log("Valor atual:", currentValue);

        setEditField(field);
        setOriginalValue(currentValue ?? "");
        setEditValue(currentValue ?? "");
        setModalVisible(true);
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        if (isSaveDisabled) return;

        console.log("\n=== SALVANDO EDIÇÃO ===");
        console.log("Campo editado:", editField);
        console.log("Valor digitado:", editValue);

        setModalVisible(false);
        setIsLoading(true);

        const apiFunction = apiEditFunctions[editField];
        if (!apiFunction) {
            Alert.alert("Erro", "Função de edição não encontrada.");
            setIsLoading(false);
            return;
        }

        let parsedValue = editValue;

        // Conversão específica para validade
        if (editField === "element_validity") {
            console.log("Convertendo validade para YYYY-MM-DD...");

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

            console.log("Validade convertida:", parsedValue);
        }

        if (numericFields[editField]) {
            console.log("Convertendo para número...");

            if (numericFields[editField] === "int") {
                parsedValue = parseInt(editValue);
            } else if (numericFields[editField] === "float") {
                parsedValue = parseFloat(editValue);
            }

            console.log("Valor após parse:", parsedValue);

            if (isNaN(parsedValue)) {
                Alert.alert("Erro", "Digite um número válido.");
                setIsLoading(false);
                return;
            }
        }

        console.log("Payload enviado:", parsedValue);

        try {
            const raw = await apiFunction(elementId, parsedValue);
            console.log("Resposta crua da edição:", raw);

            const response = normalizeResponse(raw);
            console.log("Resposta normalizada da edição:", response);

            if (response?.status) {
                setElementInfo((prev) => ({
                    ...prev,
                    [editField]: parsedValue,
                }));

                Alert.alert("Sucesso", "Campo atualizado!");
            } else {
                Alert.alert("Erro", response?.msg || "Falha ao atualizar.");
            }
        } catch (err) {
            console.log("ERRO AO EDITAR:", err);
            Alert.alert("Erro", "Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteElement = async () => {
        console.log("\n=== DELETANDO ELEMENTO ===");

        setDeleteModalVisible(false);
        setIsLoading(true);

        try {
            const raw = await DeleteElement(elementId);
            console.log("Resposta crua delete:", raw);

            const response = normalizeResponse(raw);
            console.log("Resposta normalizada delete:", response);

            if (response?.status) {
                Alert.alert("Sucesso", "Elemento excluído.", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Erro", response?.msg || "Falha ao excluir.");
            }
        } catch (err) {
            console.log("ERRO AO DELETAR:", err);
            Alert.alert("Erro", "Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
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
            ? { fontSize: 24, fontWeight: "bold", color: colors.primary_text_gray }
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
                <Image
                    source={{
                        uri:
                            elementInfo?.element_image ||
                            "https://placehold.co/600x400?text=Sem+Imagem",
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
                    const formatted = formatDateToDisplay(elementInfo.element_validity);
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

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Editar {editField}</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editValue}
                            onChangeText={(txt) => {
                                console.log("Digitado agora:", txt);
                                setEditValue(txt);
                            }}
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
