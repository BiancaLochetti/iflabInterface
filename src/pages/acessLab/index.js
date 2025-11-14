//Import nativos
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

import colors from "../../colors";

import AcessLabCard from "../../components/cards/AcessLabCard";
import { get_laboratory_users } from "../../api/labRequests";

//--------------------------------------------------------

const camargo = "../../assets/images/camargo.png";
const mateus = "../../assets/images/mateus.jpeg";
const bia = "../../assets/images/bia.jpg";
const lucas = "../../assets/images/lucas.jpg";
const marcio = "../../assets/images/marcio.png";

// Página Principal
export function AcessLab() {
  const navigation = useNavigation();

  const route = useRoute();
  const { labName, labId } = route.params || {};

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      if (!labId) {
        console.warn("labId não fornecido");
        return;
      }
      setLoadingUsers(true);
      try {
        const res = await get_laboratory_users(labId);
        console.log("get_laboratory_users result:", res);
        console.log("res type:", typeof res);
        console.log("res keys:", Object.keys(res || {}));
        
        let usersArray = [];
        if (res && res.status && Array.isArray(res.usersList)) {
          console.log("Matched: res.status && Array.isArray(res.usersList)");
          usersArray = res.usersList;
        } else if (res && res.status && Array.isArray(res.data)) {
          console.log("Matched: res.status && Array.isArray(res.data)");
          usersArray = res.data;
        } else if (res && res.status && Array.isArray(res.users)) {
          console.log("Matched: res.status && Array.isArray(res.users)");
          usersArray = res.users;
        } else if (res && Array.isArray(res)) {
          console.log("Matched: Array.isArray(res)");
          usersArray = res;
        } else if (res && res.status && res.data?.users) {
          console.log("Matched: res.status && res.data?.users");
          usersArray = res.data.users;
        } else if (res && res.data) {
          console.log("Trying res.data directly");
          usersArray = res.data;
        } else {
          console.warn("get_laboratory_users: resposta inesperada", res);
          usersArray = [];
        }
        
        console.log("Final usersArray:", usersArray);
        console.log("usersArray length:", usersArray ? usersArray.length : 0);
        setUsers(usersArray);
      } catch (err) {
        console.error("Erro ao buscar usuários do laboratório:", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchUsers();
  }, [labId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: colors.primary_green_dark,
          }}
        >
          Acessos - {labName || "Laboratório"}
        </Text>
      </View>

      <ScrollView style={{ paddingVertical: 20, flexDirection: "column" }}>
        {loadingUsers ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Carregando usuários...
          </Text>
        ) : users && users.length > 0 ? (
          users.map((u, idx) => (
            <AcessLabCard
              key={u.user_id ?? idx}
              name={u.userName || u.nome || "Usuário"}
              email={u.userEmail || u.email || ""}
              acess={u.userType || u.admin_level || u.role || "Aluno"}
              image={
                u.user_image
                  ? { uri: u.user_image }
                  : require("../../assets/icons/UI/user.png")
              }
            />
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum usuário no laboratório.
          </Text>
        )}
      </ScrollView>

      {/* <ScrollView style={{ paddingVertical: 20, flexDirection: "column" }}>
				<AcessLabCard
					name="Bianca Lochetti"
					email="lochetti.bia@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(bia)}
				/>
				<AcessLabCard
					name="Lucas Leoni"
					email="lucas.haiter@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(lucas)}
				/>
				<AcessLabCard
					name="Mateus Rodrigues"
					email="rodrigues.mateus1@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(mateus)}
				/>
				<AcessLabCard
					name="Matheus Camargo"
					email="matheus.ginebro@aluno.ifsp.edu.br"
					acess="Aluno"
					image={require(camargo)}
				/>
				<AcessLabCard
					name="Márcio Andre"
					email="m_amiranda@ifsp.edu.br"
					acess="Funcionário"
					image={require(marcio)}
				/>
			</ScrollView> */}
    </SafeAreaView>
  );
}
