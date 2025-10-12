/* <----------------- apagar para ativar

// O=========================================================================================================O //

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

// O=========================================================================================================O //
*/
// Imports:

// Endereço IP da API (pode variar):
import IP from "./assets/settings";

// AsyncStorage (para pegar o token salvo no dispositivo):
import AsyncStorage from "@react-native-async-storage/async-storage";

// O=========================================================================================================O //

async function login_user(user_email, user_password) {
	const url = `http://${IP}/users/login`;

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function logout_user() {
	const url = `http://${IP}/users/logout`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	const token = await AsyncStorage.getItem("token");

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

// O=========================================================================================================O //

async function email_validation(user_email, reason_for_code) {
	const url = `http://${IP}/users/email/getcode`;

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return {
			status: false,
			msg: "Erro ao conectar com o servidor: " + err + " " + url,
		};
	}
}

// O=========================================================================================================O //

async function email_code_validation(user_email, user_validation_code) {
	const url = `http://${IP}/users/email/validate`;

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function password_recovery(
	user_email,
	user_validation_code,
	user_password
) {
	const url = `http://${IP}/users/password/recovery`;

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function register_user(
	user_email,
	user_password,
	user_name,
	user_creation_token,
	campus_id
) {
	const url = `http://${IP}/users/register`;

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function edit_user_name(user_name) {
	const url = `http://${IP}/users/name/edit`;

	const token = await AsyncStorage.getItem("token");

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function edit_user_email(user_email, user_validation_code) {
	const url = `http://${IP}/users/email/edit`;

	const token = await AsyncStorage.getItem("token");

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function edit_user_password(user_password) {
	const url = `http://${IP}/users/password/edit`;

	const token = await AsyncStorage.getItem("token");

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function edit_user_image(user_image) {
	const url = `http://${IP}/users/image/edit`;

	const token = await AsyncStorage.getItem("token");

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

		// Log. Apagar depois:
		console.log(data);

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor: " + err };
	}
}

// O=========================================================================================================O //

async function get_user_info() {
	const url = `http://${IP}/users/info`;

	const token = await AsyncStorage.getItem("token");

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	console.log(url);

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
