// Import nativo
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

// Import componentes
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";

// Import estilização
import { styles } from "./styles";

// Import imagem
import img from "../../assets/images/logo.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.logoView}>
        <Image source={img} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Formulário */}
        <ScrollView contentContainerStyle={styles.formView}>
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
        </ScrollView>

      {/* Botões */}
      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          <Button type="Green" text="Logar" />
          <Button type="White" text="Não possui login? Registre-se" />
        </View>
      </View>
    </SafeAreaView>
  );
}
