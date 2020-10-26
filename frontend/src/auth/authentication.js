import api from "../services/api";

export const isAuthenticated = () => {
  const auth = localStorage.getItem("@JWT_TOKEN");
  if (!auth) return false;
  return true;
};

export const singIn = async (emailValue, passwordValue, history) => {

  if (emailValue !== "" && passwordValue !== "") {
    const response = await api.post("/authentication", {
      user_email: emailValue,
      user_password: passwordValue,
    });

    if (response.data.error === true)
      return alert("Usuário ou senha incorreto(s).");

    const user_id = response.data.user_id;
    const token = response.data.token;

    localStorage.setItem("@JWT_TOKEN_USER", user_id);
    localStorage.setItem("@JWT_TOKEN", token);

    history.push("/");
  } else {
    alert("Preencha todos os campos");
  }
};

export const logout = (history) => {
  localStorage.removeItem("@JWT_TOKEN_USER");
  localStorage.removeItem("@JWT_TOKEN");
  return history.push("/");
};
