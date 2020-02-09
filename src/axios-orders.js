import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://danielduarte-burger-builder.firebaseio.com/',
});

export default instance;
