import IP from "./settings"

const url = `https://${IP}/campus/`

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
    return { false: false };
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
    return data;
  } catch (err) {
    return false;
  }
}

// Export
export { registerCampus, listCampus };

