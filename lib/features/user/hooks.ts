import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setUsername, setAddress, setUser, resetUser } from './slice';
import { useCallback } from 'react';

export function useUser() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const login = useCallback((username: string, address: string) => {
        dispatch(setUser({ isLogged: true, username, address }));
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(resetUser());
    }, [dispatch]);

    const updateUsername = useCallback((username: string) => {
        dispatch(setUsername(username));
    }, [dispatch]);

    const updateAddress = useCallback((address: string) => {
        dispatch(setAddress(address));
    }, [dispatch]);

    return {
        user,
        isLogged: user.isLogged,
        username: user.username,
        address: user.address,
        login,
        logout,
        updateUsername,
        updateAddress,
    };
};
