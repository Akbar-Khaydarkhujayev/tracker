import { axiosInstance } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUpdateWorkSessionHours {
    adjustedHours: number;
}

export const updateWorkSessionHours = (
    sessionId: number | string,
    data: IUpdateWorkSessionHours
) => {
    return axiosInstance
        .patch(`/worksessions/${sessionId}`, data)
        .then((res) => res.data);
};

export const useUpdateWorkSessionHours = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({
            sessionId,
            data,
        }: {
            sessionId: number | string;
            data: IUpdateWorkSessionHours;
        }) => updateWorkSessionHours(sessionId, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["work-sessions"] });
            toast({
                title: res.message,
            });
        },
    });
};
