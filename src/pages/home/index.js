//Import nativos
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // ⬅ Importa o hook de navegação
import { useEffect, useState } from "react";

//Import estilização
import styles from "./styles";

//Import componentes:
import LabCard from "../../components/cards/LabCard";
import Button from "../../components/buttons/Button";

//Import API
import { get_user_info } from "../../api/userRequests";
import { get_laboratories } from "../../api/labRequests";

import Loading from "../routes/loading";

//--------------------------------------------------------

// Página Principal
export function Home() {
  const navigation = useNavigation(); // Inicializa o hook

  const [user, setUser] = useState(null);
  const [lab, setLab] = useState(null);

  useEffect(() => {
    // Carregando informações do usuário e lista de laboratórios:
    async function getUser() {
      const userData = await get_user_info();
      if (userData.status) {
        setUser(userData.data);
      }
    }
    getUser();

    async function getLab() {
      const labData = await get_laboratories();
      if (labData.status) {
        const sortedLabs = labData.labsList.sort(
          (a, b) => a.labName.localeCompare(b.labName) // ordena alfabeticamente
        );
        setLab({
          ...labData,
          labsList: sortedLabs,
        });
      }
    }
    getLab();
  }, []);

  // localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3NTk5NDc3MTcsImV4cCI6MTc2MDAzNDExN30.4AGqiB0HR2AveX_CcjGQa_yHx-itZLCHlxr9-c20TGQ")

  return !!user && !!lab ? (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com logo e botão de perfil */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate("RegisterCampus")}>
          <Image source={user.user_image} style={styles.profile} />
        </TouchableOpacity>
      </View>

      {/* Botão para adicionar laboratório */}
      <View style={styles.addLab}>
        <Button
          text=" + Adicionar Laboratório"
          onPress={() => alert("AddLab!")}
          disabled={false}
          type="White"
        />
      </View>

      {/* Lista de cards de laboratório */}
      <ScrollView contentContainerStyle={styles.content}>
        {lab.labsList.map((lab, idx) => (
          <LabCard
            key={idx}
            lab={lab.labName}
            status={lab.status}
            responsable={lab.userName}
            lastResp={lab.userName}
            hour={lab.startAt + " - " + lab.endsAt}
            lastHour={lab.startAt + " - " + lab.endsAt}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      {/* Carregando */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Text style={{ fontSize: 40, color: "green" }}>
          Carregando...
        </Text>
      </View>
    </SafeAreaView>
  );
}
