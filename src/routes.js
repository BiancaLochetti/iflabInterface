// Importando componentes:
import { StyleSheet, Image, Text, View } from "react-native";

// Importando telas:
import { Home } from "./pages/home";
import { Calendar } from "./pages/calendar";
import { Login } from "./pages/login";
import { RegisterCampus } from "./pages/registerCampus";
import { RegisterUser } from "./pages/registerUser";

// Componentes de navegação:
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require("../src/assets/icons/UI/home.png")}
                  style={{ width: 30, height: 30, marginTop: 20 }}
                />
              );
            }
            return (
              <Image
                source={require("../src/assets/icons/UI/home.png")}
                style={{ width: 30, height: 30, marginTop: 20, opacity: 0.75 }}
              />
            );
          },
        }}
      />

      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="RegisterCampus" component={RegisterCampus} />
      <Tab.Screen name="RegisterUser" component={RegisterUser} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
