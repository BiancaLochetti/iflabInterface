// O=========================================================================================================O //
/*
  O========================O
  |    Requests - users    |
  O========================O

  Lista de rotas:
  - [] login_user
  - [] logout_user
  - [] email_validation
  - [] email_code_validation
  - [] password_recovery
  - [] register_user
  - [] edit_user_name
  - [] edit_user_email
  - [] edit_user_password
  - [] edit_user_image
  - [] get_user_info
*/
// O=========================================================================================================O //

// Imports:

// Função para ler valores do storage:
import { storage_getter, storage_saver } from "./utils";

// O=========================================================================================================O //

// Função para login de usuário:
async function login_user(user_email, user_password) {
	const IP = await storage_getter("api_ip");

	const url = `http://${IP}:3333/users/login`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_email, user_password }),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		if (data.status) {
			// Armazena o token localmente:
			await storage_saver("token", data.token);
		}

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

// Função para logout de usuário:
async function logout_user() {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/users/logout`;

	const options = {
		method: "POST",
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

// Função para enviar código de validação para email:
async function email_validation(user_email, reason_for_code) {
	const IP = await storage_getter("api_ip");

	const url = `http://${IP}:3333/users/email/getcode`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_email, reason_for_code }),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		return {
			status: false,
			msg: "Erro ao conectar com o servidor: " + err + " " + url,
		};
	}
}

// O=========================================================================================================O //

// Função para validar código enviado por email:
async function email_code_validation(user_email, user_validation_code) {
	const IP = await storage_getter("api_ip");

	const url = `http://${IP}:3333/users/email/validate`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_email, user_validation_code }),
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

// Função para recuperar senha:
async function password_recovery(
	user_email,
	user_validation_code,
	user_password
) {
	const IP = await storage_getter("api_ip");

	const url = `http://${IP}:3333/users/password/recovery`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_email, user_validation_code, user_password }),
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

// Função para registrar usuário:
async function register_user(
	user_email,
	user_password,
	user_name,
	user_creation_token,
	campus_id
) {
	const IP = await storage_getter("api_ip");

	const url = `http://${IP}:3333/users/register`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user_email,
			user_password,
			user_name,
			user_creation_token,
			campus_id,
		}),
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

// Função para editar o nome de um usuário:
async function edit_user_name(user_name) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/users/name/edit`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ user_name }),
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

// Função para editar o email de um usuário:
async function edit_user_email(user_email, user_validation_code) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/users/email/edit`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ user_email, user_validation_code }),
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

// Função para editar a senha de um usuário:
async function edit_user_password(user_password) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/users/password/edit`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ user_password }),
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

// Função para editar a imagem de um usuário:
async function edit_user_image(user_image) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/users/image/edit`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ user_image }),
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

// Função para obter informações do usuário:
async function get_user_info() {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/users/info`;

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

// Exportando requisições:
export {
	login_user,
	logout_user,
	email_validation,
	email_code_validation,
	password_recovery,
	register_user,
	edit_user_name,
	edit_user_email,
	edit_user_password,
	edit_user_image,
	get_user_info,
};

// O=========================================================================================================O //

/*async function a() {
await login_user("daniel.rocha@ifsp.edu.br", "M4th3us@12345");
}*/