import axios from "axios";
import { getCookie, setCookie, hasCookie } from "cookies-next";
import { Socket } from "socket.io-client";
import { getSocket } from "./socketio-utils";
import { structChat } from "@/contexts/chatsContext";

const BACKEND_URL = "http://localhost:3000";
let socket: Socket;
let token = getCookie("authToken");

const setAuthToken = (token: string) => {
  const authToken = `Bearer ${token}`;
  setCookie("authToken", authToken);
  axios.defaults.headers.common.Authorization = authToken;
};

const checkAndUpdateSocket = () => {
  if (!hasCookie("authToken")) return false;
  if (!socket) {
    if (!token) token = getCookie("authToken") || "";
    socket = getSocket(BACKEND_URL, token);
  }
  return true;
};

interface RegisterUserArgs {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
}

const registerUser = async (body: RegisterUserArgs) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/auth/register`, body);
    setAuthToken(data.body.token);
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
    const { data } = await axios.post(`${BACKEND_URL}/auth/login`, body);
    setAuthToken(data.body.token);
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

interface GetQueryDto {
  chatId?: string;
  msg: string;
}

const getQuery = async (body: GetQueryDto) => {
  if (checkAndUpdateSocket()) return await socket.emitWithAck("getQuery", body);
};

const getChat = async (
  chatId: string,
  pageNo = 1,
  pageSize = 25,
): Promise<
  | {
      isError: boolean;
      data: { question: string; response: string }[];
      chatId: string;
      msg: string;
    }
  | undefined
> => {
  if (checkAndUpdateSocket())
    return await socket.emitWithAck("getChat", { chatId, pageNo, pageSize });
};

const getChats = async (): Promise<
  { isError: boolean; data: structChat[] } | undefined
> => {
  if (checkAndUpdateSocket()) return await socket.emitWithAck("getChats");
};

export { loginUser, registerUser, getQuery, getChat, getChats };
