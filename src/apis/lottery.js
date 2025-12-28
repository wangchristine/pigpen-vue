import client from "@/utils/http";

export function postAsk(data) {
  return client.post("/ai/ask", data);
}

export function getLotteries() {
  return client.get("/lotteries");
}

export function postLottery(data) {
  return client.post("/lotteries", data);
}

export function getLottery(id) {
  return client.get(`/lotteries/${id}`);
}

export function putLottery(data, id) {
  return client.put(`/lotteries/${id}`, data);
}

export function deleteLottery(id) {
  return client.delete(`/lotteries/${id}`);
}
