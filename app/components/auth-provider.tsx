"use client";

import { createContext, useContext, useState } from "react";
import { getUser } from "../actions/user";

interface AuthContextType {
    user: User | undefined,
    login: (userId: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const login = async (userId: number) => {
        const fetched_user = await getUser(userId);
        setUser(fetched_user);
        console.log(fetched_user);
    }

    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);