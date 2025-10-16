//Import nativos
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

import colors from "../../colors";

//--------------------------------------------------------

// Página Principal
export function AcessLab() {
  const navigation = useNavigation(); 

  const route = useRoute();
  const { labName } = route.params;

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
    </SafeAreaView>
  );
}
