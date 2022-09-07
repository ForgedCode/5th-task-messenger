import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LogoutBtn = () => {
	const auth = useContext(AuthContext);
	const logoutHandler = () => {
		auth.logout();
	};
	return (
		<div className='flex justify-end items-center mt-8 md:m-0 md:absolute top-8 right-8'>
			<Button onClick={logoutHandler} variant='contained'>
				<Logout />
			</Button>
		</div>
	);
};

export default LogoutBtn;
