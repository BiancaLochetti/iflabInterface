import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Image,
	Alert,
	ActivityIndicator,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import colors from "../../../colors";
import { styles } from "./styles";
import { ListLabElements } from "../../../api/elementsRequests";

const ElementListItem = ({ element, onPress }) => {
	const formattedDate = element.expirationDate
		? new Date(element.expirationDate).toLocaleDateString()
		: "S/ Data";

	return (
		<TouchableOpacity
			style={styles.listItemContainer}
			onPress={() => onPress(element.chemicalId)}
		>
			<View style={styles.listItemTextContent}>
				<Text style={styles.listItemName}>Nome: {element.name}</Text>
				<Text style={styles.listItemDetail}>
					Número CAS: {element.casNumber}
				</Text>
				<Text style={styles.listItemDetail}>
					Número EC: {element.ecNumber}
				</Text>
			</View>

			<View style={styles.listItemRightContent}>
				<Text style={styles.listItemQuantity}>{element.quantity}</Text>
				<Text style={styles.listItemValidity}>val. {formattedDate}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default function InventoryScreen() {
	const route = useRoute();
	const { labId, labName } = route.params || {};
	const navigation = useNavigation();
	console.log("InventoryScreen - labId:", labId, "labName:", labName);

	const [elements, setElements] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const data = await ListLabElements(labId);
			console.log(data);

			if (data.status) {
				setElements(data.elementsList);
			}
		}

		fetchData();
	}, []);

	const handleElementPress = (elementId) => {
		navigation.navigate("infoElementos", { elementId, labId, labName });
	};

	const handleAddElementPress = () => {
		navigation.navigate("addElement", { labId, labName });
	};

	// ✅ FUNÇÃO DE PESQUISA (ÚNICA COISA NOVA ADICIONADA)
	const filteredElements = elements.filter((element) => {
		const term = searchTerm.toLowerCase();
		return (
			element.name?.toLowerCase().includes(term) ||
			element.casNumber?.toLowerCase().includes(term) ||
			element.ecNumber?.toLowerCase().includes(term)
		);
	});

	if (isLoading && elements.length === 0) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.secundary_green} />
				<Text style={{ marginTop: 10, color: colors.primary_text_gray }}>
					Carregando Inventário...
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

			<View style={styles.searchRow}>
				<View style={styles.searchInputWrapper}>
					<MaterialIcons
						name="search"
						size={24}
						color={colors.primary_text_gray}
					/>

					<TextInput
						style={styles.searchInput}
						placeholder="Pesquisar um elemento"
						placeholderTextColor={colors.input_text_gray}
						value={searchTerm}
						onChangeText={setSearchTerm}
					/>
				</View>

				<TouchableOpacity
					onPress={handleAddElementPress}
					style={styles.addElementButton}
				>
					<AntDesign name="plus" size={14} color={colors.primary_text_gray} />
					<Text style={styles.addElementText}>Adicionar</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.listContainer}>
				{filteredElements.length > 0 ? (
					filteredElements.map((element) => (
						<ElementListItem
							key={element.chemicalId}
							element={element}
							onPress={handleElementPress}
						/>
					))
				) : (
					<Text style={styles.noElementsText}>
						Nenhum elemento encontrado.
					</Text>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
