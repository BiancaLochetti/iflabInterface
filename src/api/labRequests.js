// O=========================================================================================================O //
/*
  O=======================O
  |    Requests - labs    |
  O=======================O

  Lista de rotas:
  - [] register_new_laboratory
  - [] delete_laboratory
  - [] get_laboratories
  - [] get_laboratory_schedule
  - [] get_laboratory_users
  - [] change_user_admin_level
  - [] add_user_to_lab
  - [] remove_user_from_lab
*/
// O=========================================================================================================O //

// Imports:

// Endereço IP da API (pode variar):
import IP from "./settings";

// O=========================================================================================================O //

async function register_new_laboratory(lab_name) {
    const url = `https://${IP}/labs/register`;

    const token = localStorage.getItem("token");

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({ lab_name })
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

async function delete_laboratory(lab_id) {
    const url = `https://${IP}/labs/delete/${lab_id}`;

    const token = localStorage.getItem("token");

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
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

async function get_laboratories() {
    const url = `https://${IP}/labs/my`;

    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
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

async function get_laboratory_schedule(lab_id, date) {
    const url = `https://${IP}/labs/schedule/${lab_id}/${date}`;

    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
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

async function get_laboratory_users(lab_id) {
    const url = `https://${IP}/labs/users/${lab_id}`;

    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        }
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

async function change_user_admin_level(lab_id, user_id, user_admin_level) {
    const url = `https://${IP}/labs/admin`;

    const token = localStorage.getItem("token");

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({ lab_id, user_id, user_admin_level })
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

async function add_user_to_lab(lab_id, user_id, user_admin_level) {
    const url = `https://${IP}/labs/admin`;

    const token = localStorage.getItem("token");

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({ lab_id, user_id, user_admin_level })
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

async function remove_user_from_lab(lab_id, user_id) {
    const url = `https://${IP}/labs/admin`;

    const token = localStorage.getItem("token");

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({ lab_id, user_id })
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
    register_new_laboratory,
    delete_laboratory,
    get_laboratories,
    get_laboratory_schedule,
    get_laboratory_users,
    change_user_admin_level,
    add_user_to_lab,
    remove_user_from_lab
};

// O=========================================================================================================O //