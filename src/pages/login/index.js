// Import nativo
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

// Import componentes
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";

// Import estilização
import { styles } from "./styles";

// Import imagem
import img from "../../assets/images/logo.png";

// Import API
import { login_user } from "../../api/userRequests";

function isValidIFSPEmail(email) {
const regex = /^[a-zA-Z0-9._%+-]+@(ifsp\.edu\.br|aluno\.ifsp\.edu\.br)$/;
return regex.test(email);
}

export function Login() {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	async function login() {
		const response = await login_user(email, senha);
		if (response.success) {
			navigation.navigate("Calendar");
		} else {
			// Mostrar mensagem de erro
			alert("Falha no login: " + response.message);
		}

	}

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.logoView}>
				<Image source={img} style={styles.logo} resizeMode="contain" />
			</View>

			{/* Formulário */}
			<View style={styles.formView}>
				<Text style={styles.label}>Digite suas informações</Text>
				<View style={styles.inputs}>
					<InputText
						icon={require("../../assets/icons/UI/email.png")}
						placeHolder="Email"
						type="email"
						onChange={setEmail}
					/>
					<InputText type="password" placeHolder="Senha" onChange={setSenha} />
				</View>
			</View>

			{/* Botões */}
			<View style={styles.buttonView}>
				<View style={styles.buttonContainer}>
					<Button
						type="Green"
						text="Logar"
						disabled={!isValidIFSPEmail(email) || !senha}
					/>
					<Button
						type="White"
						text="Não possui login? Registre-se"
						onPress={() => navigation.navigate("RegisterUser")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
