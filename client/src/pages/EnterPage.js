import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import apiCall from "../axios/apiCall";
import { AuthContext } from "../context/AuthContext";

const EnterPage = () => {
	const auth = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const loginHandler = async () => {
		try {
			const { data } = await apiCall.post("/users/auth", { username });
			auth.login(data.user, data.token);
			toast(data.message);
		} catch (err) {
			toast(err);
		}
	};
	return (
		<div className='flex flex-col justify-center items-center h-screen overflow-hidden'>
			<form className='w-3/6 lg:w-1/6'>
				<div className='mb-6'>
					<TextField
						size='small'
						variant='outlined'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className='w-full'
						id='nickname'
						label='Введите свой никнейм'
					/>
				</div>
				<div className='mt-6'>
					<Button onClick={loginHandler} className='w-full' variant='contained'>
						Войти
					</Button>
				</div>
			</form>
		</div>
	);
};
export default EnterPage;
