import { createContext } from "react";

export const AuthContext = createContext({
	username: "",
	token: null,
	login: () => null,
	logout: () => null,
	isAuth: false,
});
