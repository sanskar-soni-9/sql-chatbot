import { io } from "socket.io-client";

const getSocket = (url: string, authorization: string) => {
  return io(url, { extraHeaders: { authorization } });
};

export { getSocket };
