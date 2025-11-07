// O=========================================================================================================O //
/*
  O=======================O
  |    Requests - labs    |
  O=======================O

  Lista de rotas:
  - [] register_new_laboratory
  - [] delete_laboratory
  - [] get_laboratories
  - [] get_laboratory_schedule
  - [] get_laboratory_users
  - [] change_user_admin_level
  - [] add_user_to_lab
  - [] remove_user_from_lab
*/
// O=========================================================================================================O //

// Imports:

// Função para ler valores do storage:
import { storage_getter } from "./utils";

// AsyncStorage (para pegar o token salvo no dispositivo):
import AsyncStorage from "@react-native-async-storage/async-storage";

// O=========================================================================================================O //

// Função para registrar um novo laboratório:
async function register_new_laboratory(lab_name) {
	const IP = await storage_getter("api_ip");
	const token = await AsyncStorage.getItem("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/register`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ lab_name }),
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

// Função para deletar um laboratório:
async function delete_laboratory(lab_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/delete/${lab_id}`;

	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
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

// Função para pegar os laboratórios do usuário:
async function get_laboratories() {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/my`;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
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

// Função para pegar a agenda de um laboratório:
async function get_laboratory_schedule(lab_id, date) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/schedule/${lab_id}/${date}`;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
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

// Função para pegar os usuários de um laboratório:
async function get_laboratory_users(lab_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/users/${lab_id}`;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
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

// Função para mudar o nível de admin de um usuário em um laboratório:
async function change_user_admin_level(lab_id, user_id, user_admin_level) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/admin`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ lab_id, user_id, user_admin_level }),
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

// Função para adicionar um usuário a um laboratório:
async function add_user_to_lab(lab_id, user_id, user_admin_level) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/admin`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ lab_id, user_id, user_admin_level }),
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

// Função para remover um usuário de um laboratório:
async function remove_user_from_lab(lab_id, user_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/labs/admin`;

	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ lab_id, user_id }),
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
export {
	register_new_laboratory,
	delete_laboratory,
	get_laboratories,
	get_laboratory_schedule,
	get_laboratory_users,
	change_user_admin_level,
	add_user_to_lab,
	remove_user_from_lab,
};

// O=========================================================================================================O //
