import { createContext, useContext} from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const AuthContext = createContext(); // --> Context

export const AuthProvider = ({  // --> Component
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService =  authServiceFactory(auth.accessToken);
    let errors = {};
    const navigate = useNavigate();


    const onLoginSubmit = async (data) => {
        if(data.email === '' || data.password === ''){
            errors.message = 'All fields are required'; 
        }
        try {
            const result = await authService.login(data);
            if(result.error){
                throw new Error(result.error)
            }
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            localStorage.clear();
            errors = error.message;
            return errors;
        }
        
    };
    const onRegisterSubmit = async (values) => {
    const {...registerData } = values;
        try {
            const result = await authService.register(registerData);
            if(result.error){
                alert(result.error)
                throw new Error(result.error)
            }
            navigate('/catalog');
            setAuth(result);
        } catch (error) {
            errors = error.message;
            localStorage.clear();
            alert(error.message)
        }
    };
    const onLogout = async () => {
        try {
            await authService.logout();
            localStorage.clear();
            setAuth({});
            
        } catch (error) {
            alert(error.message)
        }

    };

    const contextValue = { 
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        errors,
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