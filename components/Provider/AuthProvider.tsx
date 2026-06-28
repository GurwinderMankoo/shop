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
type UserUpdates = Partial<Omit<User, "id" | "email" | "role">>;

type UserState = {
    user: User | null;
    logout: () => Promise<void>,
    updateUser: (user: Partial<UserUpdates>) => void
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

    const updateUser = useCallback((updates: Partial<UserUpdates>) => {
        setUser((prev) => {
            if (!prev) {
                return updates as User;
            }
            return {
                ...prev,
                ...updates
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider