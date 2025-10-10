//Import nativo
import { useState, useEffect } from "react";
import { View, Text, Image, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

// Import estilização
import { styles } from "./styles";

// Import API
import {
	registerUser,
	email_validation,
	email_code_validation,
} from "../../api/userRequests";
import { listCampus } from "../../api/campusRequests";

// Import componentes
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";
import EmailModal from "../../components/modals/EmailModal";

function isValidIFSPEmail(email) {
	const regex = /^[a-zA-Z0-9._%+-]+@(ifsp\.edu\.br|aluno\.ifsp\.edu\.br)$/;
	return regex.test(email);
}

export function RegisterUser() {
	const navigation = useNavigation();
	const [step, setStep] = useState(1);

	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [campusId, setCampusId] = useState(null);

	// Estados do DropDown
	const [open, setOpen] = useState(false);
	const [campusList, setCampusList] = useState([]);
	const [loading, setLoading] = useState(false);

useEffect(() => {
  async function fetchCampus() {
    setLoading(true);
    const response = await listCampus();

    if (response?.status && Array.isArray(response.campusList)) {
      const formatted = response.campusList.map((campus, index) => ({
        label: campus.nome || `Campus ${index + 1}`,
        value: campus.id ?? `campus-${index}`, // garante chave única
      }));

      setCampusList(formatted);
    } else {
      console.warn("Formato inesperado na resposta da API:", response);
    }

    setLoading(false);
  }

  fetchCampus();
}, []);

	function handleNextStep() {
		setStep((prev) => prev + 1);
	}

	function handleBackStep() {
		setStep((prev) => prev - 1);
	}

	async function handleRegister() {
		const result = await registerUser({
			user_name: name,
			user_email: email,
			user_password: password,
			user_creation_token: code,
			campus_id: campusId,
		});

		if (result?.status) {
			Alert.alert("Sucesso", result.msg || "Usuário registrado!");
			navigation.navigate("Home");x
		} else {
			Alert.alert("Erro", result?.msg || "Não foi possível registrar.");
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* 1 - Email */}
			{step === 1 && (
				<>
					{/* Header */}
					<View style={step === 2 ? styles.logoViewStep2 : styles.logoView}>
						<Image
							source={require("../../assets/images/logo.png")}
							style={styles.logo}
							resizeMode="contain"
						/>
					</View>

					{/* Formulário */}
					<View style={styles.formView}>
						<Text style={styles.title}>Insira seu email institucional</Text>
						<View style={{ width: "80%", alignSelf: "center" }}>
							<InputText
								placeHolder="Email"
								icon={require("../../assets/icons/UI/email.png")}
								value={email}
								onChange={setEmail}
								type="email"
								border
							/>
						</View>
						<Text style={styles.subtext}>
							A confirmação será enviada para esse email.
						</Text>
					</View>

					{/* Botões */}
					<View style={styles.buttonView}>
						<View style={{ gap: "1rem" }}>
							<Button
								text="Receber código"
								onPress={async () => {
									if (!isValidIFSPEmail(email)) {
										Alert.alert(
											"Email inválido",
											"Use apenas emails institucionais do IFSP (@ifsp.edu.br ou @aluno.ifsp.edu.br)."
										);
										return;
									}

									const result = await email_validation(email, 1);
									if (result?.status) {
										Alert.alert("Sucesso", result.msg || "Código enviado!");
										handleNextStep();
									} else {
										Alert.alert(
											"Erro",
											result?.msg || "Não foi possível enviar o código."
										);
									}
								}}
								type="Green"
								disabled={!isValidIFSPEmail(email)}
							/>

							<Text style={styles.terms}>
								Ao prosseguir, você confirma que leu e concorda com os termos de
								uso e política de privacidade.
							</Text>

							<Button
								text="Já tem uma conta? Logar"
								onPress={() => navigation.navigate("Login")}
								type="White"
							/>
						</View>
					</View>
				</>
			)}

			{/* 2 - Código */}
			{step === 2 && (
				<>
					{/* Modal de verificação */}
					<EmailModal
						modalActive={true}
						backPage={handleBackStep}
						emailVerify={async (code) => {
							const result = await email_code_validation(email, code);

							if (result?.status) {
								Alert.alert(
									"Sucesso",
									result.msg || "Código validado com sucesso!"
								);
								setCode(code);
								handleNextStep();
							} else {
								Alert.alert(
									"Erro",
									result?.msg || "Código inválido ou expirado."
								);
							}
						}}
						notCode={async () => {
							const result = await email_validation(email, 1);
							if (result?.status) {
								Alert.alert("Sucesso", "Novo código reenviado!");
							} else {
								Alert.alert(
									"Erro",
									result?.msg || "Não foi possível reenviar."
								);
							}
						}}
					/>
				</>
			)}

			{/* 3 - Formulário (Nome e Senha) */}
			{step === 3 && (
				<>
					{/* Header */}
					<View style={step === 2 ? styles.logoViewStep2 : styles.logoView}>
						<Image
							source={require("../../assets/images/logo.png")}
							style={styles.logo}
							resizeMode="contain"
						/>
					</View>

					{/* Formulário */}
					<View style={styles.formView}>
						<Text style={styles.title}>Insira suas informações</Text>
						<View style={{ width: "80%", alignSelf: "center", gap: "1rem" }}>
							<InputText
								placeHolder="Nome de usuário"
								value={name}
								onChange={setName}
								border
								type="name"
								icon={require("../../assets/icons/UI/user.png")}
							/>

							<InputText
								placeHolder="Senha do usuário"
								value={password}
								onChange={setPassword}
								border
								type="password"
							/>
						</View>
					</View>

					{/* Botões */}
					<View style={styles.buttonView}>
						<Button
							text="Avançar"
							onPress={handleNextStep}
							type="Green"
							disabled={!(name && password)}
						/>
						<Button text="Voltar" onPress={handleBackStep} type="White" />
					</View>
				</>
			)}

			{/* 4 - Campus */}
			{step === 4 && (
			<>
				{/* Header */}
				<View style={styles.logoView}>
				<Image
					source={require("../../assets/images/logo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
				</View>

				{/* Formulário */}
				<View style={{ zIndex: 1001 }}>
				<View style={styles.formView}>
					<Text style={styles.title}>Insira o seu campus</Text>

					<DropDownPicker
					open={open}
					value={campusId}
					items={campusList}
					setOpen={setOpen}
					setValue={setCampusId}
					setItems={setCampusList}
					placeholder="Campus"
					loading={loading}
					mode="BADGE"
					style={[styles.dropdown, { zIndex: 1001 }]}
					dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
					placeholderStyle={styles.dropdownPlaceholder}
					labelStyle={styles.dropdownLabel}
					selectedItemLabelStyle={styles.dropdownSelected}
					listItemLabelStyle={styles.dropdownItem}
					arrowIconStyle={styles.dropdownArrow}
					/>
				</View>
				</View>

				{/* Botões */}
				<View style={styles.buttonView}>
				<Button
					text="Avançar"
					onPress={handleRegister}
					type="Green"
					disabled={!campusId}
				/>
				<Button text="Voltar" onPress={handleBackStep} type="White" />
				<Button
					text="Não encontrou seu campus? Cadastre-o"
					onPress={() => navigation.navigate("RegisterCampus")}
					type="White"
				/>
				</View>
			</>
			)}



		</SafeAreaView>
	);
}
