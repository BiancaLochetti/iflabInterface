//Import nativo
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
	TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

//Import components
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";
import EmailModal from "../../components/modals/EmailModal";

//importe estilização
import styles from "./styles";
import colors from "../../colors";

// Import API
import {
	get_user_info,
	edit_user_email,
	edit_user_name,
	edit_user_password,
	edit_user_image,
	logout_user,
} from "../../api/userRequests";
import { storage_saver } from "../../api/utils";
import { useNavigation } from "@react-navigation/native";

//--------------------------------------------------------

// Validação de email institucional
function isValidIFSPEmail(email) {
	const regex = /^[a-zA-Z0-9._%+-]+@(ifsp\.edu\.br|aluno\.ifsp\.edu\.br)$/;
	return regex.test(email);
}

// Página Principal
export function User({ triggerRefresh }) {
	const [user, setUser] = useState(null);
	const navigation = useNavigation();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [change, setChange] = useState(false);

	const [modalActive, setModalActive] = useState(false);
	const [loading, setLoading] = useState(false);

	// Pega informações do usuário
	useEffect(() => {
		async function getUser() {
			const userData = await get_user_info();
			if (userData.status) {
				setUser(userData.data);
			}
		}
		getUser();
	}, []);

	// Edição:
	async function editUser() {
		if (!name || !email || !password) {
			Alert.alert("Preecha os campos antes de editar!");
			return;
		}

		try {
			const result = await edit_user_name(name);
			console.log("Nome: ", name);
			console.log("Retorno da API: ", result);

			if (result?.status) {
				Alert.alert("Usuário editado!");
				console.log("Usuario editado!: ", result);
			} else {
				Alert.alert("Erro: ", result?.msg);
				console.log("Erro: ", result);
			}
		} catch (err) {
			console.error("Erro: ", err);
		}
	}

	async function logout() {
		try {
			setLoading(true);
			const result = await logout_user();
			console.log("Resposta do servidor:", result);

			// Limpa credenciais salvas localmente para forçar tela de login
			try {
				await storage_saver("email", "");
				await storage_saver("password", "");
				await storage_saver("token", "");
			} catch (e) {
				console.warn("Erro ao limpar storage:", e);
			}

			// Dispara refresh global para que o componente Routes reavalie o usuário
			if (typeof triggerRefresh === "function") {
				triggerRefresh();
			} else {
				// fallback: tenta navegar pra tela de Login diretamente
				navigation.reset({ index: 0, routes: [{ name: "Login" }] });
			}
		} catch (error) {
			console.error("Erro no login:", error);
			Alert.alert("Erro", "Não foi possível conectar ao servidor.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* Modal do Verificar Email */}
			<EmailModal
				modalActive={modalActive}
				backPage={() => setModalActive(false)}
				notCode={() => alert("Código reenviado!")}
				emailVerify={() => alert("Email verificado!")}
			/>

			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}
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
				<Text style={{ textAlign: "center", fontSize: 16 }}>Editar Perfil</Text>
				<Button text="Logout" type="Red" onPress={logout} />
			</View>

			<View style={styles.user}>
				<TouchableOpacity style={{ gap: 10 }}>
					<Image
						source={
							// user.user_image
							//   ? user.user_image :
							require("../../assets/icons/UI/user.png")
						}
						style={styles.userPic}
					/>
					<Text style={{ color: colors.contrastant_gray, textAlign: "center" }}>
						Editar Foto de Perfil
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				<View style={styles.subContainer}>
					<Text style={styles.title}>Nome de usuário:</Text>
					<InputText
						placeHolder="Digite seu nome"
						type="text"
						border
						onChange={setName}
						defaultValue={user?.user_name ?? ""}
					/>
				</View>

				<View style={styles.subContainer}>
					<Text style={styles.title}>Email de usuário:</Text>
					<View style={styles.emailContainer}>
						<View style={{ width: "70%" }}>
							<InputText
								placeHolder="Digite seu email"
								type="email"
								border
								onChange={setEmail}
								defaultValue={user?.user_email ?? ""}
							/>
						</View>
						<Button
							text="Validar"
							type="Green"
							onPress={() => setModalActive(true)}
							disabled={!isValidIFSPEmail(email)}
						/>
					</View>
				</View>

				<View style={styles.subContainer}>
					<Text style={styles.title}>Alterar senha:</Text>
					<InputText
						placeHolder="Digite sua nova senha"
						type="password"
						border
						onChange={setPassword}
					/>
				</View>
			</View>

			<View style={styles.button}>
				<Button
					text="Cancelar"
					type="White"
					onPress={() => navigation.navigate("Home")}
				/>
				<Button
					text="Salvar Edições"
					type="Green"
					onPress={editUser}
					disabled={!(name && password && isValidIFSPEmail(email))}
				/>
			</View>
		</SafeAreaView>
	);
}
