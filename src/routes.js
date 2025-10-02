// Componentes nativos:
import { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Telas para usuário logado:
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { Calendar } from "./pages/Calendar";

// Telas para usuário deslogado:
import { Login } from "./pages/Login"
import { Register_user } from "./pages/Register_user"
import { Register_Campus } from "./pages/Register_Campus"

// Rotas da API:
import { get_user_info } from "./api/userRequests";

// Componente de navegação:
const Tab = createBottomTabNavigator();

// Estilização:
import colors from "./colors";

// Ícones:
import home_icon from "./assets/icons/UI/home.png";
import schedule_icon from "./assets/icons/UI/schedule.png"
import user_icon from "./assets/icons/UI/user.png"


export function Routes() {
  // Para testes, enquanto a tela de login ñ estiver pronta:
  localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3NTkzNjA3MzAsImV4cCI6MTc1OTQ0NzEzMH0.c0t0xmWmJ2Mt0Dab8mgEdWN0VTeRBO7W95eO9lRN9P4")
  // Escreva qualquer coisa nesse token aqui de cima pra fazer ele ficar inválido e o sistema te considerar como deslogado.

  // State que vai guardar os dados do usuário:
  const [user_info, setUserInfo] = useState(null);

  // State que define se está carregando informações da API ou não:
  const [loading, setLoading] = useState(true); // Enquanto true, mostra uma tela "carregando..."

  // Carregando dados do usuário (e verificando se ele existe / o token é válido):
  useEffect(() => {
    async function fetchData() {
      const data = await get_user_info();

      if (!data.status) {
        setUserInfo(null); // Token é inválido (velho), usuário n é mais considerado logado;
      } else {
        setUserInfo(data.data); // Informações do usuário foram carregadas;
      }

      setLoading(false); // Informações chegaram (existindo ou não), então define loading como false (não está mais carregando);
    }

    fetchData()
  }, []);

  return (
    loading ? (
      <>carregando</>
    ) : user_info ? (
      <Tab.Navigator screenOptions={screen_options_style}>
        <Tab.Screen name="Home" component={Home} options={home_options} />
        <Tab.Screen name="Schedule" component={Calendar} options={schedule_options} />
        <Tab.Screen name="User" component={User} options={user_options} />
      </Tab.Navigator>
    ) : ( // Temporário, só pra poder acessar. dps vcs fazem a lógica.
      <Tab.Navigator screenOptions={screen_options_style}>
        <Tab.Screen name="Login" component={Login} options={home_options} />
        <Tab.Screen name="Register_user" component={Register_user} options={schedule_options} />
        <Tab.Screen name="Register_Campus" component={Register_Campus} options={user_options} />
      </Tab.Navigator>
    )
  )
}

// Estilizações:
const screen_options_style = {
  tabBarStyle: {
    backgroundColor: colors.white_medium,
    paddingBottom: 20
  }
}

const home_options = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => {
    return <Image source={home_icon} style={focused ? styles.inFocus : styles.outFocus} />
  }
}

const schedule_options = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => {
    return <Image source={schedule_icon} style={focused ? styles.inFocus : styles.outFocus} />
  }
}

const user_options = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => {
    return <Image source={user_icon} style={focused ? styles.inFocus : styles.outFocus} />
  }
}

const styles = StyleSheet.create({
  inFocus: {
    tintColor: colors.primary_text_gray,
    width: 30,
    height: 30,
    marginTop: 20,
  },

  outFocus: {
    tintColor: colors.emphasis_gray,
    width: 30,
    height: 30,
    marginTop: 20,
  }
});