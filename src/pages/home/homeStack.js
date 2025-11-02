// HomeStack.js
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../home";
import ElementStack from "../elementos";
import EquipmentsStack from "../equipamentos";
import { AcessLab } from "../acessLab";
import addElemento from "../elementos/addElemento";
import infoElementos from "../elementos/infoElementos";
import inventario from "../elementos/inventario";

const Stack = createStackNavigator();

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={Home} />
			<Stack.Screen name="Elements" component={inventario} />
			<Stack.Screen name="Equipaments" component={EquipmentsStack} />
			<Stack.Screen name="AcessLab" component={AcessLab} />
			<Stack.Screen name="addElement" component={addElemento} />
			<Stack.Screen name="infoElementos" component={infoElementos} />

		</Stack.Navigator>
	);
}
