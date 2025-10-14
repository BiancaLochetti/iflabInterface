// Import nativo
import { Text, View, Image, ScrollView, Alert } from "react-native";
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
import { storage_saver } from "../../api/utils";

// Validação de email institucional IFSP
function isValidIFSPEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(ifsp\.edu\.br|aluno\.ifsp\.edu\.br)$/;
  return regex.test(email);
}

export function Login({ triggerRefresh }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    console.log("Tentando logar com:", { email, senha });

    // Verificações básicas
    if (!isValidIFSPEmail(email)) {
      Alert.alert("Erro", "Use um e-mail institucional do IFSP.");
      return;
    }

    if (!senha) {
      Alert.alert("Erro", "Por favor, insira sua senha.");
      return;
    }

    try {
      setLoading(true);
      const result = await login_user(email, senha);
      console.log("Resposta do servidor:", result);

      if (result && result.status) {
        storage_saver("email", email);
        storage_saver("password", senha);
        storage_saver("token", result.token || "");

        triggerRefresh();
      } else {
        Alert.alert("Falha no login", result?.msg || "E-mail ou senha incorretos.");
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
          <InputText
            type="password"
            placeHolder="Senha"
            onChange={setSenha}
          />
        </View>
      </View>

      {/* Botões */}
      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          <Button
            type="Green"
            text={loading ? "Entrando..." : "Logar"}
            disabled={!isValidIFSPEmail(email) || !senha || loading}
            onPress={handleLogin}
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
