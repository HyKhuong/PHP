import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// Named export for the hook
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

// Named export for the provider component
// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const value = {
        user,
        updateUser: (userData) => {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        },
        logout: () => {
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
