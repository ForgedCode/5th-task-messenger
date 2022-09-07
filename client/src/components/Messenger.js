import { useEffect, useState } from "react";
import apiCall from "../axios/apiCall";
import IncomingMessage from "./IncomingMessage";

const Messenger = () => {
	const [incomingMessages, setIncomingMessages] = useState([]);
	useEffect(() => {
		const getMessages = async () => {
			const { data } = await apiCall.get("/messages/getMessages");
			setIncomingMessages(data);
		};
		getMessages();
		const getInterval = setInterval(() => {
			getMessages();
		}, 3000);
		return () => clearInterval(getInterval);
	}, []);
	return (
		<div className='w-full m-auto lg:m-0 md:max-w-xl lg:max-w-4xl p-6 lg:p-12'>
			<div className='border-b-2 border-blue-700 pb-2'>
				<h2 className='text-3xl font-bold text-blue-700'>Входящие сообщения</h2>
			</div>
			<div className='h-[400px] max-h-[400px] overflow-y-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-track-rounded-2xl scrollbar-thumb-rounded-2xl'>
				{incomingMessages?.map((message) => (
					<IncomingMessage key={message._id} message={message} />
				))}
			</div>
		</div>
	);
};

export default Messenger;
