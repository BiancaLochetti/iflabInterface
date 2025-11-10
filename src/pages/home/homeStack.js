// HomeStack.js
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../home";
import { AcessLab } from "../acessLab";
import addElemento from "../elementos/addElemento";
import addEquipemento from "../equipamentos/addEquipemento";
import infoElementos from "../elementos/infoElementos";
import inventario from "../elementos/inventario";
import inventarioEquipamentos  from "../equipamentos/inventarioEquipamentos";


const Stack = createStackNavigator();

export function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomeMain" component={Home} />
			<Stack.Screen name="Elements" component={inventario} />
			<Stack.Screen name="Equipaments" component={inventarioEquipamentos} />
			<Stack.Screen name="AcessLab" component={AcessLab} />
			<Stack.Screen name="addElement" component={addElemento} />
			<Stack.Screen name="addEquipamento" component={addEquipemento} />
			<Stack.Screen name="infoElementos" component={infoElementos} />

		</Stack.Navigator>
	);
}
