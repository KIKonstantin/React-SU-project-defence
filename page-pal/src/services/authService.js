import{ requestFactory } from './requester';

const baseUrl  = `http://localhost:3030/users`;

export const authServiceFactory = (token) => {
    const request = requestFactory(token);
    return{
        login : ( loginData ) => request.post(`${baseUrl}/login`, loginData),
        me: (token ) => request.get(`${baseUrl}/me`, token),
        editProfile: (userId, data) => request.post(`${baseUrl}/${userId}`, data),
        register : ( data ) => request.post(`${baseUrl}/register`, data),
        logout : () => request.get(`${baseUrl}/logout`),
    }
};