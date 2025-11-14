// O=========================================================================================================O //

/* 
	O=================O
	|    Compontes    |
	O=================O
*/

// Componentes nativos:
import { useEffect, useState } from "react";
import { StyleSheet, Image, Text, SafeAreaViewBase, view } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Componente de navegação:
const Tab = createBottomTabNavigator();

// O=========================================================================================================O //

/* 
	O=============O
	|    Telas    |
	O=============O
*/

// Tela para loading:
import { Loading } from "../routes/loading";
import { Teste } from "../routes/teste";

// Telas para usuário logado:
import { Home } from "../home";
import { HomeStack } from "../home/homeStack";
import { User } from "../user";
import { Calendar } from "../calendar/CalendarPage";
import ElementStack from "../elementos";
import EquipmentsStack from "../equipamentos";
import { AcessLab } from "../acessLab";

// Telas para usuário deslogado:
import { Login } from "../login";
import { register_user_screen } from "../registerUser";
import { RegisterCampus } from "../registerCampus";

// O=========================================================================================================O //

/* 
	O===============O
	|    APIFLab    |
	O===============O
*/

import { get_user_info, login_user, logout_user } from "../../api/userRequests";
import { findAPI, storage_getter } from "../../api/utils";

// O=========================================================================================================O //

/* 
	O==============O
	|	Estilos    |
	O==============O
*/

// Estilização:
import colors from "../../colors";

// O=========================================================================================================O //

/* 
	O==============O
	|    Ícones    |
	O==============O
*/

// Ícones:
import home_icon from "../../assets/icons/UI/home.png";
import schedule_icon from "../../assets/icons/UI/schedule.png";
import user_icon from "../../assets/icons/UI/user.png";

// O=========================================================================================================O //

export function Routes({ triggerRefresh }) {
	// State que vai guardar os dados do usuário:
	const [user_info, setUserInfo] = useState(null);

	// State que define se está carregando informações da API ou não:
	const [loading, setLoading] = useState(true); // Enquanto true, mostra uma tela "carregando..."

	// State que define se a API foi encontrada:
	const [apiFound, setApiFound] = useState(false);

	const Tab = createBottomTabNavigator();

	// Carregando dados do usuário (e verificando se ele existe / o token é válido):
	useEffect(() => {
		async function getAPI() {
			/* const API_IP = await findAPI();

			if (!API_IP) {
				setApiFound(false);
				return;
			}

			setApiFound(true); */
			setApiFound(true);

			fetchUserData();
		}

		async function fetchUserData() {
			const result = await get_user_info();

			if (result.status) {
				setLoading(false);
				setUserInfo(result.data);

				return;
			}

			const email = await storage_getter("email");
			const password = await storage_getter("password");

			if (!email || !password) {
				// Vai pra tela de login

				setLoading(false);
				return;
			}

			const login = await login_user(email, password);
			const logout = await logout_user();

			if (!login.status) {
				// Vai pra tela de login
				setLoading(false);
				return;
			} else if (logout.status) {
				setLoading(false);
				return;
			}
			await fetchUserData();
		}

		getAPI();
	}, []);

	// return(
	// 	<Teste/>
	// )

	return !apiFound || loading ? (
		<Loading status_msg={!apiFound ? "Procurando servidor" : "Fazendo login"} />
	) : user_info ? (
		<Tab.Navigator screenOptions={logged_screeen_options}>
			<Tab.Screen name="Home" component={HomeStack} options={home_options} />
			<Tab.Screen
				name="Calendar"
				component={Calendar}
				options={calendar_options}
			/>
			<Tab.Screen name="User" options={user_options}>
				{() => <User triggerRefresh={triggerRefresh} />}
			</Tab.Screen>
		</Tab.Navigator>
	) : (
		<Tab.Navigator screenOptions={un_logged_screeen_options}>
			<Tab.Screen name="Login">
				{() => <Login triggerRefresh={triggerRefresh} />}
			</Tab.Screen>
			<Tab.Screen name="RegisterUser" component={register_user_screen} />
			<Tab.Screen name="RegisterCampus" component={RegisterCampus} />
		</Tab.Navigator>
	);

	/* return (
		<Tab.Navigator screenOptions={logged_screeen_options}>
			<Tab.Screen
				name="Calendar"
				component={Calendar}
				options={calendar_options}
			/>
		</Tab.Navigator>
	); */
}

// O=========================================================================================================O //

/* 
	O==================O
	|	Estilizações   |
	O==================O
*/

// Estilizações:
const logged_screeen_options = {
	tabBarStyle: {
		backgroundColor: colors.white_medium,
		paddingBottom: "4rem",
		paddingTop: "2rem",
	},
};

const un_logged_screeen_options = {
	headerShown: false,
	tabBarStyle: {
		display: "none",
	},
};

const home_options = {
	headerShown: false,
	tabBarShowLabel: false,
	tabBarIcon: ({ focused }) => {
		return (
			<Image
				source={home_icon}
				style={focused ? styles.inFocus : styles.outFocus}
			/>
		);
	},
};

const calendar_options = {
	headerShown: false,
	tabBarShowLabel: false,
	tabBarIcon: ({ focused }) => {
		return (
			<Image
				source={schedule_icon}
				style={focused ? styles.inFocus : styles.outFocus}
			/>
		);
	},
};

const user_options = {
	headerShown: false,
	tabBarShowLabel: false,
	tabBarStyle: {
		display: "none",
	},
	tabBarIcon: ({ focused }) => {
		return (
			<Image
				source={user_icon}
				style={focused ? styles.inFocus : styles.outFocus}
			/>
		);
	},
};

const element_options = {
	headerShown: false,
	tabBarShowLabel: false,
	tabBarIcon: () => null,
	tabBarStyle: {
		display: "none",
		width: 0,
		m: 0,
		p: 0,
	},
};

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
	},
});

// O=========================================================================================================O //
