//Import nativos
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

import colors from "../../colors";

import AcessLabCard from "../../components/cards/AcessLabCard";

//--------------------------------------------------------

const camargo = "../../assets/images/camargo.png";
const mateus = "../../assets/images/mateus.jpeg";
const bia = "../../assets/images/bia.jpg";
const lucas = "../../assets/images/lucas.jpg";
const marcio = "../../assets/images/marcio.png";

// Página Principal
export function AcessLab() {
	const navigation = useNavigation();

	const route = useRoute();
	const { labName } = route.params;

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
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
						fontSize: 16,
						color: colors.primary_green_dark,
					}}
				>
					Acessos - {labName || "Laboratório"}
				</Text>
			</View>

			<ScrollView style={{ paddingVertical: 20, flexDirection: "column" }}>
				<AcessLabCard
					name="Bianca Lochetti"
					email="lochetti.bia@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(bia)}
				/>
				<AcessLabCard
					name="Lucas Leoni"
					email="lucas.haiter@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(lucas)}
				/>
				<AcessLabCard
					name="Mateus Rodrigues"
					email="rodrigues.mateus1@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(mateus)}
				/>
				<AcessLabCard
					name="Matheus Camargo"
					email="matheus.ginebro@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(camargo)}
				/>
				<AcessLabCard
					name="Márcio Andre"
					email="m_amiranda@ifsp.edu.br"
					acess="Funcionário"
					image={require(marcio)}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
