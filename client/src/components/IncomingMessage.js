import { Button } from "@mui/material";
import { useState } from "react";
import Moment from "react-moment";
import apiCall from "../axios/apiCall";

const IncomingMessage = ({ message }) => {
	const [open, setOpen] = useState(false);
	const setMessageOpen = async () => {
		setOpen(!open);
		window.scroll({ top: 0 });
		if (!message.isOpen) {
			await apiCall.put("/messages/setMessageOpen", { id: message._id });
		}
	};
	return (
		<div>
			<div
				className={`my-1 px-4 py-2 rounded-md border ${
					message.isOpen ? "font-normal bg-blue-100" : "font-bold bg-blue-300"
				} hover:border-blue-700 hover:bg-blue-400 cursor-pointer duration-200`}
				onClick={setMessageOpen}
			>
				{!message.isOpen && (
					<span className='block mb-4 text-lg'>Непрочитанное сообщение!</span>
				)}
				<h4>Отправитель: {message.sender}</h4>
				<h5>Тема: {message.topic}</h5>
				<span>
					Сообщение получено{" "}
					<Moment locale='ru' fromNow>
						{message.createdAt}
					</Moment>
				</span>
			</div>
			{open && (
				<div className='absolute px-6 py-4 z-50 top-2 bottom-2 left-2 right-2 lg:top-8 lg:bottom-8 lg:left-8 lg:right-8 bg-blue-50 overflow-y-auto'>
					<div className='w-full flex justify-end mb-4 lg:mb-8'>
						<Button variant='contained' onClick={() => setOpen(!open)}>
							Закрыть
						</Button>
					</div>
					<div className='w-full flex flex-col flex-wrap gap-4 break-all'>
						<h4 className='text-lg font-semibold'>
							Отправитель: {message.sender}
						</h4>
						<h5 className='text-lg font-semibold '>Тема: {message.topic}</h5>
						<h5 className='text-sm md:text-lg'>
							Сообщение получено{" "}
							<Moment locale='ru' fromNow>
								{message.createdAt}
							</Moment>
						</h5>
						<div>
							<h5 className='text-lg font-semibold mb-4'>Текст сообщения:</h5>
							<p className='bg-white shadow-sm px-4 py-2 min-h-[300px]'>
								{message.body}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default IncomingMessage;
