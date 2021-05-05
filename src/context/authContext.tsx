import { createContext, useState } from 'react';

interface AuthProviderProps{
    auth: {
        loading: boolean;
        user: any;
    };
}

export const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading: false,
        user: false
    });
    return(
        <AuthContext.Provider value={{
            auth
        }}>
            {children}
        </AuthContext.Provider>
    );
}