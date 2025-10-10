//Import nativo
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

//Import estilização
import styles from "./styles";
import colors from "../../colors";

//Import components
import { DataSelection } from "../../components/cards/DataSelection";
import { Sections } from "../../components/cards/Sections";

//Import API
import { listSections } from "../../api/SectionsRequests";

//--------------------------------------------------------

// AsyncStorage (para pegar o token salvo no dispositivo):
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = await AsyncStorage.setItem(
	"token",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3NjAxMjMwMjQsImV4cCI6MTc2MDIwOTQyNH0.OwIRe353Ye2LYR-gItkaXKfu0RKvouZBrNYgiwxLrAg"
);

// Página Principal
export function Calendar() {
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchSessions() {
			setLoading(true);
			const result = await listSections();
			if (result && result.sessionsList) {
				setSessions(result.sessionsList);
			} else {
				setSessions([]);
			}
			setLoading(false);
		}
		fetchSessions();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.headerView}>
				<TouchableOpacity style={{ position: "absolute", left: "2rem" }}>
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

				<Text style={{ textAlign: "center", fontSize: 16 }}>
					Calendário do laboratório{" "}
					<Text style={{ fontWeight: "bold" }}>A108</Text>
				</Text>
			</View>

			{/* Data Selection */}
			<View style={styles.dataView}>
				<View style={{ flexDirection: "column" }}>
					<Text style={[styles.textFont, { marginBottom: 10 }]}>
						Selecione a Data:
					</Text>
				</View>
				<View style={{ width: "100%" }}>
					<DataSelection />
				</View>
			</View>

			{/* Sessões */}
			<View style={{ flex: 1, zIndex: -1 }}>
				<View style={{ marginBottom: 5, marginRight: 20, flex: 1 }}>
					<Text style={[styles.textFont, { marginBottom: 10 }]}>
						Sessões em andamento:
					</Text>
					{loading ? (
						<Text style={styles.loadingText}>Carregando...</Text>
					) : sessions.length === 0 ? (
						<View
							style={{
								justifyContent: "center",
								lignItems: "center",
								padding: 20,
							}}
						>
							<Text style={styles.loadingText}>Nenhuma sessão reservada</Text>
						</View>
					) : (
						sessions.map((session, idx) => (
							<Sections
								key={session.sessionId || idx}
								inicio={session.date}
								fim={session.date}
								materiaisReservados={session.equipmentsQtd}
								elementosReservados={session.elementsQtd}
								labName={session.labName}
								formDone={session.formDone}
							/>
						))
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}
