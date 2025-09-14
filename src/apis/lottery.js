import client from "@/utils/http";

export function postAsk(data) {
  return client.post("/ai/ask", data);
}
