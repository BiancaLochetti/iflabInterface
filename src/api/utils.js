// O======================================================================O
/*
    # Arquivo utilitário para controle de armazenamento,
    # detecção de IP local e comunicação com a API na rede local.
*/
// O======================================================================O

import * as Crypto from "expo-crypto";
import * as Network from "expo-network";
import { Platform } from "react-native";
const AsyncStorage =
	require("@react-native-async-storage/async-storage").default;

// O======================================================================O
/* 
    0. CONFIGURAÇÕES MANUAIS (ajuste conforme o ambiente de desenvolvimento)

    - Se estiver rodando no navegador (Web), o IP local precisa ser definido
    manualmente, pois o browser não permite obter o IP real da máquina (paia).
    - Essa configuração é ignorada em dispositivos React Native.

    Exemplo: "192.168.0.42"  →  IP da sua máquina na rede local. 
*/

// O======================================================================O

const WEB_LOCAL_IP = "10.123.71.222";
const API_PORT = 3333; // Porta padrão da sua API local
const SCAN_BATCH_SIZE = 20; // Quantidade de IPs testados em paralelo
const TIMEOUT = 1500;

// O======================================================================O

// Função universal para salvar dados (Web ou React Native) (as funções de requisição tbm utilizam):
async function storage_saver(key, value) {
	console.log("Salvando", key, value);

	if (typeof window !== "undefined" && window.localStorage) {
		window.localStorage.setItem(key, value);
	} else {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.error("Erro ao salvar no AsyncStorage:", error);
		}
	}
}

// O======================================================================O

// Função universal para recuperar dados (Web ou React Native) (as funções de requisição tbm utilizam):
async function storage_getter(key) {
	console.log("Recuperando", key);

	if (typeof window !== "undefined" && window.localStorage) {
		return window.localStorage.getItem(key);
	} else {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (error) {
			console.error("Erro ao recuperar do AsyncStorage:", error);
			return null;
		}
	}
}

// O======================================================================O

// Função para obter o IP local do dispositivo (na rede local):
async function getLocalDeviceIp() {
	// Caso Web → usa o IP manual definido no topo
	if (Platform.OS === "web") {
		console.log("Modo Web detectado — usando IP manual:", WEB_LOCAL_IP);
		return WEB_LOCAL_IP;
	}

	// Caso Mobile (React Native)
	try {
		const ipAddress = await Network.getIpAddressAsync();

		if (ipAddress && ipAddress !== "0.0.0.0") {
			console.log("IP Local do Dispositivo:", ipAddress);
			return ipAddress;
		}

		console.warn("getIpAddressAsync retornou 0.0.0.0 ou null.");
		return null;
	} catch (error) {
		console.error("Erro ao obter o IP local:", error);
		return null;
	}
}

// O======================================================================O

// Função auxiliar: extrai a sub-rede (ex: 192.168.0):
function getSubnet(ip) {
	if (!ip) return null;
	const parts = ip.split(".");
	if (parts.length !== 4) return null;
	return `${parts[0]}.${parts[1]}.${parts[2]}`;
}

// O======================================================================O

// Função auxiliar: testa conexão com a API em um IP específico:
async function fetchAPI(ip, secret) {
	const url = `http://${ip}:${API_PORT}/${secret}`;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

	const Options = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		signal: controller.signal, // Adiciona o AbortController
	};

	try {
		const response = await fetch(url, Options);
		clearTimeout(timeoutId); // Limpa o timeout se a requisição for rápida

		if (!response.ok) throw new Error(`Status ${response.status}`);

		const data = await response.json();

		console.log("Conectado à API:", url);

		return data;
	} catch (error) {
		// Ignora o erro se for timeout
		if (error.name === "AbortError") {
			console.log(`Timeout: ${url}`);
		} else {
			console.log(`Erro ao acessar ${url}: ${error.message}`);
		}
		clearTimeout(timeoutId); // Garante que o timeout seja limpo
		return null;
	}
}

// O======================================================================O

// Função auxiliar: varre um intervalo de IPs em lotes paralelos:
async function scanNetworkBatch(subnet, secret) {
	console.log(`Iniciando varredura paralela na sub-rede ${subnet}.x ...`);

	let current = 2;
	let foundIP = null;

	while (current <= 254 && !foundIP) {
		const batch = [];

		for (let i = 0; i < SCAN_BATCH_SIZE && current <= 254; i++, current++) {
			const candidate = `${subnet}.${current}`;
			batch.push(
				fetchAPI(candidate, secret).then((result) => {
					if (result) return candidate;
					return null;
				})
			);
		}

		const results = await Promise.all(batch);
		foundIP = results.find((ip) => ip !== null);

		if (foundIP) {
			console.log("API encontrada em:", foundIP);
			return foundIP;
		}
	}

	console.warn("Nenhuma API encontrada na sub-rede:", subnet);
	return null;
}

// O======================================================================O

// Função principal: localizar a API na rede local:
async function findAPI() {
	/*--------------------------------------------------*/

	// Gera um UUID temporário para teste
	const secret = Crypto.randomUUID();

	/*--------------------------------------------------*/

	// Verifica se já existe um IP salvo
	const saved_ip = await storage_getter("api_ip");

	if (saved_ip) {
		const test = await fetchAPI(saved_ip, secret);
		if (test) {
			console.log("API encontrada no IP salvo:", saved_ip);
			return saved_ip;
		}
		console.log("IP salvo inválido, iniciando varredura...");
	}

	/*--------------------------------------------------*/

	// Obtém o IP local do dispositivo
	const my_ip = await getLocalDeviceIp();
	console.log("Meu IP local:", my_ip);

	const subnet = getSubnet(my_ip);
	if (!subnet) {
		console.error("Não foi possível determinar a sub-rede.");
		return null;
	}

	/*--------------------------------------------------*/

	// 7.4 Faz varredura paralela na rede local
	const foundIP = await scanNetworkBatch(subnet, secret, SCAN_BATCH_SIZE);

	if (foundIP) {
		await storage_saver("api_ip", foundIP);
		console.log("API localizada e IP salvo:", foundIP);
		console.log(foundIP);
		return foundIP;
	}

	console.warn("Nenhuma API acessível foi encontrada na rede local.");
	return null;
}

// O======================================================================O

// Exportando funções utilitárias:
export { storage_saver, storage_getter, findAPI };

// O======================================================================O

// storage_saver("email", "daniel.rocha@ifsp.edu.br");
// storage_saver("password", "M4th3us@12345");

/* storage_saver("email", "");
storage_saver("password", "");
storage_saver("token", "");
storage_saver("api_ip", "https://api-flab-v2-0.vercel.app/"); */
