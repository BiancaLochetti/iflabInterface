// O=========================================================================================================O //
/*
  O=========================O
  |    Requests - Campus    |
  O=========================O

  Lista de rotas:
  - [] registerCampus
  - [] listCampus
*/
// O=========================================================================================================O //

// Imports:

// Função para ler valores do storage:
import { storage_getter } from "./utils";

// O=========================================================================================================O //

// Função para registrar um campus:
async function registerCampus(campus_name, campus_uf) {
	const IP = await storage_getter("api_ip");

	const url = `https://api-flab-v2-0.vercel.app/campus/register`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ campus_name, campus_uf }),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

// Função para listar todos os campus:
async function listCampus() {
	const IP = await storage_getter("api_ip");

	const url = `https://api-flab-v2-0.vercel.app/campus/get`;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

// Exportando requisições:
export { registerCampus, listCampus };

// O=========================================================================================================O //
