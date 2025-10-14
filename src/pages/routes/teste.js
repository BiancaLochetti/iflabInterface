//Import nativos
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native"; // ⬅ Importa o hook de navegação
import colors from "../../colors";
import { Modalize } from "react-native-modalize";

//Import estilização

//Import componentes:
import LabCard from "../../components/cards/LabCard";
import Button from "../../components/buttons/Button";

//--------------------------------------------------------

// Página Principal
export function Teste() {
  const navigation = useNavigation();

  const modalizeRef = useRef(null);

  function onOpen() {
    modalizeRef.current?.open();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com logo e botão de perfil */}
      <View style={styles.headerView}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <Image
            source={require("../../assets/icons/UI/user.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* Botão para adicionar laboratório */}
      <View style={styles.addLabView}>
        <Button
          text=" + Adicionar Laboratório"
          onPress={onOpen}
          disabled={false}
          type="White"
        />
      </View>

      <Modalize
        ref={modalizeRef}
        snapPoint={430}
        modalHeight={450}
        withHandle={false}
        HeaderComponent={
          <View style={{ alignItems: "center", paddingBottom: 20 }}>
            <Image
              source={require("../../assets/icons/UI/drag-horizontal.png")}
              style={{ tintColor: colors.primary_green_dark }}
              resizeMode="contain"
            />
          </View>
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            backgroundColor: colors.white_full,
            paddingHorizontal: 20,
            gap: 10,
          }}
        >
          <Button
            text="Sessões no laboratório"
            type="White"
            icon={require("../../assets/icons/UI/schedule.png")}
          />
          <Button
            text="Elementos do laboratório"
            type="White"
            icon={require("../../assets/icons/UI/potion.png")}
            onPress={navigation.navigate("Inventory")}
          />
          <Button
            text="Equipamentos do laboratório"
            type="White"
            icon={require("../../assets/icons/UI/equipment.png")}
            onPress={navigation.navigate("EquipmentInventory")}
          />
          <Button
            text="Gerenciar acessos do laboratório"
            type="White"
            icon={require("../../assets/icons/UI/access-management.png")}
          />
          <Button
            text="Gerar relatório do laboratório"
            type="White"
            icon={require("../../assets/icons/UI/access-relatory.png")}
          />
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "2rem",
    flex: 1,
    backgroundColor: colors.white_full,
  },

  // -------------------------------------------------------

  headerView: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: "6rem",
    height: "6rem",
  },

  profile: {
    height: "3.125rem",
    width: "3.125rem",
    borderRadius: "3.125rem",
    filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25))",
  },

  // -------------------------------------------------------

  addLabView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "1.25rem",
    zIndex: -10,
  },

  // -------------------------------------------------------

  contentView: {
    marginTop: "1.25rem",
    alignItems: "center",
    gap: "0.9375rem",
    paddingVertical: "1rem",
  },
});

export default styles;
