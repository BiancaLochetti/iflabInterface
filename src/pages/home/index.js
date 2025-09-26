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
import { get_user_info } from '../../api/userRequests'
import { get_laboratories } from '../../api/labRequests'

//--------------------------------------------------------

// Página Principal
export function Home() {
  const navigation = useNavigation(); // Inicializa o hook

  const [user, setUser] = useState(null)
  const [lab, setLab] = useState(null)

  useEffect(() => {
    // Carregando informações do usuário e lista de laboratórios:
    async function getUser() {
      const userData = await get_user_info();

      if (userData.status) {
        setUser(userData.data)
      }
    }

    getUser();

    async function getLab() {
      const labData = await get_laboratories();

      if (labData.status) {
        setLab(labData)
      }
    }

    getLab();
  }, []);


  console.log(user)
  /*   localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3NTg5MDU4OTQsImV4cCI6MTc1ODk5MjI5NH0.zolMmLC5HeqVM335tEvomMp9LoUmj7fR2WUE9yMutmQ")
    const teste = localStorage.getItem("token") */


  return (
    !!user && !!lab
      ? (

        <SafeAreaView style={styles.container}>
          <Text>{user.user_name}</Text>
          <Text>{lab.labsList[0].lab_name}</Text>

          
          {/* Cabeçalho com logo e botão de perfil */}
          {/*       <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate('RegisterCampus')}>
          <Image
            source={require("../../assets/icons/UI/user.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View> */}

          {/* Botão para adicionar laboratório */}
          {/*       <View style={styles.addLab}>
        <Button
          text=" + Adicionar Laboratório"
          onPress={() => alert("AddLab!")}
          disabled={false}
          type="White"
        />
      </View> */}

          {/* Lista de cards de laboratório */}
          {/*       <ScrollView contentContainerStyle={styles.content}>
        <LabCard status={false} />
        <LabCard status={true} />
        <LabCard status={true} />
        <LabCard status={false} />
        <LabCard status={true} />
        <LabCard status={false} />
      </ScrollView> */}


        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>carregando</SafeAreaView>)
  );
}