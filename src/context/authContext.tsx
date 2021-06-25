import { createContext, useEffect, useState } from 'react';

interface AuthProviderProps{
    count: number;
    lengthCart: number;
    teste: any;
    setCount: (count: number) => void;
    setTeste: (teste: any) => void;
}

export const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }) => {
    const [count, setCount] = useState<number>(0);
    const [lengthCart, setLengthCart] = useState<number>(0);
    const [teste, setTeste] = useState();

    useEffect(() => {
        const func = async() => {
            const len = await JSON.parse(localStorage.getItem("cart_list_length"));
            setLengthCart(Number(len));
        }

        func();
    }, [count, teste]);
    return(
        <AuthContext.Provider value={{
            count,
            lengthCart,
            teste,
            setCount,
            setTeste
        }}>
            {children}
        </AuthContext.Provider>
    );
}