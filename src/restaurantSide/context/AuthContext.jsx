import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [uid, setUid] = useState('');

    return (
        <AuthContext.Provider value={{uid, setUid}}>
            { children }
        </AuthContext.Provider>
    )
} 