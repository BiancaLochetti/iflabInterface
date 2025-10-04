//Imports
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from '../../colors'
//--------------------------------------------------------

// Página Principal
export function Loading() {
  return (
    <SafeAreaView  style={{ height: "100vh", backgroundColor: colors.white_full }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            <Text style={{ fontSize: 40, color: colors.primary_green_light }}>Carregando...</Text>
        </View>
    </SafeAreaView>
  );
}