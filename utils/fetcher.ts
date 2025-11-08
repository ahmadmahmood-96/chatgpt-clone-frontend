import client from "./axios";

const fetcher = (url: string, token: string) =>
  client
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default fetcher;
