// Import nativo
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Importações do React Navigation
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import de Cores
import colors from "../../colors";
// Import estilização
import { styles } from "./styles";

// Import das imagens
import logoImage from "../../assets/images/logo.png";
import StarFull from "../../assets/icons/UI/quality-1.png";
import StarEmpty from "../../assets/icons/UI/quality-2.png";

// Import API
import {
  RegisterEquipment,
  DeleteEquipment,
  ListLabEquipments,
  ListSessionEquipments,
  GetEquipmentInfo,
  EditEquipmentName,
  EditEquipmentQuantity,
  EditEquipmentQuality,
  EditEquipmentDescription,
  EditEquipmentAdministration,
  EditEquipmentImage,
} from "../../api/equipmentsRequests";

// =================================================================
// FUNÇÕES UTILS E MOCKS
// =================================================================
const labIdMock = "mock_lab_id";
const mockEquipments = [
  // MOCKS para simular os dados da lista e das info
  {
    id: "e1",
    equipment_name: "Balança Analítica",
    equipment_quantity: "2",
    equipment_quality: "Excelente",
    equipment_description:
      "A balança analítica é um equipamento de alta precisão...",
    equipment_admin_level: "IFLab",
    equipment_image:
      "https://via.placeholder.com/600/CCCCCC/808080?text=Balança+Analítica",
    lab_id: labIdMock,
  },
  {
    id: "e2",
    equipment_name: "Bico de Bunsen",
    equipment_quantity: "1",
    equipment_quality: "Boa",
    equipment_description: "Aquecimento e esterilização",
    equipment_admin_level: "Elemento sob cuidados do exército Brasileiro",
    equipment_image:
      "https://via.placeholder.com/600/CCCCCC/808080?text=Bico+de+Bunsen",
    lab_id: labIdMock,
  },
  {
    id: "e3",
    equipment_name: "Bureta",
    equipment_quantity: "4",
    equipment_quality: "Regular",
    equipment_description: "Titulações para adicionar líquido com pressão",
    equipment_admin_level: "Elemento sob cuidados da polícia federal",
    equipment_image:
      "https://via.placeholder.com/600/CCCCCC/808080?text=Bureta",
    lab_id: labIdMock,
  },
  {
    id: "e4",
    equipment_name: "Pipeta",
    equipment_quantity: "8",
    equipment_quality: "Péssima",
    equipment_description: "Utilizada em medição em alta precisão",
    equipment_admin_level: "IFLab",
    equipment_image:
      "https://via.placeholder.com/600/CCCCCC/808080?text=Pipeta",
    lab_id: labIdMock,
  },
];

const formatDisplayField = (value) => {
  return value && value.trim() !== "" ? value : "Não informado";
};

// Componente para renderizar a Qualidade
const StarRating = ({ quality }) => {
  let rating = 0;
  const qualityMap = { Excelente: 5, Boa: 4, Regular: 3, Ruim: 2, Péssima: 1 };
  rating = qualityMap[quality] || 0;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        source={i <= rating ? StarFull : StarEmpty} // Usa as imagens importadas
        style={{ width: 20, height: 20, marginRight: 5, resizeMode: "contain" }}
      />
    );
  }
  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

// Componente para um item na lista
const EquipmentListItem = ({ equipment, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => onPress(equipment.id)}
    >
      <View style={styles.listItemTextContent}>
        <Text style={styles.listItemName}>
          Nome: {equipment.equipment_name}
        </Text>
        <Text style={styles.listItemDetail} numberOfLines={1}>
          Descrição: {equipment.equipment_description}
        </Text>
        {equipment.equipment_admin_level &&
          equipment.equipment_admin_level !== "IFLab" && (
            <View style={styles.listItemAdminLevelContainer}>
              <AntDesign
                name="infocirlceo"
                size={14}
                color={colors.primary_text_gray}
              />
              <Text style={styles.listItemAdminLevelText} numberOfLines={1}>
                {equipment.equipment_admin_level}
              </Text>
            </View>
          )}
      </View>
      <View style={styles.listItemRightContent}>
        <Text style={styles.listItemQuantity}>
          {equipment.equipment_quantity} uni
        </Text>
      </View>
    </TouchableOpacity>
  );
};
// =================================================================

