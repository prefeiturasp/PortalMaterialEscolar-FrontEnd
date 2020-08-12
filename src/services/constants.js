import { getToken } from "./auth.service";

export const AUTH_TOKEN = {
  Authorization: `JWT ${getToken()}`,
  "Content-Type": "application/json"
};


