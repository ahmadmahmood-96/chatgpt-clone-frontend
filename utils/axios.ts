import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

// Optional: response interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
