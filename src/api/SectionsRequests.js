// O=========================================================================================================O //
/*
  O===========================O
  |    Requests - Sections    |
  O===========================O

  Lista de rotas:
  - [] CreateNewSession
  - [] DeleteSession
  - [] StartSession
  - [] FinishSession
  - [] ListUserSessions
  - [] GetUtilizationForms
  - [] SaveUtilizationForm
*/
// O=========================================================================================================O //

// Imports:

// Função para ler valores do storage:
import { storage_getter } from "./utils";

// O=========================================================================================================O //

// Função para criar uma nova sessão:
async function CreateNewSession(
	lab_id,
	session_date,
	session_starts_at,
	session_ends_at,
	elements_list,
	equipments_list
) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/create`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			lab_id,
			session_date,
			session_starts_at,
			session_ends_at,
			elements_list,
			equipments_list,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para deletar uma sessão:
async function DeleteSession(session_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/delete`;

	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			session_id,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para iniciar uma sessão:
async function StartSession(session_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/start`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			session_id,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para finalizar uma sessão:
async function FinishSession(session_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/finish`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			session_id,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para listar sessões do usuário:
async function ListUserSessions() {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/mysessions`;

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
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}
// O=========================================================================================================O //

// Função para ler formulários de utilização:
async function GetUtilizationForms(sessionId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/form/${sessionId}`;

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
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para salvar formulários de utilização:
async function SaveUtilizationForm(session_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/session/form/set`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			session_id,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

export {
	CreateNewSession,
	DeleteSession,
	StartSession,
	FinishSession,
	ListUserSessions,
	GetUtilizationForms,
	SaveUtilizationForm,
};

// O=========================================================================================================O //