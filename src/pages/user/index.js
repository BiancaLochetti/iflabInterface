//Import nativo
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

//Import components
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";
import EmailModal from "../../components/modals/EmailModal";

//importe estilização
import styles from "./styles";
import colors from "../../colors";

//--------------------------------------------------------

// Página Principal
export function User({ navigation }) {
  const [modalActive, setModalActive] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <EmailModal
        modalActive={modalActive}
        backPage={() => setModalActive(false)}
        notCode={() => alert('Código reenviado!')}
        emailVerify={() => alert('Email verificado!')}
      />

      <View style={{ alignContent: "flex-start", gap: 30 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: "absolute", left: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/icons/UI/chevrom.png")}
              style={{
                tintColor: colors.contrastant_gray,
                width: 30,
                height: 30,
                transform: [{ rotate: "90deg" }],
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Editar Perfil
          </Text>
        </View>

        <View style={styles.user}>
          <TouchableOpacity style={{ gap: 10 }}>
            <Image
              source={require("../../assets/images/marcio.png")}
              style={styles.userPic}
            />
            <Text
              style={{ color: colors.contrastant_gray, textAlign: "center" }}
            >
              Editar Foto de Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Nome de usuário:</Text>
          <InputText
            placeHolder="Digite seu novo nome"
            type="text"
            border={true}
          />
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.title}>Email de usuário:</Text>
          <View style={styles.emailContainer}>
            <View style={{ width: "70%" }}>
              <InputText
                placeHolder="Digite seu novo email"
                type="email"
                border={true}
              />
            </View>
            <Button text="Validar" type="Green" onPress={() => setModalActive(true)} />
          </View>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.title}>Alterar senha:</Text>
          <InputText
            placeHolder="Digite sua nova senha"
            type="password"
            border={true}
          />
        </View>
      </ScrollView>

      <View style={styles.button}>
        <Button
          text="Cancelar"
          type="White"
          onPress={() => navigation.goBack()}
        />

        <Button text="Salvar Edições" type="Green" />
      </View>
    </SafeAreaView>
  );
}
