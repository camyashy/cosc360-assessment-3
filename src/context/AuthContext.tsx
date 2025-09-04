import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/User';
import type { AuthContextType } from '../types/AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Initialize user from localStorage on mount
    useEffect(() => {
        const name = localStorage.getItem("user_name");
        const id = localStorage.getItem("user_id");
        if (name && id) {
            setUser({ name, id });
        }
    }, []);

    const login = (newUser: User) => {
        localStorage.setItem("user_name", newUser.name ?? "");
        localStorage.setItem("user_id", newUser.id ?? "");
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        setUser(null);
        // Set redirect???
        // Send to server
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

// How would I use login and logout???