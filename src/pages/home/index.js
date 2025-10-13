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
import colors from "../../colors";

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

  // localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3NjAzNzg1NzMsImV4cCI6MTc2MDQ2NDk3M30.oQAo6YrhF4nagVnrxEassjslJx2HWEOECPH4ypz-6Jw")
  // console.log('token:', localStorage.getItem('token'))

  return !!user ? (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com logo e botão de perfil */}
      <View style={styles.headerView}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Image source={
            user.user_image
            ? user.user_image
            : require('../../assets/icons/UI/user.png')
          } style={styles.profile} />
        </TouchableOpacity>


      </View>

      {/* Botão para adicionar laboratório */}
      <View style={styles.addLabView}>
        <Button
          text=" + Adicionar Laboratório"
          onPress={() => alert("AddLab!")}
          disabled={false}
          type="White"
        />
      </View>

      {/* Lista de cards de laboratório */}
      {!!lab ? (
        <>
          <ScrollView contentContainerStyle={styles.contentView}>
          {lab.labsList.map((lab, idx) => (
            <LabCard
              key={idx}
              lab={lab.labName}
              status={lab.status}
              responsable={lab.userName}
              lastResp={lab.userName}
              // hour={lab.hourStart + " - " + lab.endsAt}
              // lastHour={lab.hourStart + " - " + lab.hourStart}
            />
          ))}
        </ScrollView>
      </>
      ) : (
      <>
        <View style={{ margin: 'auto', padding: "2rem", backgroundColor: colors.primary_green_dark, borderRadius: "1rem" }}>
          <Text style={{ color: colors.white_full, fontSize: 30 }}>Nenhum laboratório no momento!</Text>
        </View>
      </>
      )}
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      {/* Carregando */
      /*<View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Text style={{ fontSize: 40, color: "green" }}>
          Carregando...
        </Text>
      </View> */}
    </SafeAreaView>
  );
}
