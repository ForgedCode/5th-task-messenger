import axios from "axios";
import localStorageKeys from "../constants/localStorageKeys";
import urls from "../constants/urls";

const apiCall = axios.create({
	baseURL: urls.BASE_URL,
});
const userData = JSON.parse(localStorage.getItem(localStorageKeys.USER_DATA));
apiCall.interceptors.request.use((req) => {
	if (userData) {
		req.headers.Authorization = `Bearer ${userData.token}`;
	}
	return req;
});

export default apiCall;
