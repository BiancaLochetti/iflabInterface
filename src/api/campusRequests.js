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
import IP from "./settings";

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
  console.log(url)

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

// Exportando requisições:
export { registerCampus, listCampus };

// O=========================================================================================================O //