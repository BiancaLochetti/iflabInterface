import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/pages/routes/routes";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Pega largura da tela
const { width } = Dimensions.get("window");

// // Define o tamanho do REM de forma responsiva
EStyleSheet.build({
	$rem: width > 700 ? 20 : width > 400 ? 18 : 16,
});

// Console do Screen-IFrame
if (typeof window !== "undefined" && window.parent) {
	["log", "info", "warn", "error", "debug"].forEach((type) => {
		const original = console[type].bind(console);
		console[type] = function (...args) {
			original(...args);
			try {
				window.parent.postMessage({ type: "console", level: type, args }, "*");
			} catch (e) {}
		};
	});
}

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer style={{ flex: 1 }}>
				<Routes />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
