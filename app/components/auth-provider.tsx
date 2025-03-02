"use client";

import { createContext, useContext, useState } from "react";
import { defaultUser } from "../lib/defaults";
import { getUser } from "../actions/user";

interface AuthContextType {
    user: User | undefined,
    login: (userId: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<User>(defaultUser);

    const login = async (userId: number) => {
        const fetched_user = await getUser(userId);
        setUser(fetched_user);
    }

    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);