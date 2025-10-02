//Import nativo
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Import estilização
import { styles } from "./styles";

//Import API
import { registerUser } from "../../api/userRequests";

//Import components
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";
import EmailModal from "../../components/modals/EmailModal";

// ================================================================

// Página Principal
export function Register_user() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [campusId, setCampusId] = useState("");

  function handleNextStep() {
    setStep((prev) => prev + 1);
  }

  function handleBackStep() {
    setStep((prev) => prev - 1);
  }

  async function handleRegister({ navigation }) {
    const result = await registerUser({
      user_name: name,
      user_email: email,
      user_password: password,
      user_creation_token: code,
      campus_id: campusId,
    });

    if (result?.status) {
      Alert.alert("Sucesso", result.msg || "Usuário registrado!");
      navigation.navigate("Home");
    } else {
      Alert.alert("Erro", result?.msg || "Não foi possível registrar.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {step === 1 && (
          <>
            <Text style={styles.title}>Insira seu email institucional</Text>
            {/* <View style={styles.inputGroup}>
              <Image source={require("../../assets/icons/UI/email.png")} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View> */}
            {/* ===================================================== */}
            <View style={styles.inputGroup}>
              <InputText
                placeHolder="Email"
                icon={require("../../assets/icons/UI/email.png")}
                value={email}
                onChange={setEmail}
                type="email"
                border
              />
            </View>
            {/* ===================================================== */}
            <Text style={styles.subtext}>
              A confirmação será enviada para esse email.
            </Text>
            {/* <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Receber código</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <View style={styles.button}>
              <Button
                text="Receber código"
                onPress={handleNextStep}
                type="Green"
              />
            </View>
            {/* ===================================================== */}
            <Text style={styles.terms}>
              Ao prosseguir, você confirma que leu e concorda com os termos de
              uso e política de privacidade.
            </Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Já tem uma conta? Logar</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <Button
              text="Já tem uma conta? Logar"
              onPress={() => navigation.navigate("Login")}
              type="White"
            />
            {/* ===================================================== */}
          </>
        )}

        {step === 2 && (
          <>
            <EmailModal
              modalActive={true}
              backPage={handleBackStep}
              emailVerify={handleNextStep}
              notCode={() => Alert.alert("Código reenviado")}
              withoutBg
            />

            {/* <Text style={styles.title}>Insira o código de verificação</Text>
            <View style={styles.codeContainer}>
              {[...Array(5)].map((_, i) => (
                <TextInput
                  key={i}
                  style={styles.codeInput}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(digit) => {
                    const newCode = code.split("");
                    newCode[i] = digit;
                    setCode(newCode.join(""));
                  }}
                />
              ))}
            </View> */}

            {/* <TouchableOpacity onPress={() => Alert.alert("Código reenviado")}>
              <Text style={styles.link}>Não recebeu o código? Reenviar</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Verificar email</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={handleBackStep}>
              <Text style={styles.link}>Voltar</Text>
            </TouchableOpacity> */}
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.title}>Insira suas informações</Text>
            {/* <View style={styles.inputGroup}>
              <Image source={require("../../assets/icons/UI/user.png")} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nome de usuário"
                value={name}
                onChangeText={setName}
              />
            </View> */}
            {/* ===================================================== */}
            <View style={styles.inputGroup}>
              <InputText
                placeHolder="Nome de usuário"
                value={name}
                onChange={setName}
                border
                type="name"
                icon={require("../../assets/icons/UI/user.png")}
              />
            </View>
            {/* ===================================================== */}
            {/* <View style={styles.inputGroup}>
              <Image source={require("../../assets/icons/UI/show.png")} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View> */}
            {/* ===================================================== */}
            <View style={styles.inputGroup}>
              <InputText
                placeHolder="Senha do usuário"
                value={password}
                onChange={setPassword}
                border
                type="password"
              />
            </View>
            {/* ===================================================== */}
            {/* <TouchableOpacity
              style={[styles.button, !(name && password) && styles.buttonDisabled]}
              onPress={handleNextStep}
              disabled={!(name && password)}
            >
              <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <View style={styles.button}>
              <Button
                text="Avançar"
                onPress={handleNextStep}
                type="Green"
                disabled={!(name && password)}
              />
            </View>
            {/* ===================================================== */}
            {/* <TouchableOpacity onPress={handleBackStep}>
              <Text style={styles.link}>Voltar</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <Button text="Voltar" onPress={handleBackStep} type="White" />
            {/* ===================================================== */}
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.title}>Insira o seu campus</Text>
            {/* <View style={styles.inputGroup}>
              <Image source={require("../../assets/icons/UI/chevrom.png")} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Campus"
                value={campusId}
                onChangeText={setCampusId}
              />
            </View> */}
            {/* ===================================================== */}
            <View style={styles.inputGroup}>
              <InputText
                placeHolder="Campus"
                value={campusId}
                onChange={setCampusId}
                icon={require("../../assets/icons/UI/chevrom.png")}
                border
              />
            </View>
            {/* ===================================================== */}
            {/* <TouchableOpacity
              style={[styles.button, !campusId && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={!campusId}
            >
              <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <View style={styles.button}>
              <Button
                text="Avançar"
                onPress={handleRegister}
                type="Green"
                disabled={!campusId}
              />
            </View>
            {/* ===================================================== */}
            {/* <TouchableOpacity onPress={handleBackStep}>
              <Text style={styles.link}>Voltar</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <Button text="Voltar" onPress={handleBackStep} type="White" />
            {/* ===================================================== */}
            {/* <TouchableOpacity onPress={() => navigation.navigate("RegisterCampus")}>
              <Text style={styles.link}>Não encontrou seu campus? Cadastre-o</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <Button
              text="Não encontrou seu campus? Cadastre-o"
              onPress={() => navigation.navigate("RegisterCampus")}
              type="White"
            />
            {/* ===================================================== */}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
