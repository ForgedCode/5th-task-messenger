import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import EnterPage from "./pages/EnterPage";
import { ToastContainer } from "react-toastify";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	const { username, login, logout, token } = useAuth();
	const isAuth = !!username;
	return (
		<AuthContext.Provider value={{ username, login, logout, isAuth, token }}>
			<Router>
				<ToastContainer position='top-center' theme='dark' />
				<Routes>
					{isAuth ? (
						<Route path='/' element={<MainPage />} />
					) : (
						<Route path='/' element={<EnterPage />} />
					)}
				</Routes>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
