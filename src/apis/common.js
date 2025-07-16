import client from "@/utils/http";

export function postLogin(data) {
  return client.post("/auth/login", data);
}
