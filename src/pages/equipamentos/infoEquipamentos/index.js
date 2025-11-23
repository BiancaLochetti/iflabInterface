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
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../../../colors"; 
import { styles } from "./styles"; 

import {
    GetEquipmentInfo,
    EditEquipmentName,
    EditEquipmentDescription,
    EditEquipmentQuantity,
    EditEquipmentAdministration,
    EditEquipmentQuality,
    DeleteEquipment,
    EditEquipmentImage,
} from "../../../api/equipmentsRequests"; 

import StarFull from "../../../assets/icons/UI/quality-1.png";
import StarEmpty from "../../../assets/icons/UI/quality-2.png";

export default function EquipmentInfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { equipmentId, labId, labName } = route.params || {};

    // Logs de Inicialização
    useEffect(() => {
        console.log("--- Tela EquipmentInfoScreen Iniciada ---");
        console.log("equipmentId:", equipmentId);
        console.log("labId:", labId);
        if (!equipmentId) {
             console.error("⚠️ ERRO: equipmentId não está definido na rota.");
        }
    }, [equipmentId, labId]);
    // ------------------------------------

    const [equipmentInfo, setEquipmentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState(""); 
    const [starRating, setStarRating] = useState(0); 
    const [originalValue, setOriginalValue] = useState("");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const apiEditFunctions = {
        equipment_name: EditEquipmentName,
        equipment_description: EditEquipmentDescription,
        equipment_quantity: EditEquipmentQuantity,
        equipment_admin_level: EditEquipmentAdministration,
        equipment_quality: EditEquipmentQuality,
    };

    const numericFields = {
        equipment_quantity: "int",
        equipment_admin_level: "int",
        equipment_quality: "int",
    };
    
    const normalizeResponse = (res) => res?.data ?? res;

    const fetchEquipmentInfo = async () => {
        setIsLoading(true);
        setError(null);

        if (!equipmentId) {
            setIsLoading(false);
            return;
        }
        
        try {
            const raw = await GetEquipmentInfo(equipmentId);
            const response = normalizeResponse(raw);
            
            // Log de Carregamento
            console.log("API Response (GetEquipmentInfo):", response);
            
            if (response?.status) {
                setEquipmentInfo(response.equipment ?? response);
                console.log("✅ Equipamento carregado com sucesso.");
            } else {
                setError(response?.msg || "Erro ao carregar equipamento.");
            }
        } catch (err) {
            console.error("❌ Erro no fetchEquipmentInfo:", err);
            setError("Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipmentInfo();
    }, [equipmentId]);

    const openEditModal = (field, currentValue) => {
        const stringValue = String(currentValue ?? ""); 
        
        setEditField(field);
        setOriginalValue(stringValue);
        
        // Log de Abertura de Modal
        console.log(`Abrindo modal para campo: ${field}. Valor Original: ${stringValue}`);
        
        if (field === 'equipment_quality') {
            setStarRating(parseInt(currentValue) || 0);
            setEditValue("");
        } else {
            setEditValue(stringValue);
            setStarRating(0);
        }
        
        setModalVisible(true);
    };

    const isSaveDisabled =
        (editField !== 'equipment_quality' && (editValue.toString().trim() === "" || editValue === originalValue)) ||
        (editField === 'equipment_quality' && starRating === parseInt(originalValue));

    const handleSaveEdit = async () => {
        if (isSaveDisabled) {
            console.log("⚠️ Salvar desabilitado: valor não mudou ou está vazio.");
            return;
        }

        setModalVisible(false);
        setIsLoading(true);

        const apiFunction = apiEditFunctions[editField];
        if (!apiFunction) {
            Alert.alert("Erro", "Função de edição não encontrada.");
            setIsLoading(false);
            return;
        }

        let valueToSend;

        if (editField === 'equipment_quality') {
            valueToSend = starRating;
        } else if (numericFields[editField]) {
            valueToSend = parseInt(editValue.trim());
            
            if (isNaN(valueToSend)) {
                Alert.alert("Erro", "Digite um número inteiro válido.");
                setIsLoading(false);
                return;
            }
        } else {
            valueToSend = editValue.trim();
        }
        
        // Log de Envio de Dados
        console.log(`--- Tentativa de Salvar Edição ---`);
        console.log("equipmentId:", equipmentId);
        console.log("Campo sendo editado:", editField);
        console.log("Valor a ser enviado:", valueToSend, `(Tipo: ${typeof valueToSend})`);


        try {
            const raw = await apiFunction(equipmentId, valueToSend);
            const response = normalizeResponse(raw);

            // Log de Resposta da API
            console.log("API Response (Save Edit):", response);

            if (response?.status) {
                setEquipmentInfo((prev) => ({
                    ...prev,
                    [editField]: valueToSend, 
                }));
                // Mensagem de sucesso da API, conforme solicitado
                Alert.alert("Sucesso", response?.msg || `O campo ${editField} foi atualizado!`);
                console.log("✅ Salvamento bem-sucedido.");
            } else {
                // Mensagem de erro da API
                Alert.alert("Erro", response?.msg || "Falha ao atualizar.");
                console.error("❌ Falha no salvamento:", response?.msg);
            }
        } catch (err) {
            console.error("❌ Erro ao editar equipamento (API Call):", err);
            Alert.alert("Erro", "Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

   const handleDeleteEquipment = async () => {
        if (!labId) {
            Alert.alert("Erro", "ID do laboratório não encontrado.");
            return;
        }

        const equipmentIdInt = parseInt(equipmentId);
        if (isNaN(equipmentIdInt) || equipmentIdInt <= 0) {
            Alert.alert("Erro", "ID do equipamento inválido.");
            return;
        }

        setIsLoading(true);
        console.log(`--- Tentativa de Excluir Equipamento ${equipmentId} do Lab ${labId} ---`);

        try {
            const raw = await DeleteEquipment(equipmentId, labId);
            const response = normalizeResponse(raw);

            console.log("API Response (Delete Equipment):", response);

            if (response?.status) {

                // FECHA MODAL DE EXCLUSÃO
                setDeleteModalVisible(false);

                // ALERTA IGUAL AO DE ELEMENTOS
                Alert.alert("Sucesso", "Equipamento excluído.");

                console.log("✅ Exclusão bem-sucedida. Navegando...");

                // VOLTA PARA A LISTA DE EQUIPAMENTOS (IGUAL VOCÊ QUER)
                navigation.navigate("Equipaments", {
                    labId,
                    labName,
                });

            } else {
                Alert.alert("Erro", response?.msg || "Falha ao excluir.");
                console.error("❌ Falha na exclusão:", response?.msg);
            }
        } catch (err) {
            console.error("❌ Erro ao deletar equipamento (API Call):", err);
            Alert.alert("Erro", "Falha ao comunicar com API.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePickAndUploadImage = async () => {
        // Log de Upload
        console.log("--- Tentativa de Upload de Imagem ---");
        try {
             // ... restante da lógica de permissão e seleção (mantida) ...
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
            setIsUploadingImage(true);
            
            console.log("Enviando imagem Base64 (tamanho):", fullBase64.length);

            const raw = await EditEquipmentImage(equipmentId, fullBase64);
            const response = normalizeResponse(raw);
            
            console.log("API Response (Edit Equipment Image):", response);

            if (response?.status) {
                setEquipmentInfo((prev) => ({
                    ...prev,
                    equipment_image: fullBase64,
                }));
                Alert.alert("Sucesso", response?.msg || "Imagem atualizada!");
            } else {
                Alert.alert("Erro", response?.msg || "Falha ao atualizar imagem.");
            }
        } catch (err) {
            console.error("❌ Erro ao enviar imagem:", err);
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
                    Carregando Equipamento...
                </Text>
            </View>
        );
    }

    if (error || !equipmentInfo) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ color: "red", marginBottom: 15 }}>{error || "Erro ao carregar dados."}</Text>
                <TouchableOpacity
                    onPress={fetchEquipmentInfo}
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
        
        if (field === "equipment_quality") {
            const rating = parseInt(equipmentInfo?.equipment_quality) || 0;
            return (
                <TouchableOpacity
                    style={[
                        styles.infoField, 
                        // Aplicar styles.infoFieldEditable SOMENTE se isEditing for true
                        isEditing && styles.infoFieldEditable, 
                        { flexDirection: "row", alignItems: 'center', justifyContent: 'center' } 
                    ]}
                    disabled={!isEditing} // A borda verde indica que é clicável no modo de edição
                    onPress={() => openEditModal(field, value)}
                >
                    <View style={{ flexDirection: "row" }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Image
                                key={i}
                                source={i <= rating ? StarFull : StarEmpty}
                                style={{ 
                                    width: 30, 
                                    height: 30, 
                                    resizeMode: "contain", 
                                    marginHorizontal: 2, 
                                    opacity: isEditing ? 1 : 0.7 
                                }}
                            />
                        ))}
                    </View>
                </TouchableOpacity>
            );
        }

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

    const fallbackImageUri = "https://placehold.co/600x400?text=Sem+Imagem";

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.infoScrollContainer}>
                {/* Visualização e Edição da Imagem */}
                {isEditing ? (
                    <TouchableOpacity onPress={handlePickAndUploadImage} disabled={isUploadingImage}>
                        <Image
                            source={{
                                uri: equipmentInfo?.equipment_image || fallbackImageUri,
                            }}
                            style={styles.infoImageBackground}
                        />
                        {isUploadingImage && (
                            <View style={styles.imageUploadingOverlay}>
                                <ActivityIndicator size="large" color={colors.primary_green_dark} />
                                <Text style={{ color: colors.primary_text_gray, marginTop: 8 }}>
                                    Enviando imagem...
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ) : (
                    <Image
                        source={{
                            uri: equipmentInfo?.equipment_image || fallbackImageUri,
                        }}
                        style={styles.infoImageBackground}
                    />
                )}

                {/* Cabeçalho com Botões de Volta, Excluir e Editar */}
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

                {/* Campos de Informação na Ordem Correta */}
                <EditableField field="equipment_name" value={equipmentInfo.equipment_name} isTitle />
                <EditableField
                    field="equipment_description"
                    label="Descrição:"
                    value={equipmentInfo.equipment_description}
                />
                <EditableField
                    field="equipment_quantity"
                    label="Quantidade:"
                    value={String(equipmentInfo.equipment_quantity)}
                />
                <EditableField 
                    field="equipment_quality" 
                    value={String(equipmentInfo.equipment_quality)} 
                /> 
                <EditableField
                    field="equipment_admin_level"
                    label="Nível de Administração:"
                    value={String(equipmentInfo.equipment_admin_level)} 
                />
            </ScrollView>

            {/* MODAL DE EDIÇÃO GENÉRICO */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                 <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.centeredView}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            Editar {editField === 'equipment_quality' ? 'Qualidade' : editField}
                        </Text>
                        
                        {/* RENDERIZAÇÃO CONDICIONAL */}
                        {editField === 'equipment_quality' ? (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => setStarRating(i)}
                                    >
                                        <Image
                                            source={i <= starRating ? StarFull : StarEmpty}
                                            style={{ width: 40, height: 40, resizeMode: "contain", marginHorizontal: 4 }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <TextInput
                                style={styles.modalInput}
                                value={editValue}
                                onChangeText={(txt) => setEditValue(txt)}
                                placeholder={String(originalValue ?? "")}
                                keyboardType={numericFields[editField] ? "numeric" : "default"} 
                            />
                        )}

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    setEditValue(originalValue ?? ""); 
                                    setStarRating(0); 
                                }}
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
                 </KeyboardAvoidingView>
            </Modal>

            {/* MODAL DE EXCLUSÃO */}
            <Modal animationType="fade" transparent={true} visible={deleteModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Deseja excluir este equipamento?</Text>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setDeleteModalVisible(false)}
                                style={styles.modalCancelButton}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDeleteEquipment}
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