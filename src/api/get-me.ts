import { axiosInstance } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export type IUser = {
    id: string;
    first_name: string;
    last_name: string;
    photo: string | null;
    phone_number: string;
};

const getMe = (): Promise<IUser> =>
    axiosInstance.get("employees/get-me").then((res) => res.data.data.user);

export const useGetMe = () =>
    useQuery({
        queryKey: ["get-me"],
        queryFn: getMe,
    });
