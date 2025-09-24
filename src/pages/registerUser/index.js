import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { sendEmailValidation } from "../../api/userRequests";

export function RegisterUser() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
   return /^[^\s@]+@(aluno\.ifsp\.edu\.br|ifsp\.edu\.br)$/.test(email);
  }

  async function handleReceiveCode() {
    if (!isValidEmail(email)) return;

    setLoading(true);
    const result = await sendEmailValidation(email, 1);
    setLoading(false);

    if (result?.status) {
      Alert.alert("Sucesso", "Código de verificação enviado para " + email);
     
    } else {
      Alert.alert("Erro", "Não foi possível enviar o código.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Insira seu email institucional</Text>

        <View style={styles.inputGroup}>
          <Image
            source={require("../../assets/icons/UI/email.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.subtext}>
          Um código de verificação será enviado para esse email.
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            !isValidEmail(email) && styles.buttonDisabled,
          ]}
          onPress={handleReceiveCode}
          disabled={!isValidEmail(email) || loading}
        >
          <Text style={styles.buttonText}>Receber código</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao prosseguir, você confirma que leu e concorda com os termos de uso
          e política de privacidade.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Já tem uma conta? Logar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}