// =================================================================
// TELA 1: INVENTÁRIO (EquipmentInventoryScreen)
// =================================================================
function EquipmentInventoryScreen() {
  const route = useRoute();
  const { labName } = route.params;

  // ... (Mantido da resposta anterior) ...
  const navigation = useNavigation();
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const labId = labIdMock;

  const fetchEquipments = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const filteredMockEquipments = mockEquipments.filter(
        (e) => e.lab_id === labId
      );
      const response = { status: true, data: filteredMockEquipments };

      if (response.status && response.data) {
        setEquipments(response.data);
      } else {
        Alert.alert(
          "Erro",
          response.msg ||
            "Não foi possível carregar o inventário de equipamentos."
        );
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Falha ao se comunicar com o servidor.");
    }
    setIsLoading(false);
  }, [labId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchEquipments);
    fetchEquipments();
    return unsubscribe;
  }, [navigation, fetchEquipments]);

  const filteredEquipments = equipments.filter(
    (equipment) =>
      equipment.equipment_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      equipment.equipment_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleEquipmentPress = (equipmentId) => {
    // CORREÇÃO: Garantindo o roteamento correto
    navigation.navigate("EquipmentInfo", { equipmentId });
  };

  const handleAddEquipmentPress = () => {
    navigation.navigate("NewEquipment");
  };

  if (isLoading && equipments.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secundary_green} />
        <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
          Carregando Inventário de Equipamentos...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/icons/UI/chevrom.png")}
            style={{
              tintColor: colors.contrastant_gray,
              width: 30,
              height: 30,
              transform: [{ rotate: "90deg" }],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: colors.primary_green_dark,
          }}
        >
          {labName || "Laboratório"}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color={colors.primary_text_gray}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar um equipamento"
          placeholderTextColor={colors.input_text_gray}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity
          onPress={handleAddEquipmentPress}
          style={styles.addElementButton}
        >
          <AntDesign name="plus" size={16} color={colors.primary_text_gray} />
          <Text style={styles.addElementText}>Adicionar equipamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qrIcon}>
          <MaterialIcons
            name="grid-on"
            size={24}
            color={colors.primary_text_gray}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredEquipments.length > 0 ? (
          filteredEquipments.map((equipment) => (
            <EquipmentListItem
              key={equipment.id}
              equipment={equipment}
              onPress={handleEquipmentPress}
            />
          ))
        ) : (
          <Text style={styles.noElementsText}>
            Nenhum equipamento encontrado neste laboratório.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// =================================================================
// TELA 2: INFORMAÇÕES DO EQUIPAMENTO (EquipmentInfoScreen)
// =================================================================
function EquipmentInfoScreen({ route }) {
  const navigation = useNavigation();

  const { equipmentId } = route.params || {};

  const [equipmentInfo, setEquipmentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [originalValue, setOriginalValue] = useState("");
  const isSaveButtonDisabled =
    editValue === originalValue || editValue.trim() === "";

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const apiEditFunctions = {
    /* ... */
  };

  // Função de buscar dados
  const fetchEquipmentInfo = useCallback(async () => {
    if (!equipmentId) {
      // Saída rápida se não houver ID
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // MOCK:
      await new Promise((resolve) => setTimeout(resolve, 300));
      const info = mockEquipments.find((e) => e.id === equipmentId);
      const response = { status: true, data: info };

      if (response.status && response.data) {
        setEquipmentInfo(response.data);
      } else {
        Alert.alert("Erro", response.msg || "Equipamento não encontrado.");
      }
    } catch (error) {
      Alert.alert(
        "Erro de Conexão",
        "Falha ao carregar informações do equipamento."
      );
    }
    setIsLoading(false);
  }, [equipmentId]);

  useEffect(() => {
    if (!equipmentId) {
      Alert.alert(
        "Erro de Roteamento",
        "ID do equipamento não fornecido. Voltando."
      );
      navigation.goBack();
      return;
    }
    const unsubscribe = navigation.addListener("focus", fetchEquipmentInfo);
    fetchEquipmentInfo();
    return unsubscribe;
  }, [navigation, fetchEquipmentInfo, equipmentId]);

  const handleDeleteEquipment = async () => {
    setDeleteModalVisible(false);
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = {
        status: true,
        msg: "Equipamento excluído com sucesso.",
      };

      if (response.status) {
        Alert.alert("Sucesso", response.msg);
        navigation.goBack();
      } else {
        Alert.alert(
          "Erro",
          response.msg || "Não foi possível excluir o equipamento."
        );
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Falha ao excluir o equipamento.");
    }
    setIsLoading(false);
  };

  const handleSaveEdit = async () => {
    if (isSaveButtonDisabled) return;

    setModalVisible(false);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = { status: true, msg: `Campo ${editField} atualizado.` };

      if (response.status) {
        setEquipmentInfo((prev) => ({ ...prev, [editField]: editValue }));
        Alert.alert("Sucesso", response.msg);
      } else {
        Alert.alert(
          "Erro",
          response.msg || "Não foi possível salvar a edição."
        );
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Falha ao comunicar-se com a API.");
    }
    setIsLoading(false);
  };

  // Abre o modal de edição
  const openEditModal = (field, currentValue) => {
    setEditField(field);
    setOriginalValue(currentValue || "");
    setEditValue(currentValue || "");
    setModalVisible(true);
  };

  // Componente de Campo Editável
  const EditableField = ({ field, label, value, isTitle = false }) => {
    const FieldContainer = isEditing ? TouchableOpacity : View;
    const valueStyle = isTitle
      ? { fontSize: 24, fontWeight: "bold", color: colors.primary_text_gray }
      : styles.infoValue;

    // Tratamento para o campo Qualidade (estrelas)
    if (field === "equipment_quality" && !isTitle) {
      return (
        <FieldContainer
          style={[styles.infoField, isEditing && styles.infoFieldEditable]}
          onPress={
            isEditing ? () => openEditModal(field, equipmentInfo[field]) : null
          }
          activeOpacity={isEditing ? 0.7 : 1}
        >
          <Text style={styles.infoLabel}>{label}</Text>
          <StarRating quality={value} />
        </FieldContainer>
      );
    }

    return (
      <FieldContainer
        style={[
          styles.infoField,
          isEditing && styles.infoFieldEditable,
          isTitle && {
            backgroundColor: "transparent",
            marginBottom: 0,
            borderWidth: 0,
          },
        ]}
        onPress={
          isEditing ? () => openEditModal(field, equipmentInfo[field]) : null
        }
        activeOpacity={isEditing ? 0.7 : 1}
      >
        {!isTitle && <Text style={styles.infoLabel}>{label}</Text>}
        <Text style={valueStyle}>{formatDisplayField(value)}</Text>
      </FieldContainer>
    );
  };

  // Se o ID estiver faltando ou info estiver carregando
  if (!equipmentId || isLoading || !equipmentInfo) {
    return (
      <View style={styles.loadingContainer}>
        {/* Mostra o spinner apenas se houver ID, caso contrário, deve voltar rapidamente. */}
        {equipmentId && (
          <ActivityIndicator size="large" color={colors.secundary_green} />
        )}
        <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
          {equipmentId
            ? "Carregando Equipamento..."
            : "Erro. A tela deve voltar automaticamente."}
        </Text>
      </View>
    );
  }

  // Header da tela de informação
  const EquipmentInfoHeader = () => (
    /* ... */
    <View style={styles.infoHeader}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={colors.primary_text_gray}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Excluir equipamento</Text>
          <MaterialIcons
            name="delete"
            size={24}
            color={colors.alert_red_btns}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsEditing((prev) => !prev)}
          style={styles.editIcon}
        >
          <MaterialIcons
            name={isEditing ? "check" : "edit"}
            size={24}
            color={
              isEditing ? colors.primary_green_dark : colors.primary_text_gray
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Imagem de Fundo */}
      <Image
        source={{ uri: equipmentInfo.equipment_image || "" }}
        style={styles.infoImageBackground}
      />

      <EquipmentInfoHeader />

      <ScrollView contentContainerStyle={styles.infoScrollContainer}>
        {/* Nome do Equipamento (Título) */}
        <EditableField
          field="equipment_name"
          label=""
          value={equipmentInfo.equipment_name}
          isTitle={true}
        />

        <View style={styles.infoGrid}>
          <View style={styles.infoGridItemContainer}>
            <EditableField
              field="equipment_quantity"
              label="Quantidade:"
              value={equipmentInfo.equipment_quantity}
            />
          </View>
          <View style={styles.infoGridItemContainer}>
            <EditableField
              field="equipment_admin_level"
              label="Admin:"
              value={equipmentInfo.equipment_admin_level || "IFLab"}
            />
          </View>
        </View>

        {/* Qualidade - renderizado com estrelas */}
        <EditableField
          field="equipment_quality"
          label="Qualidade:"
          value={equipmentInfo.equipment_quality}
        />

        {/* Descrição em campo próprio */}
        <EditableField
          field="equipment_description"
          label="Descrição:"
          value={equipmentInfo.equipment_description}
        />

        {/* Botão Mostrar QRCode */}
        <TouchableOpacity
          onPress={() => setQrModalVisible(true)}
          style={[
            styles.infoField,
            { justifyContent: "center", marginTop: 20 },
          ]}
        >
          <Text style={[styles.infoValue, { color: colors.primary_text_gray }]}>
            Mostrar QRCode
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals: Edição, Exclusão e QR Code */}
      {/* ... */}
    </View>
  );
}

