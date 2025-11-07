// O=========================================================================================================O //
/*
  O============================O
  |    Requests - Elementos    |
  O============================O

  Lista de rotas:
  - [] RegisterEquipment
  - [] DeleteEquipment
  - [] ListLabEquipments
  - [] ListSessionEquipments
  - [] GetEquipmentInfo
  - [] EditEquipmentName
  - [] EditEquipmentQuantity
  - [] EditEquipmentQuality
  - [] EditEquipmentDescription
  - [] EditEquipmentAdministration
  - [] EditEquipmentImage
*/
// O=========================================================================================================O //

// Imports:

// Função para ler valores do storage:
import { storage_getter } from "./utils";

// O=========================================================================================================O //

// Função para registrar equipamento:
async function RegisterEquipment(
	lab_id,
	equipment_name,
	equipment_image,
	equipment_description,
	equipment_quantity,
	equipment_quality,
	equipment_admin_level
) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/register`;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({
			lab_id,
			equipment_name,
			equipment_image,
			equipment_description,
			equipment_quantity,
			equipment_quality,
			equipment_admin_level,
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

// Função para deletar equipamento:
async function DeleteEquipment(equipment_id) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/delete`;

	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({}),
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

// Função para listar equipamentos de um laboratório:
async function ListLabEquipments(labId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/lab/${labId}`;

	const options = {
		method: "GET",
		headers: {
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

// Função para listar equipamentos de uma sessão:
async function ListSessionEquipments(sessionId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/session/${sessionId}`;

	const options = {
		method: "GET",
		headers: {
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

// Função para pegar informações de um equipamento:
async function GetEquipmentInfo(equipmentId) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/info/${equipmentId}`;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({}),
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

// Função para editar nome de equipamento:
async function EditEquipmentName(equipment_id, equipment_name) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/edit/name`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ equipment_id, equipment_name }),
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

// Função para editar quantidade de equipamento:
async function EditEquipmentQuantity(equipment_id, equipment_quantity) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/edit/quantity`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ equipment_id, equipment_quantity }),
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

// Função para editar qualidade de equipamento :
async function EditEquipmentQuality(equipment_id, equipment_quality) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/edit/quality`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ equipment_id, equipment_quality }),
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

// Função para editar descrição de equipamento:
async function EditEquipmentDescription(equipment_id, equipment_description) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/edit/description`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ equipment_id, equipment_description }),
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

// Função para editar nível de administração de equipamento:
async function EditEquipmentAdministration(
	equipment_id,
	equipment_admin_level
) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/edit/admin`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ equipment_id, equipment_admin_level }),
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

// Função para editar imagem de equipamento:
async function EditEquipmentImage(equipment_id, equipment_image) {
	const IP = await storage_getter("api_ip");
	const token = await storage_getter("token");

	const url = `https://api-flab-v2-0.vercel.app/equipments/edit/image`;

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify({ equipment_id, equipment_image }),
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
	RegisterEquipment,
	DeleteEquipment,
	ListLabEquipments,
	ListSessionEquipments,
	GetEquipmentInfo,
	EditEquipmentName,
	EditEquipmentQuantity,
	EditEquipmentQuality,
	EditEquipmentDescription,
	EditEquipmentAdministration,
	EditEquipmentImage,
};

// O=========================================================================================================O //
