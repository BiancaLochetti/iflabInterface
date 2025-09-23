import IP from "./settings";

const url = `https://${IP}/campus/`;

// Função para pegar todos os campus:
async function listCampus() {
  const options = {
    method: "GET",
    headers: {
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
