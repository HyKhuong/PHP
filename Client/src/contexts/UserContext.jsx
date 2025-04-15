import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Kiểm tra localStorage khi khởi tạo state
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const updateUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Thêm useEffect để lắng nghe thay đổi của localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('user');
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useUser = () => useContext(UserContext);
