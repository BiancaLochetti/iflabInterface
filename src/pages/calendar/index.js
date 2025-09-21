// Imports
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import colors from "../../colors";

import { DataSelection } from "../../components/cards/DataSelection";
import { Sections } from "../../components/cards/Sections";

//--------------------------------------------------------

// Página Principal
export function Calendar() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white_full }}>
      <View style={styles.header}>
        <TouchableOpacity style={{ position: "absolute", left: 20 }}>
          <Image
            source={require("../../assets/icons/UI/chevrom.png")}
            style={{
              tintColor: colors.contrastant_gray,
              width: 30,
              height: 30,
              transform: [{ rotate: '90deg' }]
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Calendário do laboratório{" "}
          <Text style={{ fontWeight: "bold" }}>A108</Text>
        </Text>
      </View>

      <View style={{ zIndex: 1 }}>
        <DataSelection />
      </View>

      {/* Mateusão, deixei comentário pq tava dando buxa kkkk so arruma isso ai pode tirar */}
      {/* <View>
        <View
          style={{
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
            flex: 1,
            zIndex: -1,
          }}
        >
          <Text style={[styles.textFont, { marginBottom: 10 }]}>
            Sessões em andamento:
          </Text>
          <Sections />
        </View>
      </View> */}

    </SafeAreaView>
  );
}
