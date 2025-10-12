// O=========================================================================================================O //
/*
  O============================O
  |    Requests - Elementos    |
  O============================O

  Lista de rotas:
  - [] RegisterElement
  - [] DeleteElement
  - [] ListLabElements
  - [] GetSessionElements
  - [] GetElementInfo
  - [] EditElementName
  - [] EditElementQuantity
  - [] EditElementCAS
  - [] EditElementEC
  - [] EditElementPhysicalState
  - [] EditElementValidity
  - [] EditElementAdministration
  - [] EditElementMolarMass
  - [] EditElementImage
*/
// O=========================================================================================================O //

// Imports:

// Função para ler valores do storage:
import { storage_getter } from "./utils";

// O=========================================================================================================O //

// Função para registrar elemento:
async function RegisterElement(
	element_name,
	element_image,
	element_molar_mass,
	element_quantity,
	element_cas_number,
	element_ec_number,
	element_admin_level,
	element_validity,
	element_physical_state,
	lab_id
) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/`;

	const options = {
		method: "POST",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_name,
			element_image,
			element_molar_mass,
			element_quantity,
			element_cas_number,
			element_ec_number,
			element_admin_level,
			element_validity,
			element_physical_state,
			lab_id,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para deletar elemento:
async function DeleteElement(element_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/delete`;

	const options = {
		method: "DELETE",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ element_id }),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para listar elementos de um laboratório:
async function ListLabElements(labId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/lab/${labId}`;

	const options = {
		method: "GET",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para ler elementos de uma sessão:
async function GetSessionElements(sessionId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/session/${sessionId}`;

	const options = {
		method: "GET",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para ler informação de um elementos:
async function GetElementInfo(elementId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/info/${elementId}`;

	const options = {
		method: "GET",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar o nome de um elemento:
async function EditElementName(element_id, element_name) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/name`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_name,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

//
async function EditElementQuantity(element_id, element_quantity) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/quantity`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_quantity,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar o CAS de um elemento:
async function EditElementCAS(element_id, element_cas_number) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/cas`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_cas_number,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar o EC de um elemento:
async function EditElementEC(element_id, element_ec_number) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/ec`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_ec_number,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar o estado físico de um elemento:
async function EditElementPhysicalState(element_id, element_physical_state) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/state`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_physical_state,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar a validade de um elemento:
async function EditElementValidity(element_id, element_admin_level) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/validity`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_admin_level,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar o nível de admin de um elemento:
async function EditElementAdministration(element_id, element_admin_level) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/admin`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_admin_level,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar a massa molar:
async function EditElementMolarMass(element_id, element_molar_mass) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/molarmass`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_molar_mass,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

// Função para editar a imagem de um elemento:
async function EditElementImage(element_id, element_image) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `http://${IP}:3333/elements/edit/image`;

	const options = {
		method: "PUT",
		header: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			element_id,
			element_image,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = response.json();

		return data;
	} catch (err) {
		return { status: false, msg: "Erro ao conectar com o servidor:" + err };
	}
}

// O=========================================================================================================O //

export {
	RegisterElement,
	DeleteElement,
	ListLabElements,
	GetSessionElements,
	GetElementInfo,
	EditElementName,
	EditElementQuantity,
	EditElementCAS,
	EditElementEC,
	EditElementPhysicalState,
	EditElementValidity,
	EditElementAdministration,
	EditElementMolarMass,
	EditElementImage,
};

// O=========================================================================================================O //
