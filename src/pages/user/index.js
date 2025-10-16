//Import nativo
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

//Import components
import InputText from "../../components/inputs/InputText";
import Button from "../../components/buttons/Button";
import EmailModal from "../../components/modals/EmailModal";

//importe estilização
import styles from "./styles";
import colors from "../../colors";

// Import API
import {
  get_user_info,
  edit_user_email,
  edit_user_name,
  edit_user_password,
  edit_user_image,
} from "../../api/userRequests";

//--------------------------------------------------------

// Validação de email institucional
function isValidIFSPEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(ifsp\.edu\.br|aluno\.ifsp\.edu\.br)$/;
  return regex.test(email);
}

// Página Principal
export function User({ navigation }) {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(false);

  const [modalActive, setModalActive] = useState(false);

  // Pega informações do usuário
  useEffect(() => {
    async function getUser() {
      const userData = await get_user_info();
      if (userData.status) {
        setUser(userData.data);
      }
    }
    getUser();
  }, []);

  // Edição:
  async function editUser() {
    if (!name || !email || !password) {
      Alert.alert("Preecha os campos antes de editar!");
      return;
    }

    try {
      const result = await edit_user_name(name);
      console.log("Nome: ", name);
      console.log("Retorno da API: ", result);

      if (result?.status) {
        Alert.alert("Usuário editado!");
        console.log("Usuario editado!: ", result);
      } else {
        Alert.alert("Erro: ", result?.msg);
        console.log("Erro: ", result);
      }
    } catch (err) {
      console.error("Erro: ", err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal do Verificar Email */}
      <EmailModal
        modalActive={modalActive}
        backPage={() => setModalActive(false)}
        notCode={() => alert("Código reenviado!")}
        emailVerify={() => alert("Email verificado!")}
      />


      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0 }}
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
        <Text style={{ textAlign: "center", fontSize: 16 }}>Editar Perfil</Text>
      </View>

      <View style={styles.user}>
        <TouchableOpacity style={{ gap: 10 }}>
          <Image
            source={
              // user.user_image
              //   ? user.user_image :
                 require("../../assets/icons/UI/user.png")
            }
            style={styles.userPic}
          />
          <Text style={{ color: colors.contrastant_gray, textAlign: "center" }}>
            Editar Foto de Perfil
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Nome de usuário:</Text>
          <InputText
            placeHolder="Digite seu nome"
            type="text"
            border
            onChange={setName}
            defaultValue={user?.user_name ?? ""}
          />
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.title}>Email de usuário:</Text>
          <View style={styles.emailContainer}>
            <View style={{ width: "70%" }}>
              <InputText
                placeHolder="Digite seu email"
                type="email"
                border
                onChange={setEmail}
                defaultValue={user?.user_email ?? ""}
              />
            </View>
            <Button
            text="Validar"
            type="Green"
            onPress={() => setModalActive(true)}
            disabled={!isValidIFSPEmail(email)}
            />
          </View>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.title}>Alterar senha:</Text>
          <InputText
            placeHolder="Digite sua nova senha"
            type="password"
            border
            onChange={setPassword}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Button
          text="Cancelar"
          type="White"
          onPress={() => navigation.goBack()}
        />
        <Button
          text="Salvar Edições"
          type="Green"
          onPress={editUser}
          disabled={!(name && password && isValidIFSPEmail(email))}
        />
      </View>
    </SafeAreaView>
  );
}
