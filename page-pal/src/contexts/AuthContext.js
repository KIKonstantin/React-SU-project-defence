import { createContext, useContext, useState } from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext(); // --> Context

export const AuthProvider = ({  // --> Component
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService =  authServiceFactory(auth.accessToken);
    let errors = [];
    const navigate = useNavigate();


    const onLoginSubmit = async (data) => {
        if(data.email === '' || data.password === ''){
            errors.push('All fields are required!')
        }
        if(errors.length > 0) {
            return data;
        } 
        try {
            const result = await authService.login(data);
            if(result.error?.message === 'Forbidden'){
                throw new Error('User was not found!')
            }
            if(result.error){
                throw new Error(result.error)
            }
            setAuth(result);
            navigate('/catalog');
        } catch (error) {
            alert(error.message);
        }
        
    };
    const onRegisterSubmit = async (values) => {
    const {confirmPassword, ...registerData } = values;
        if(
            registerData.username === '' ||
            registerData.email === '' ||
            registerData.genre === '' ||
            registerData.password === '' ||
            confirmPassword === ''
        ){
            errors.push('All fields except photo url are required!')
        }else if(confirmPassword !== registerData.password){
            errors.push('Passwords mismatch')
        }
        if(errors.length > 0) {
            return registerData;
        } 
        try {
            const result = await authService.register(registerData);
            if(result.error){
                throw new Error(result.error)
            }
            navigate('/catalog');
            setAuth(result);
        } catch (error) {
            alert(error.message)
        }
    };
    const onLogout = async () => {
        try {
            await authService.logout();
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