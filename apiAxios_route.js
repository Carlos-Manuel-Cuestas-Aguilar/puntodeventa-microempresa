import AsyncStorage from '@react-native-async-storage/async-storage';
import { route as baseRoute } from "ziggy-js";
import axios from "axios";

let ZiggyData = null;
let tokenUpdateCallable = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function route(name, parameters = undefined) {
    return baseRoute(name, parameters, undefined, ZiggyData);
}

const apiAxios = axios.create({
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }
});

apiAxios.boot = async function (tokenCallable) {
    tokenUpdateCallable = tokenCallable;
    const response = await axios.get(`http://127.0.0.1:8000/api/ziggy`);
    ZiggyData = await response.data;
    apiAxios.storageToken();
    console.log('Ziggy Routes obtained');
}

apiAxios.storageToken = async function () {
    let authToken = await AsyncStorage.getItem('BearerToken');
    tokenUpdateCallable(authToken);
    apiAxios.defaults.headers.common['Authorization'] = `Bearer ${ authToken }`;
};

apiAxios.refreshToken = async function (newToken = null) {
    await AsyncStorage.setItem('BearerToken', newToken);
    tokenUpdateCallable(newToken);
    apiAxios.defaults.headers.common['Authorization'] = `Bearer ${ newToken }`;
}

apiAxios.isValidToken = async function () {
    try {
        let response = await this.get(route('valid-login'));
        return await response.data == 'OK';
    } catch {
        return false;
    }
}

export {apiAxios, route};