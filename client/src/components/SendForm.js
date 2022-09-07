import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Autocomplete, createFilterOptions } from "@mui/material";
import apiCall from "../axios/apiCall";
import { toast } from "react-toastify";

const filterOptions = createFilterOptions({
	limit: 5,
});
const SendForm = () => {
	const [userList, setUserList] = useState([]);
	const [message, setMessage] = useState({
		recipient: "",
		recValue: "",
		topic: "",
		body: "",
	});
	useEffect(() => {
		const getUserList = async () => {
			const { data } = await apiCall.get("/users/getUsers");
			setUserList(data);
		};
		getUserList();
	}, []);
	const onChange = (e) => {
		setMessage({ ...message, [e.target.id]: e.target.value });
	};
	const sendMessageHandler = async () => {
		try {
			const { data } = await apiCall.post("/messages/send", {
				...message,
				recipient: message.recValue || message.recipient,
			});
			if (data) {
				setMessage({ recipient: "", recValue: "", topic: "", body: "" });
				toast(data.message);
			}
		} catch (err) {
			toast(err.response.data.message);
		}
	};
	return (
		<form className='w-full m-auto lg:m-0 md:max-w-xl lg:max-w-4xl p-6 lg:p-12'>
			<div className='mb-4'>
				<Autocomplete
					options={userList.map((option) => option.username)}
					size='small'
					freeSolo
					open={message.recValue.length > 0}
					filterOptions={filterOptions}
					value={message.recipient}
					onChange={(e, value) => {
						setMessage({ ...message, recipient: value, recValue: "" });
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							value={message.recValue}
							onChange={(e) =>
								setMessage({ ...message, recValue: e.target.value })
							}
							label='Кому'
						/>
					)}
				/>
			</div>
			<div className='mb-6'>
				<TextField
					size='small'
					value={message.topic}
					onChange={onChange}
					variant='outlined'
					className='w-full'
					id='topic'
					label='Тема'
				/>
			</div>
			<div className='mb-6'>
				<TextField
					size='small'
					variant='outlined'
					value={message.body}
					onChange={onChange}
					className='w-full'
					id='body'
					multiline
					minRows='5'
					maxRows='10'
					label='Ваше сообщение'
				/>
			</div>
			<div className='mt-6'>
				<Button
					onClick={sendMessageHandler}
					className='w-full'
					variant='contained'
				>
					Отправить сообщение
				</Button>
			</div>
		</form>
	);
};

export default SendForm;