// =================================================================
// TELA 3: NOVO EQUIPAMENTO (NewEquipmentScreen)
// =================================================================
function NewEquipmentScreen() {
  /* ... */
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quality, setQuality] = useState("");
  const [description, setDescription] = useState("");
  const [admin, setAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Todos os campos com * precisam ser preenchidos, exceto 'admin' e 'description'
  const isSaveEnabled = name.trim() && quantity.trim() && quality.trim();

  async function handleRegisterEquipment() {
    /* ... */
    if (!isSaveEnabled) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios (*).");
      return;
    }

    setIsLoading(true);
    const lab_id = labIdMock;
    const equipment_image = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = {
        status: true,
        msg: "Equipamento registrado com sucesso.",
      };

      if (response.status) {
        Alert.alert("Sucesso", response.msg);
        navigation.goBack();
      } else {
        Alert.alert(
          "Erro",
          response.msg || "Não foi possível registrar o novo equipamento."
        );
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Falha ao registrar o equipamento.");
    }

    setIsLoading(false);
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
        style={[
          styles.backButton,
          { position: "absolute", top: 50, left: 10, zIndex: 10 },
        ]}
      >
        <MaterialIcons
          name="close"
          size={24}
          color={colors.primary_text_gray}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.newElementScrollContainer}>
        <View style={styles.newElementHeader}>
          <Text style={styles.newElementTitle}>Novo Equipamento</Text>
          <View style={styles.imagePlaceholder}>
            <MaterialIcons
              name="add-a-photo"
              size={40}
              color={colors.contrastant_gray}
            />
          </View>
        </View>

        {/* Inputs do Formulário */}
        <TextInput
          style={styles.newElementInput}
          placeholder="* Nome do equipamento"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Quantidade (ex: 5)"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={styles.newElementInput}
          placeholder="* Qualidade (ex: Excelente, Boa, Regular)"
          value={quality}
          onChangeText={setQuality}
          placeholderTextColor={colors.input_text_gray}
        />
        <TextInput
          style={[styles.newElementInput, { height: 80 }]}
          placeholder="Descrição (Opcional)"
          value={description}
          onChangeText={setDescription}
          multiline={true}
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

      <View style={styles.newElementFooter}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: isSaveEnabled
                ? colors.primary_green_dark
                : colors.white_dark,
            },
          ]}
          onPress={handleRegisterEquipment}
          disabled={!isSaveEnabled}
        >
          <Text
            style={[
              styles.saveButtonText,
              {
                color: isSaveEnabled
                  ? colors.white_full
                  : colors.contrastant_gray,
              },
            ]}
          >
            Salvar novo equipamento
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
 * Componente que deve ser usado como o componente da sua aba "Equipamentos" no BottomTabNavigator.
 */
export default function EquipmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EquipmentInventory"
        component={EquipmentInventoryScreen}
      />
      <Stack.Screen name="EquipmentInfo" component={EquipmentInfoScreen} />
      <Stack.Screen
        name="NewEquipment"
        component={NewEquipmentScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
