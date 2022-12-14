import axios from "axios";
import localStorageKeys from "../constants/localStorageKeys";
import urls from "../constants/urls";

const apiCall = axios.create({
	baseURL: urls.BASE_URL,
});
apiCall.interceptors.request.use((req) => {
	if (localStorage.getItem(localStorageKeys.USER_DATA)) {
		const userData = JSON.parse(
			localStorage.getItem(localStorageKeys.USER_DATA)
		);
		req.headers.Authorization = `Bearer ${userData.token}`;
	}
	return req;
});

export default apiCall;
