import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ad6ce.firebaseio.com/'
});

export default instance;