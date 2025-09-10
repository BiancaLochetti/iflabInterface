import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";/* 
import { StyleSheet, Text, View } from "react-native"; */

export default function App() {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Routes />
    </NavigationContainer>
  );
}
