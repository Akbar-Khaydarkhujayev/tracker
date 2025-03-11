import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useEffect,
} from "react";

type AuthAction =
    | { type: "SET_TOKEN"; payload: string }
    | { type: "CLEAR_TOKEN" };

const AuthContext = createContext<{
    state: string | null;
    dispatch: React.Dispatch<AuthAction>;
}>({
    state: localStorage.getItem("token") || null,
    dispatch: () => null,
});

const authReducer = (
    state: string | null,
    action: AuthAction
): string | null => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("token", action.payload);
            window.location.href = "/";
            return action.payload;
        case "CLEAR_TOKEN":
            localStorage.removeItem("token");
            window.location.href = "/login";
            return null;
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(
        authReducer,
        localStorage.getItem("token") || null
    );

    useEffect(() => {
        if (
            !state &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/delete-account"
        ) {
            window.location.href = "/login";
        } else if (state && window.location.pathname === "/login") {
            window.location.href = "/";
        }
    }, [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
