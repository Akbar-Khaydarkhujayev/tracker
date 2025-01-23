import { axiosInstance } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IApproveUser {
    userId: string;
    isApproved: boolean;
}

export const aproveUser = (data: IApproveUser) => {
    return axiosInstance
        .patch("employees/users/approve", data)
        .then((res) => res.data);
};

export const useApproveUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: aproveUser,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast({
                title: res.message,
            });
        },
        onError: (error) => {
            const err = error as unknown as {
                response: { data: { message: string } };
            };
            toast({
                variant: "destructive",
                title: err.response?.data?.message || "Хатолик юз берди",
            });
        },
    });
};
