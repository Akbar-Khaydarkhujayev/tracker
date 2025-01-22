import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth";
import { axiosInstance } from "@/config/axios";
import { LoginFields } from "./schema";

const login = (input: LoginFields): Promise<string> =>
    axiosInstance.post("auth/login", input).then((res) => res.data.data.token);

export const useLoginUser = () => {
    const { dispatch } = useAuth();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (token) =>
            dispatch({
                type: "SET_TOKEN",
                payload: token,
            }),
    });

    return mutation;
};
