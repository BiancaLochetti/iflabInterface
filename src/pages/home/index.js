import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // ⬅ Importa o hook de navegação

import styles from "./styles";

import LabCard from "../../components/cards/LabCard";
import WhiteButton from "../../components/buttons/WhiteButton";

//--------------------------------------------------------

export function Home() {
  const navigation = useNavigation(); // ⬅ Inicializa o hook

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com logo e botão de perfil */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate("RegisterCampus")}>
          <Image
            source={require("../../assets/icons/UI/user.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* Botão para adicionar laboratório */}
      <View style={styles.addLab}>
        <WhiteButton
          text="Adicionar Laboratório"
          icon={require("../../assets/icons/UI/more.png")}
          onPress={() => alert("AddLab!")}
          disabled={false}
        />
      </View>

      {/* Lista de cards de laboratório */}
      <ScrollView contentContainerStyle={styles.content}>
        <LabCard status={false} />
        <LabCard status={true} />
        <LabCard status={true} />
        <LabCard status={false} />
        <LabCard status={true} />
        <LabCard status={false} />
      </ScrollView>
    </SafeAreaView>
  );
}