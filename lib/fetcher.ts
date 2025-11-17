import api from "./api";

export async function fetcher(url: string) {
  const res = await api.get(url);
  return res.data;
}
