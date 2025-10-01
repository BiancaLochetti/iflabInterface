//Import nativo
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

//Import components
import InputText from '../../components/inputs/InputText'
import Button from "../../components/buttons/Button";

//Import API
import { listCampus } from "../../api/campusRequests";

//importe estilização
import styles from "./styles";
import colors from "../../colors";

// importe de imagens:
import img from "../../assets/images/logo.png"

export function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <SafeAreaView style={{ backgroundColor: colors.white_full, height: "100%" }}>
            <View style={{ alignSelf: "center", marginBottom: 40, marginTop: 24, }}>
                <Image
                    source={img}
                    style={{
                        width: 160,
                        height: 160,
                    }}
                    resizeMode="contain"
                />
            </View>
            <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 16 }}>Digite suas informações</Text>
                <View style={{ marginTop: 14, gap: 50 }}>
                    <InputText
                        icon={require('../../assets/icons/UI/email.png')}
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
                {/* Lembrar senha aqui! */}
            </View>
            <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: "60%" }}>
                    <Button
                        type="Green"
                        text="Logar"
                    />
                    <Button
                        type="White"
                        text="Não possui login? Registre-se"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
