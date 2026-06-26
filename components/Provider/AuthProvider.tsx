"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { logout as signout } from "../../app/actions/logout.action"
import { useRouter } from "next/navigation"


type AuthProviderProps = {
    children: React.ReactNode
    userState: User | null
}
type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string
};

type UserState = {
    user: User | null;
    logout: () => Promise<void>,
    updateUser: (user: User) => void
};

const intialState: UserState = {
    user: null,
    logout: async () => { },
    updateUser: () => { }
}

const AuthContext = createContext<UserState>(intialState)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ userState, children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(userState)
    const router = useRouter()

    const logout = useCallback(async () => {
        await signout();
        setUser(null)
        router.refresh()
    }, [])

    const updateUser = useCallback((user: User | null) => {
        setUser(user)
    }, [])

    return (
        <AuthContext.Provider value={{ user, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider