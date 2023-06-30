
import axios from 'axios';
import { UserApi } from '../services/apis';

const api = axios.create(
    // baseURL: import.meta.env.VITE_SERVER_END // Set your API base URL here
);

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        // Get the JWT from your authentication system
        console.log('trigegred')
        const item = sessionStorage.getItem('user');
        const user = JSON.parse(item);
        const token = user.accessToken;
        // Set the JWT as an Authorization header
        config.headers.authorization = token ? token : '';
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);
api.interceptors.response.use((res) => {

    return res;
}, (error) => {
    console.log(error, 'mk1232')
    if (error.response.status == 401) {
        axios({
            url: UserApi.REFRESH_TOKEN,
            method: 'post'
        }).then((res) => {

            sessionStorage.setItem('user', JSON.stringify(res.data.user));

        }).catch(() => {
            window.history.pushState('/login');
        })
    }


    return Promise.reject(error)

})

export default api;
