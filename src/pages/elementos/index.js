// Import nativo
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert, Modal, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 

// Importações do React Navigation
import { useNavigation, useRoute } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack"; 
import { format } from 'date-fns';

// Import de Cores
import colors from "../../colors";

// Import estilização
import { styles } from "./styles"; 

// Import do logo
import logoImage from "../../assets/images/logo.png"; 

// Import API 
import {
    RegisterElement,
    DeleteElement,
    ListLabElements,
    GetElementInfo,
    EditElementName,
    EditElementQuantity,
    EditElementCAS,
    EditElementEC,
    EditElementPhysicalState,
    EditElementValidity,
    EditElementAdministration,
    EditElementMolarMass,
} from "../../api/elementsRequests";

// =================================================================
// FUNÇÕES UTILS E MOCKS
// =================================================================
const labIdMock = "mock_lab_id"; 
const mockElements = [
    { id: "1", element_name: "Cloreto de sódio", element_cas_number: "7647-14-5", element_ec_number: "231-598-3", element_quantity: "250g", element_validity: new Date(2026, 2, 26).toISOString(), element_admin_level: null, element_image: 'https://images.unsplash.com/photo-1596541530347-130282163b7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lab_id: labIdMock, element_molar_mass: '58.44 g/mol', element_physical_state: 'Sólido' },
    { id: "2", element_name: "Éter dietílico", element_cas_number: "7312-12-6", element_ec_number: "231-598-3", element_quantity: "390g", element_validity: new Date(2029, 3, 12).toISOString(), element_admin_level: "Elemento sob cuidados do exército Brasileiro", element_image: 'https://images.unsplash.com/photo-1579201948496-c68bb45e54d3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lab_id: labIdMock, element_molar_mass: '74.12 g/mol', element_physical_state: 'Líquido' },
    { id: "3", element_name: "Benzeno hidratado", element_cas_number: "3165-32-3", element_ec_number: "941-538-1", element_quantity: "500g", element_validity: new Date(2030, 1, 13).toISOString(), element_admin_level: "Elemento sob cuidados da polícia federal", element_image: 'https://images.unsplash.com/photo-1579201948496-c68bb45e54d3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lab_id: labIdMock, element_molar_mass: '78.11 g/mol', element_physical_state: 'Líquido' },
    { id: "4", element_name: "Cloreto salinico", element_cas_number: "7984-19-5", element_ec_number: "654-111-3", element_quantity: "194g", element_validity: new Date(2056, 7, 4).toISOString(), element_admin_level: null, element_image: 'https://images.unsplash.com/photo-1596541530347-130282163b7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lab_id: labIdMock, element_molar_mass: '110.12 g/mol', element_physical_state: 'Gás' },
];

const formatNativeDate = (dateString) => {
    if (!dateString) return 'S/ Data';
    try {
        const date = new Date(dateString);
        if (isNaN(date)) return 'Data Inválida'; 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) {
        return 'Data Inválida';
    }
};

const formatDisplayField = (value, field) => {
    if (!value) return "Não informado";
    if (field === 'element_validity') { 
        try {
            return typeof format === 'function' ? format(new Date(value), 'dd/MM/yyyy') : formatNativeDate(value);
        } catch (e) {
            return formatNativeDate(value);
        }
    }
    return value;
};

// Componente para um item na lista
const ElementListItem = ({ element, onPress }) => {
    const formattedDate = formatDisplayField(element.element_validity, 'element_validity');

    return (
        <TouchableOpacity style={styles.listItemContainer} onPress={() => onPress(element.id)}>
            <View style={styles.listItemTextContent}>
                <Text style={styles.listItemName}>Nome: {element.element_name}</Text>
                <Text style={styles.listItemDetail}>Número CAS: {element.element_cas_number}</Text>
                <Text style={styles.listItemDetail}>Número EC: {element.element_ec_number}</Text>
                {element.element_admin_level && (
                    <View style={styles.listItemAdminLevelContainer}>
                        <AntDesign name="infocirlceo" size={14} color={colors.secundary_green} />
                        <Text style={styles.listItemAdminLevelText}>
                            {element.element_admin_level}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.listItemRightContent}>
                <Text style={styles.listItemQuantity}>{element.element_quantity}</Text>
                <Text style={styles.listItemValidity}>val. {formattedDate}</Text>
            </View>
        </TouchableOpacity>
    );
};
// =================================================================


// =================================================================
// TELA 1: INVENTÁRIO (InventoryScreen)
// =================================================================
function InventoryScreen() {
    const navigation = useNavigation(); 
    const [elements, setElements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const labId = labIdMock; 

    const fetchElements = useCallback(async () => {
        setIsLoading(true);
        try {
            // MOCK:
            await new Promise(resolve => setTimeout(resolve, 500)); 
            const filteredMockElements = mockElements.filter(e => e.lab_id === labId);
            const response = { status: true, data: filteredMockElements };
            
            if (response.status && response.data) {
                setElements(response.data);
            } else {
                Alert.alert("Erro", response.msg || "Não foi possível carregar o inventário.");
            }
        } catch (error) {
            Alert.alert("Erro de Conexão", "Falha ao se comunicar com o servidor.");
        }
        setIsLoading(false);
    }, [labId]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchElements);
        fetchElements();
        return unsubscribe;
    }, [navigation, fetchElements]);

    const filteredElements = elements.filter(element =>
        element.element_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.element_cas_number.includes(searchTerm)
    );

    const handleElementPress = (elementId) => {
        navigation.navigate('ElementInfo', { elementId }); 
    };

    const handleAddElementPress = () => {
        navigation.navigate('NewElement'); 
    };

    if (isLoading && elements.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.secundary_green} /> 
                <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>Carregando Inventário...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* LOGO USANDO A IMAGEM E O NOVO TAMANHO MAIOR */}
                <Image source={logoImage} style={styles.logo} /> 
                
                <View style={styles.profileImagePlaceholder} />
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color={colors.primary_text_gray} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar um elemento"
                    placeholderTextColor={colors.input_text_gray} 
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity onPress={handleAddElementPress} style={styles.addElementButton}>
                    <AntDesign name="plus" size={16} color={colors.primary_text_gray} />
                    <Text style={styles.addElementText}>Adicionar elemento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrIcon}>
                    <MaterialIcons name="grid-on" size={24} color={colors.primary_text_gray} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.listContainer}>
                {filteredElements.length > 0 ? (
                    filteredElements.map(element => (
                        <ElementListItem
                            key={element.id}
                            element={element}
                            onPress={handleElementPress}
                        />
                    ))
                ) : (
                    <Text style={styles.noElementsText}>Nenhum elemento encontrado neste laboratório.</Text>
                )}
            </ScrollView>
        </View>
    );
}

