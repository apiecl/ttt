import {io} from "socket.io-client";
const URL = "http://localhost:8989";
export const socket = io(URL);
