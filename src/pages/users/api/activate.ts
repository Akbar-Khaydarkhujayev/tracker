import { axiosInstance } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IActivateUser {
    userId: string;
    isActive: boolean;
}

export const activateUser = (data: IActivateUser) => {
    return axiosInstance
        .patch("employees/users/active", data)
        .then((res) => res.data);
};

export const useActivateUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: activateUser,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                title: res.message,
            });
        },
    });
};
