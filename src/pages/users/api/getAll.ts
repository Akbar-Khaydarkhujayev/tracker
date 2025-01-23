import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    photo: string;
    is_active: boolean;
    is_approved: boolean;
}

interface IParams {
    search?: string;
    page?: number;
    limit?: number;
    type?: string;
    platform?: string;
}

const getUsers = (params: IParams): Promise<IUser[]> =>
    axiosInstance
        .get("/employees", { params })
        .then((res) => res.data.data.employees);

export const useGetUsers = () =>
    useQuery({
        queryKey: ["users"],
        queryFn: () =>
            getUsers({
                page: 1,
                limit: 6,
                type: "release",
            }),
    });
