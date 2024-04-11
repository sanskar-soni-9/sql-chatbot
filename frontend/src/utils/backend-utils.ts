import axios from "axios";
const BACKED_URL = "http://localhost:3000";

interface RegisterUserArgs {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
}

const registerUser = async (body: RegisterUserArgs) => {
  try {
    const { data } = await axios.post(`${BACKED_URL}/auth/register`, body);
    axios.defaults.headers.common.Authorization = `Bearer ${data.body.token}`;
    return { status: "ok", error: "" };
  } catch (err) {
    return {
      status: "error",
      // @ts-ignore
      error: err.response
        ? // @ts-ignore
          err.response.data.message
        : "Error occured while performing this action.",
    };
  }
};

interface LoginUserArgs {
  login: string;
  password: string;
}

const loginUser = async (body: LoginUserArgs) => {
  try {
    const { data } = await axios.post(`${BACKED_URL}/auth/login`, body);
    axios.defaults.headers.common.Authorization = `Bearer ${data.body.token}`;
    return { status: "ok", error: "" };
  } catch (err) {
    return {
      status: "error",
      // @ts-ignore
      error: err.response
        ? // @ts-ignore
          err.response.data.message
        : "Error occured while performing this action.",
    };
  }
};

export { registerUser, loginUser };
