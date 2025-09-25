// O=========================================================================================================O //
/*
  O=========================O
  |    Requests - Campus    |
  O=========================O

  Lista de rotas:
  - [X] registerCampus
  - [X] listCampus
*/
// O=========================================================================================================O //

// Imports:

// Endereço IP da API (pode variar):
import IP from "./settings"

// O=========================================================================================================O //

// Função para registrar um campus:
async function registerCampus(campus_name, campus_uf) {
  const url = `https://${IP}/campus/register`;

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

    // Log. Apagar depois:
    console.log(data);

    return data;
  } catch (err) {
    return { status: false, msg: "Erro ao conectar com o servidor: " + err };
  }
}

// O=========================================================================================================O //

// Função para listar todos os campus:
async function listCampus() {
  const url = `https://${IP}/campus/get`;

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

// O=========================================================================================================O //

// Exportação das funções:
export { registerCampus, listCampus };

// O=========================================================================================================O //





/* 
const url = `https://${IP}/campus/`

// Função para pegar todos os campus:
async function listCampus() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${url}get`, options);
    const data = await response.json();

    return data;
  } catch (err) {
   return {
      status: false,
      msg: "Não foi possível listar campus. Tente novamente mais tarde.",
    };
  }
}

//Função para registrar um campus
async function registerCampus(campusData) {
  try {
    const response = await fetch(url + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campusData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return {
      status: false,
      msg: "Não foi possível registrar o campus. Tente novamente mais tarde.",
    };
  }
}

// Export
export { registerCampus, listCampus };

 */