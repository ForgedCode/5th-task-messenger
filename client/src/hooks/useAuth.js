import { useCallback, useEffect, useState } from "react";
import localStorageKeys from "../constants/localStorageKeys";

export const useAuth = () => {
	const [userData, setUserData] = useState({
		username: "",
		token: null,
	});
	const login = useCallback((username, token) => {
		setUserData({ username, token });
		localStorage.setItem(
			localStorageKeys.USER_DATA,
			JSON.stringify({ username, token })
		);
	}, []);
	const logout = useCallback(() => {
		setUserData({});
		localStorage.removeItem(localStorageKeys.USER_DATA);
	}, []);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(localStorageKeys.USER_DATA));
		if (data) {
			login(data.username, data.token);
		}
	}, [login]);
	return { login, logout, username: userData.username, token: userData.token };
};
