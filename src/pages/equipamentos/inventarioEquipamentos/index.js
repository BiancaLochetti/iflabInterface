// Importações
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import colors from "../../../colors";
import { styles } from "./styles";
import { ListLabEquipments } from "../../../api/equipmentsRequests";

// Componente de item da lista de equipamentos
const EquipamentoListItem = ({ equipamento, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => onPress(equipamento.equipmentId)}
        >
            <View style={styles.listItemTextContent}>
                <Text style={styles.listItemName}>Nome: {equipamento.name}</Text>
                <Text style={styles.listItemDetail}>
                    Descrição: {equipamento.description || "Sem descrição"}
                </Text>
            </View>
            <View style={styles.listItemRightContent}>
                <Text style={styles.listItemQuantity}>{equipamento.quantity}</Text>
            </View>
        </TouchableOpacity>
    );
};

// Tela principal de inventário de equipamentos
export default function EquipmentInventoryScreen() {
    const route = useRoute();
    const { labId, labName } = route.params || {};
    const navigation = useNavigation();

    const [equipments, setEquipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Buscar equipamentos do laboratório
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const data = await ListLabEquipments(labId);

            if (data.status) {
                setEquipments(data.equipmentsList);
            } else {
                console.error("Erro ao buscar equipamentos:", data.msg);
            }
            setIsLoading(false);
        }

        fetchData();
    }, [labId]);

    const handleEquipmentPress = (equipmentId) => {
        navigation.navigate("infoEquipamentos", { equipmentId, labId, labName });
    };

    const handleAddEquipmentPress = () => {
        navigation.navigate("addEquipamento", { labId, labName });
    };

    const filteredEquipments = equipments.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading && equipments.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.secundary_green} />
                <Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
                    Carregando Equipamentos...
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={{ position: "absolute", left: 0 }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require("../../../assets/icons/UI/chevrom.png")}
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

            {/* Barra de pesquisa e botão adicionar */}
            <View style={styles.searchRow}>
                <View style={styles.searchInputWrapper}>
                    <MaterialIcons
                        name="search"
                        size={24}
                        color={colors.primary_text_gray}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar equipamento"
                        placeholderTextColor={colors.input_text_gray}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleAddEquipmentPress}
                    style={styles.addElementButton}
                >
                    <AntDesign name="plus" size={14} color={colors.primary_text_gray} />
                    <Text style={styles.addElementText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de equipamentos */}
            <ScrollView contentContainerStyle={styles.listContainer}>
                {filteredEquipments.length > 0 ? (
                    filteredEquipments.map((equipamento) => (
                        <EquipamentoListItem
                            key={equipamento.equipmentId}
                            equipamento={equipamento}
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
