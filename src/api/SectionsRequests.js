// O=========================================================================================================O //
/*
  O=========================O
  |    Requests - Sections    |
  O=========================O

  Lista de rotas:
  - [X] ListSections
*/
// O=========================================================================================================O //

// Imports:

// Endereço IP da API (pode variar):
import IP from "./assets/settings";

// AsyncStorage (para pegar o token salvo no dispositivo):
import AsyncStorage from "@react-native-async-storage/async-storage";

// O=========================================================================================================O //

// Função para Listar as Sessões em andamento:

async function listSections() {
	const url = `http://${IP}/sessions/mysessions`;

	const token = await AsyncStorage.getItem("token");

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

export { listSections };
