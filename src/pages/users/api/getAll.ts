import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import IPaginatedResponse from "@/types";

export interface IUser {
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    photo: string;
    expected_hours: number;
    actual_hours: number;
    missing_hours: number;
    is_active: boolean;
    is_approved: boolean;
    work_status: "overworked" | "underworked" | "normal";
}

interface IParams {
    startDate?: string;
    endDate?: string;
    limit: string | number;
    page: string | number;
}

const getUsers = (params: IParams): Promise<IPaginatedResponse<IUser>> =>
    axiosInstance
        .get("/worksessions", {
            params,
        })
        .then((res) => res.data.data);

export const useGetUsers = (params: IParams) =>
    useQuery({
        queryKey: ["users", params],
        queryFn: () => getUsers(params),
        enabled: !!params.endDate && !!params.startDate,
    });
