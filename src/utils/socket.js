import { io } from "socket.io-client";
import { Base_URL } from "./constants";

export const createSocketConnection = () => {
    return io(Base_URL);
}