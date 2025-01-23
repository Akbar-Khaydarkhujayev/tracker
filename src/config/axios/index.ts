import axios from "axios";

export const baseUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_API_URL
        : `${window.location.origin}/`;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}api/`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // window.location.reload();
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
