// Imports
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import colors from "../../colors";

import { DataSelection } from "../../components/cards/DataSelection";
import { Header } from "../../components/header/Header";
import { Sections } from "../../components/cards/Sections";

//--------------------------------------------------------

// Página Principal
export function Calendar() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white_full }}>
      <Header text="Ola Mundo" icon={require('../../assets/icons/UI/left.png')}/>

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
