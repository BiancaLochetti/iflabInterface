// Importando componentes:
import { StyleSheet, Image } from "react-native";
import colors from './colors'

// Importando telas:
import { Home } from "./pages/home";
import { Calendar } from "./pages/calendar";
import { User } from "./pages/user";
import { RegisterCampus } from "./pages/registerCampus";

// Componentes de navegação:
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle:{
            backgroundColor: colors.iflab_white_dark
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={RegisterCampus} 
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require("./assets/icons/UI/home.png")}
                  style={styles.iconF}
                />
              );
            }
            return (
              <Image
                source={require("../src/assets/icons/UI/home.png")}
                style={styles.iconD}
              />
            );
          },
        }}
      />

      <Tab.Screen 
        name="Calendar" 
        component={Calendar} 
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require("./assets/icons/UI/schedule.png")}
                  style={styles.iconF}
                />
              );
            }
            return (
              <Image
                source={require("../src/assets/icons/UI/schedule.png")}
                style={styles.iconD}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="User" 
        component={User} 
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle:{ display: 'none' },
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  source={require("./assets/icons/UI/user.png")}
                  style={styles.iconF}
                />
              );
            }
            return (
              <Image
                source={require("../src/assets/icons/UI/user.png")}
                style={styles.iconD}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconF: {
    width: 30,
    height: 30,
    marginTop: 20,
    tintColor: colors.iflab_gray
  },

  iconD:{
    width: 30,
    height: 30,
    marginTop: 20,
    tintColor: colors.iflab_gray_medium
  },
});
