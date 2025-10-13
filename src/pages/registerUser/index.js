// Import nativo
import { useState, useEffect } from "react";
import { View, Text, Image, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

// Import estilização
import { styles } from "./styles";

// Import API
import {
  register_user,
  email_validation,
  email_code_validation,
} from "../../api/userRequests";
import { listCampus } from "../../api/campusRequests";

// Import componentes
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";
import EmailModal from "../../components/modals/EmailModal";

// Validação de email institucional
function isValidIFSPEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(ifsp\.edu\.br|aluno\.ifsp\.edu\.br)$/;
  return regex.test(email);
}

export function register_user_screen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [creationToken, setCreationToken] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [campusId, setCampusId] = useState(null);

  const [open, setOpen] = useState(false);
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCampus() {
      try {
        setLoading(true);
        const response = await listCampus();
        console.log("Resposta API Campus:", response);

        // Correção principal: a resposta é um array direto
        const lista = Array.isArray(response) ? response : [];

        if (lista.length > 0) {
          const formatted = lista.map((campus, index) => ({
            label: campus.nome || `Campus ${index + 1}`,
            value: campus.id ?? `campus-${index}`,
          }));
          setCampusList(formatted);
        } else {
          console.warn("Lista de campus vazia. Usando dados de teste.");
          setCampusList([
            { label: "Campus Campinas", value: "1" },
            { label: "Campus São Paulo", value: "2" },
          ]);
        }
      } catch (error) {
        console.error("Erro ao buscar campus:", error);
        Alert.alert("Erro", "Falha ao carregar lista de campus.");
      } finally {
        setLoading(false);
      }
    }

    fetchCampus();
  }, []);

  async function handleRegister() {
    console.log("Valores atuais:", {
      email,
      password,
      name,
      creationToken,
      campusId,
    });

    console.log("CampusId: ", campusId, typeof campusId);

    if (!email || !password || !name || !creationToken || !campusId) {
      Alert.alert("Erro", "Preencha todos os campos antes de continuar.");
      return;
    }

    try {
      const result = await register_user(
        email,
        password,
        name,
        creationToken,
        parseInt(campusId)
      );
      console.log("Retorno da API:", result);

      if (result?.status) {
        Alert.alert("Sucesso", result.msg || "Usuário registrado!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", result?.msg || "Não foi possível registrar.");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      Alert.alert("Erro", "Falha ao conectar-se à API.");
    }
  }

  function handleNextStep() {
    setStep((prev) => prev + 1);
  }

  function handleBackStep() {
    setStep((prev) => prev - 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Etapa 1 - Email */}
      {step === 1 && (
        <>
          <View style={styles.logoView}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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

          <View style={styles.buttonView}>
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

                try {
                  const result = await email_validation(email, 1);
                  console.log("Resultado email_validation:", result);

                  if (result?.status) {
                    Alert.alert("Sucesso", result.msg || "Código enviado!");

                    if (result?.token) {
                      setCreationToken(result.token);
                    }

                    handleNextStep();
                  } else {
                    Alert.alert(
                      "Erro",
                      result?.msg || "Não foi possível enviar o código."
                    );
                  }
                } catch (error) {
                  console.error("Erro ao validar email:", error);
                  Alert.alert("Erro", "Falha ao enviar código de validação.");
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
        </>
      )}

      {/* Etapa 2 - Código */}
      {step === 2 && (
        <EmailModal
          modalActive={true}
          backPage={handleBackStep}
          emailVerify={async (codeInput) => {
            try {
              const result = await email_code_validation(email, codeInput);
              console.log("Resultado code_validation:", result);

              if (result?.status) {
                Alert.alert("Sucesso", result.msg || "Código validado!");
                setCreationToken(result.authToken);
                handleNextStep();
              } else {
                Alert.alert("Erro", result?.msg || "Código inválido.");
              }
            } catch (error) {
              console.error("Erro ao validar código:", error);
              Alert.alert("Erro", "Falha ao validar código.");
            }
          }}
          notCode={async () => {
            try {
              const result = await email_validation(email, 1);
              if (result?.status) {
                Alert.alert("Sucesso", "Novo código reenviado!");
                if (result?.token) setCreationToken(result.authToken);
              } else {
                Alert.alert("Erro", result?.msg || "Não foi possível reenviar.");
              }
            } catch (error) {
              console.error("Erro ao reenviar código:", error);
              Alert.alert("Erro", "Falha ao reenviar código.");
            }
          }}
        />
      )}

      {/* Etapa 3 - Nome e Senha */}
      {step === 3 && (
        <>
          <View style={styles.logoView}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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

      {/* Etapa 4 - Campus */}
      {step === 4 && (
        <>
          <View style={styles.logoView}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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
                dropDownContainerStyle={[
                  styles.dropdownContainer,
                  { zIndex: 1000 },
                ]}
                placeholderStyle={styles.dropdownPlaceholder}
                labelStyle={styles.dropdownLabel}
                selectedItemLabelStyle={styles.dropdownSelected}
                listItemLabelStyle={styles.dropdownItem}
                arrowIconStyle={styles.dropdownArrow}
              />
            </View>
          </View>

          <View style={styles.buttonView}>
            <Button
              text="Concluir cadastro"
              onPress={handleRegister}
              type="Green"
              disabled={!campusId}
            />
            <Button text="Voltar" onPress={handleBackStep} type="White" />
            <Button
              text="Не encontrou seu campus? Cadastre-o"
              onPress={() => navigation.navigate("RegisterCampus")}
              type="White"
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
