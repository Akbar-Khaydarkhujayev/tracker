import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";

export interface IWorkSession {
    id: string;
    duration: string;
    end_time: string;
    start_time: string;
    adjusted_hours: number;
}

interface IResponse {
    days: { [date: string]: IWorkSession[] };
    total_hours: string;
    total_work_hours: string;
    total_overtime_hours: string;
    user_info: {
        photo: string;
        first_name: string;
        last_name: string;
    };
}

interface IParams {
    startDate?: string;
    endDate?: string;
}

const getWorkSessions = (
    params: IParams,
    userId: string | number
): Promise<IResponse> =>
    axiosInstance
        .get(`/worksessions/${userId}`, {
            params,
        })
        .then((res) => res.data.data);

export const useGetWorkSessions = (params: IParams, userId?: string | number) =>
    useQuery({
        queryKey: ["work-sessions", params, userId],
        queryFn: () => getWorkSessions(params, userId!),
        enabled: !!params.endDate && !!params.startDate && !!userId,
    });
