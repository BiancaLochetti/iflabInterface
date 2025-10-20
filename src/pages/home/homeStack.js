// HomeStack.js
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../home";
import ElementStack from "../elementos";
import EquipmentsStack from "../equipamentos";
import { AcessLab } from "../acessLab";

const Stack = createStackNavigator();

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={Home} />
			<Stack.Screen name="Elements" component={ElementStack} />
			<Stack.Screen name="Equipaments" component={EquipmentsStack} />
			<Stack.Screen name="AcessLab" component={AcessLab} />
		</Stack.Navigator>
	);
}
