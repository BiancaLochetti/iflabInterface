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

// Imports:

// Endereço IP da API (pode variar):
import IP from "./settings";

// O=========================================================================================================O //

async function login_user(user_email, user_password) {
  const url = `https://${IP}/user/login`;

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
  const url = `https://${IP}/user/logout`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  
  const token = localStorage.getItem("token");

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
  const url = `https://${IP}/users/email/getcode`;

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
    return { status: false, msg: "Erro ao conectar com o servidor: " + err };
  }
}

// O=========================================================================================================O //

async function email_code_validation(user_email, user_validation_code) {
  const url = `https://${IP}/users/email/validate`;

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

async function password_recovery(user_email, user_validation_code, user_password) {
  const url = `https://${IP}/users/password/recovery`;

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

async function register_user(user_email, user_password, user_name, user_creation_token, campus_id) {
  const url = `https://${IP}/user/register`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email, user_password, user_name, user_creation_token, campus_id }),
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
  const url = `https://${IP}/users/name/edit`;

  const token = localStorage.getItem("token");

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
  const url = `https://${IP}/users/email/edit`;

  const token = localStorage.getItem("token");

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
  const url = `https://${IP}/users/password/edit`;

  const token = localStorage.getItem("token");

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
  const url = `https://${IP}/users/image/edit`;

  const token = localStorage.getItem("token");

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
  const url = `https://${IP}/user/info`;

  const token = localStorage.getItem("token");

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



Apagar para ativar --------------> */



import IP from "./settings";

const url = `https://${IP}/user/`;

//Registra um novo usuário
async function registerUser(userData) {
  try {
    const response = await fetch(url + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (err) {
    return { status: false, msg: "Erro na conexão" };
  }
}

//Login do usuário
async function loginUser(email, password) {
  try {
    const response = await fetch(url + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: email,
        user_password: password,
      }),
    });
    return await response.json();
  } catch (err) {
    return { status: false, msg: "Erro na conexão" };
  }
}

//Logout do usuário
async function logoutUser(token) {
  try {
    const response = await fetch(url + "logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (err) {
    return { status: false, msg: "Erro na conexão" };
  }
}

//Valida email enviando código
async function sendEmailValidation(user_email, reason_for_code) {
  try {
    const response = await fetch(url + "email-validation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email, reason_for_code }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

//Valida o código do email (registro)
async function validateEmailCode(user_email, user_validation_code) {
  try {
    const response = await fetch(url + "email-code-validation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email, user_validation_code }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}


//Recuperação de senha
async function passwordRecovery(user_email, user_validation_code, user_password) {
  try {
    const response = await fetch(url + "password-recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email,
        user_validation_code,
        user_password,
      }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

//Edita nome do usuário
async function editUserName(token, user_name) {
  try {
    const response = await fetch(url + "edit-name", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ user_name }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

//Edita email do usuário
async function editUserEmail(token, user_email, user_validation_code) {
  try {
    const response = await fetch(url + "edit-email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ user_email, user_validation_code }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

//Edita senha do usuário
async function editUserPassword(token, user_password) {
  try {
    const response = await fetch(url + "edit-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ user_password }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

//Edita imagem do usuário
async function editUserImage(token, user_image) {
  try {
    const response = await fetch(url + "edit-image", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ user_image }),
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

//Obtém informações do usuário logado
async function getUserInfo(token) {
  try {
    const response = await fetch(url + "info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (err) {
    return { status: false };
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  sendEmailValidation,
  validateEmailCode,
  passwordRecovery,
  editUserName,
  editUserEmail,
  editUserPassword,
  editUserImage,
  getUserInfo,
};
