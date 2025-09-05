import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/User';
import type { AuthContextType } from '../types/AuthContextType';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//const navigate = useNavigate();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Initialize user from localStorage on mount
    useEffect(() => {
        const user_name = localStorage.getItem("user_name");
        const user_id = localStorage.getItem("user_id");
        if (user_name && user_id) {
            setUser({ user_name, user_id });
        }
    }, []);

    const login = (newUser: User) => {
        localStorage.setItem("user_name", newUser.user_name ?? "");
        localStorage.setItem("user_id", newUser.user_id ?? "");
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        setUser(null);
        //navigate(`/`);
        // Send to server
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};