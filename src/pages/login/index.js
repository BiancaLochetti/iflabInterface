import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";

import { loginStyles } from "./styles"; // import dos styles

import img from "../../assets/images/logo.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.logoView}>
        <Image source={img} style={loginStyles.logo} resizeMode="contain" />
      </View>

      <View style={loginStyles.formView}>
        <Text style={loginStyles.label}>Digite suas informações</Text>
        <View style={loginStyles.inputs}>
          <InputText
            icon={require("../../assets/icons/UI/email.png")}
            placeHolder="Email"
            type="email"
            onChange={setEmail}
          />
          <InputText type="password" placeHolder="Senha" onChange={setSenha} />
        </View>
      </View>

      <View style={loginStyles.buttonView}>
        <View style={loginStyles.buttonContainer}>
          <Button
            type="Green"
            text="Logar"
          />
          <Button type="White" text="Não possui login? Registre-se" />
        </View>
      </View>
    </SafeAreaView>
  );
}
