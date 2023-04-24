import { createContext, useContext } from "react";

const validatorContext = createContext();

const errors = [];

const validatorProvider = (
    {children}
) => {

    function onRegisterValidate(
        ...registerData
        ){
        if(
            registerData.username === '' ||
            registerData.email === '' ||
            registerData.genre === '' ||
            registerData.password === '' ||
            registerData.confirmPassword === ''
        ){
            errors.push('All fields except photo url are required!')
        }else if(registerData.confirmPassword !== registerData.password){
            errors.push('Passwords mismatch')
        }
        if(errors.length === 0) {
            return registerData;
        } 
    }

    const context = {
        onRegisterValidate,
        errors
    }
    

    return(
        <validatorContext.Provider value={context}>
            {children}
        </validatorContext.Provider>
    )
}

export const useValidateContext = () => {  //  --> Hook
    const context = useContext(validatorContext);
    return context;
}





