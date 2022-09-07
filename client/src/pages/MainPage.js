import LogoutBtn from "../components/LogoutBtn";
import Messenger from "../components/Messenger";
import SendForm from "../components/SendForm";

const MainPage = () => {
	return (
		<div className='relative min-h-[100vh] overflow-hidden flex flex-col items-center'>
			<LogoutBtn />
			<SendForm />
			<Messenger />
		</div>
	);
};

export default MainPage;
