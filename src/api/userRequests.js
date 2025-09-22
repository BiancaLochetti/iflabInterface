import IP from "./settings";

const url = `https://${IP}/user/`;

// Função para registrar um usuário
async function registerUser(userData) {
  try {
    const response = await fetch(url + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
}

// Função para listar todos os usuários
async function listUsers() {
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
    return { status: false };
  }
}

// Export
export { registerUser, listUsers };