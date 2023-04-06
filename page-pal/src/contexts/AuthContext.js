import { createContext, useContext } from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext(); // --> Context

export const AuthProvider = ({  // --> Component
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService =  authServiceFactory(auth.accessToken);
    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            console.error(error);
        }
        
    };
    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        }
        try {
            const result = await authService.register(registerData);
            navigate('/catalog');
            setAuth(result);
        } catch (error) {
            console.error(error);
        }
    };
    const onProfile = async() => {
        await authService.me();
    }
    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const contextValue = { 
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onProfile,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated : !!auth.accessToken,
    }
    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => {  //  --> Hook
    const context = useContext(AuthContext);
    return context;
}