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
import { SafeAreaView } from "react-native-safe-area-context";

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
export function RegisterUser() {
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={step === 2 ? styles.logoViewStep2 : styles.logoView}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {step === 1 && (
          <>
            <View style={styles.formView}>
              <Text style={styles.title}>Insira seu email institucional</Text>
              <InputText
                placeHolder="Email"
                icon={require("../../assets/icons/UI/email.png")}
                value={email}
                onChange={setEmail}
                type="email"
                border
              />
              <Text style={styles.subtext}>
                A confirmação será enviada para esse email.
              </Text>
            </View>
            {/* ===================================================== */}
            {/* <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Receber código</Text>
            </TouchableOpacity> */}
            {/* ===================================================== */}
            <View style={styles.buttonView}>
              <View style={{ gap: '1rem' }}>
                <Button
                  text="Receber código"
                  onPress={handleNextStep}
                  type="Green"
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

        {step === 2 && (
          <>
            <EmailModal
              modalActive={true}
              backPage={handleBackStep}
              emailVerify={handleNextStep}
              notCode={() => Alert.alert("Código reenviado")}
              withoutBg
            />
          </>
        )}

        {step === 3 && (
          <>
            <View style={styles.formView}>
              <Text style={styles.title}>Insira suas informações</Text>
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

        {step === 4 && (
          <>
            <View style={styles.formView}>
              <Text style={styles.title}>Insira o seu campus</Text>
              <InputText
                placeHolder="Campus"
                value={campusId}
                onChange={setCampusId}
                icon={require("../../assets/icons/UI/chevrom.png")}
                border
              />
            </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}