// =================================================================
// TELA 2: INFORMAÇÕES DO ELEMENTO (ElementInfoScreen)
// =================================================================
function ElementInfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { elementId } = route.params; 
    
    const [elementInfo, setElementInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Estados para o Modal de Edição
    const [modalVisible, setModalVisible] = useState(false);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [originalValue, setOriginalValue] = useState('');
    const isSaveButtonDisabled = editValue === originalValue || editValue.trim() === '';
    
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    
    // Mapeamento das funções da API para os campos
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

    // Função de buscar dados
    const fetchElementInfo = useCallback(async () => {
        setIsLoading(true);
        try {
            // MOCK:
            await new Promise(resolve => setTimeout(resolve, 300));
            const info = mockElements.find(e => e.id === elementId);
            const response = { status: true, data: info };

            if (response.status && response.data) {
                setElementInfo(response.data);
            } else {
                 Alert.alert("Erro", response.msg || "Elemento não encontrado.");
            }
        } catch (error) {
            Alert.alert("Erro de Conexão", "Falha ao carregar informações do elemento.");
        }
        setIsLoading(false);
    }, [elementId]);

    useEffect(() => { 
        const unsubscribe = navigation.addListener('focus', fetchElementInfo);
        return unsubscribe;
    }, [navigation, fetchElementInfo]);
    
    // Função de Excluir
    const handleDeleteElement = async () => { 
        setDeleteModalVisible(false);
        setIsLoading(true);
        try {
            // MOCK:
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = { status: true, msg: "Elemento excluído com sucesso." };
            
            if (response.status) {
                Alert.alert("Sucesso", response.msg);
                navigation.goBack();
            } else {
                 Alert.alert("Erro", response.msg || "Não foi possível excluir o elemento.");
            }
        } catch (error) {
            Alert.alert("Erro de Conexão", "Falha ao excluir o elemento.");
        }
        setIsLoading(false);
    };

    // Função de Salvar Edição
    const handleSaveEdit = async () => {
        if (isSaveButtonDisabled) return;

        setModalVisible(false);
        setIsLoading(true);
        const apiFunction = apiEditFunctions[editField];

        try {
            // MOCK:
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = { status: true, msg: `Campo ${editField} atualizado.` };

            if (response.status) {
                setElementInfo(prev => ({ ...prev, [editField]: editValue }));
                Alert.alert("Sucesso", response.msg);
            } else {
                Alert.alert("Erro", response.msg || "Não foi possível salvar a edição.");
            }

        } catch (error) {
            Alert.alert("Erro de Conexão", "Falha ao comunicar-se com a API.");
        }
        setIsLoading(false);
    };

    // Abre o modal de edição
    const openEditModal = (field, currentValue) => { 
        setEditField(field);
        setOriginalValue(currentValue || '');
        setEditValue(currentValue || '');
        setModalVisible(true);
    };

    // Componente de Campo Editável
    const EditableField = ({ field, label, value, isTitle = false }) => {
        const FieldContainer = isEditing ? TouchableOpacity : View;
        const valueStyle = isTitle ? { fontSize: 24, fontWeight: 'bold', color: colors.primary_text_gray } : styles.infoValue;

        return (
            <FieldContainer 
                style={[
                    styles.infoField, 
                    isEditing && styles.infoFieldEditable,
                    isTitle && { backgroundColor: 'transparent', marginBottom: 0, borderWidth: 0 }
                ]} 
                onPress={isEditing ? () => openEditModal(field, elementInfo[field]) : null}
                activeOpacity={isEditing ? 0.7 : 1}
            >
                {!isTitle && <Text style={styles.infoLabel}>{label}</Text>}
                <Text style={valueStyle}>{formatDisplayField(value, field)}</Text>
            </FieldContainer>
        );
    };

    if (isLoading || !elementInfo) {
         return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.secundary_green} />
                <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>Carregando Elemento...</Text>
            </View>
        );
    }
    
    // Header da tela de informação
    const ElementInfoHeader = () => (
        <View style={styles.infoHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color={colors.primary_text_gray} />
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Excluir elemento</Text>
                    <MaterialIcons name="delete" size={24} color={colors.alert_red_btns} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsEditing(prev => !prev)} style={styles.editIcon}>
                    <MaterialIcons 
                        name={isEditing ? "check" : "edit"} 
                        size={24} 
                        color={isEditing ? colors.primary_green_dark : colors.primary_text_gray} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Imagem de Fundo */}
            <Image 
                source={{ uri: elementInfo.element_image || 'https://via.placeholder.com/600/CCCCCC/808080?text=Sem+Imagem' }} 
                style={styles.infoImageBackground} 
            />

            <ElementInfoHeader />
            
            <ScrollView contentContainerStyle={styles.infoScrollContainer}>
                
                {/* Nome do Elemento (Título) */}
                <EditableField field='element_name' label="" value={elementInfo.element_name} isTitle={true} />

                <View style={styles.infoGrid}>
                    <View style={styles.infoGridItemContainer}>
                        <EditableField field='element_molar_mass' label="Massa molar:" value={elementInfo.element_molar_mass} />
                    </View>
                    <View style={styles.infoGridItemContainer}>
                        <EditableField field='element_quantity' label="Qtd.:" value={elementInfo.element_quantity} />
                    </View>
                </View>
                
                <EditableField field='element_cas_number' label="Número CAS:" value={elementInfo.element_cas_number} />
                <EditableField field='element_ec_number' label="Número CE:" value={elementInfo.element_ec_number} />
                <EditableField field='element_physical_state' label="Estado Físico:" value={elementInfo.element_physical_state} />
                <EditableField field='element_validity' label="Data de validade:" value={elementInfo.element_validity} />
                <EditableField field='element_admin_level' label="Nível de Administração:" value={elementInfo.element_admin_level} />
                
                {/* Botão Mostrar QRCode */}
                <TouchableOpacity onPress={() => setQrModalVisible(true)} style={[styles.infoField, {justifyContent: 'center', marginTop: 20}]}>
                    <Text style={[styles.infoValue, {color: colors.primary_text_gray}]}>Mostrar QRCode</Text>
                </TouchableOpacity>

                
            </ScrollView>
            
            {/* Modal de Edição */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Editar {editField === 'element_name' ? 'nome do elemento' : editField}</Text>
                        <TextInput 
                            style={styles.modalInput} 
                            onChangeText={setEditValue} 
                            value={editValue} 
                            placeholder={originalValue}
                            placeholderTextColor={colors.input_text_gray}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalCancelText}>Desfazer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[
                                    styles.modalSaveButton, 
                                    isSaveButtonDisabled && styles.modalSaveButtonDisabled
                                ]} 
                                onPress={handleSaveEdit}
                                disabled={isSaveButtonDisabled} 
                            >
                                <Text 
                                    style={[
                                        styles.modalSaveText,
                                        isSaveButtonDisabled && styles.modalSaveTextDisabled
                                    ]}
                                >
                                    Salvar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            {/* Modal de Exclusão */}
            <Modal animationType="fade" transparent={true} visible={deleteModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Deseja excluir este elemento?</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', color: colors.primary_text_gray }}>Esta é uma ação irreversível e não pode ser desfeita.</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setDeleteModalVisible(false)}>
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalSaveButton, { backgroundColor: colors.alert_red_btns }]} onPress={handleDeleteElement}>
                                <Text style={styles.modalSaveText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
             {/* Modal de QR Code (Simulação) */}
            <Modal animationType="fade" transparent={true} visible={qrModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{elementInfo.element_name}</Text>
                        <View style={{ width: 200, height: 200, backgroundColor: colors.white_full, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: colors.emphasis_gray }}>
                            <Text style={{ fontSize: 10, color: colors.primary_text_gray }}>[QR CODE SIMULADO]</Text>
                            <Text style={{ fontSize: 8, color: colors.primary_text_gray }}>ID: {elementId}</Text>
                        </View>
                        <TouchableOpacity style={[styles.modalCancelButton, { flex: 0, paddingHorizontal: 30 }]} onPress={() => setQrModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// =================================================================
// TELA 3: NOVO ELEMENTO (NewElementScreen)
// =================================================================
function NewElementScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [molarMass, setMolarMass] = useState('');
    const [quantity, setQuantity] = useState('');
    const [cas, setCas] = useState('');
    const [ec, setEc] = useState('');
    const [physicalState, setPhysicalState] = useState('');
    const [validity, setValidity] = useState('');
    const [admin, setAdmin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Todos os campos com * precisam ser preenchidos, exceto 'admin'
    const isSaveEnabled = name.trim() && molarMass.trim() && quantity.trim() && cas.trim() && ec.trim() && physicalState.trim() && validity.trim();

    async function handleRegisterElement() {
        if (!isSaveEnabled) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios (*).");
            return;
        }

        setIsLoading(true);
        const lab_id = labIdMock; 
        const element_image = null; 
        
        try {
            // MOCK:
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = { status: true, msg: "Elemento registrado com sucesso." };

            if (response.status) {
                Alert.alert("Sucesso", response.msg);
                navigation.goBack(); 
            } else {
                Alert.alert("Erro", response.msg || "Não foi possível registrar o novo elemento.");
            }
        } catch (error) {
            Alert.alert("Erro de Conexão", "Falha ao registrar o elemento.");
        }

        setIsLoading(false);
    }

    if (isLoading) {
         return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.secundary_green} />
                <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>Registrando Elemento...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, {position: 'absolute', top: 50, left: 10, zIndex: 10}]}>
                <MaterialIcons name="close" size={24} color={colors.primary_text_gray} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.newElementScrollContainer}>
                
                <View style={styles.newElementHeader}>
                    <Text style={styles.newElementTitle}>Novo elemento</Text>
                    <View style={styles.imagePlaceholder}>
                        <MaterialIcons name="add-a-photo" size={40} color={colors.contrastant_gray} />
                    </View>
                </View>

                {/* Inputs do Formulário */}
                <TextInput style={styles.newElementInput} placeholder="* Nome do elemento" value={name} onChangeText={setName} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="* Massa molar" value={molarMass} onChangeText={setMolarMass} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="* Quantidade e Unidade (ex: 500ml)" value={quantity} onChangeText={setQuantity} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="* Número CAS" value={cas} onChangeText={setCas} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="* Número CE" value={ec} onChangeText={setEc} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="* Estado Físico (Líquido/Sólido/Gás)" value={physicalState} onChangeText={setPhysicalState} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="* Validade (DD/MM/AAAA)" value={validity} onChangeText={setValidity} placeholderTextColor={colors.input_text_gray} />
                <TextInput style={styles.newElementInput} placeholder="Nível de Administração (Opcional)" value={admin} onChangeText={setAdmin} placeholderTextColor={colors.input_text_gray} />


            </ScrollView>

            <View style={styles.newElementFooter}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.saveButton, 
                        { backgroundColor: isSaveEnabled ? colors.primary_green_dark : colors.white_dark }
                    ]}
                    onPress={handleRegisterElement}
                    disabled={!isSaveEnabled}
                >
                    <Text 
                        style={[
                            styles.saveButtonText,
                            { color: isSaveEnabled ? colors.white_full : colors.contrastant_gray }
                        ]}
                    >
                        Salvar novo elemento
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


// =================================================================
// STACK NAVIGATOR PRINCIPAL
// =================================================================
const Stack = createStackNavigator();

/**
 * Componente que deve ser usado como o componente da sua aba "Home" no BottomTabNavigator.
 */
export default function ElementStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inventory" component={InventoryScreen} />
            <Stack.Screen name="ElementInfo" component={ElementInfoScreen} />
            <Stack.Screen name="NewElement" component={NewElementScreen} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
    );
}