import AsyncStorage from '@react-native-async-storage/async-storage';
import { route } from "ziggy-js";
import axios from "axios";

const defaultAxios = axios.create({
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }
});

let ZiggyData = null;
class axios_routed {    
    async boot() {
        this.storageToken();
        const response = await axios.get(`http://127.0.0.1:8000/api/ziggy`);
        ZiggyData = await response.data;
        console.log('Ziggy Routes obtained');
    }

    async storageToken() {
        let authToken = await AsyncStorage.getItem('BearerToken');
        defaultAxios.defaults.headers.common['Authorization'] = `Bearer ${ authToken }`;
    }
    
    async refreshToken(newToken = null) {
        await AsyncStorage.setItem('BearerToken', newToken);
        defaultAxios.defaults.headers.common['Authorization'] = `Bearer ${ newToken }`;
    }

    async isValidToken() {
        try {
            let response = await this.get('valid-login');
            return await response.data == 'OK';
        } catch {
            return false;
        }
    }
    
    ziggyRoute(routeName = null, routeParameters = undefined) {
        return route(routeName, routeParameters, undefined, ZiggyData);
    }

    get(routeName, routeParameters = null, config = undefined) {
        return defaultAxios.get(this.ziggyRoute(routeName, routeParameters), config);
    }

    delete(routeName, routeParameters = null, config = undefined) {
        return defaultAxios.delete(this.ziggyRoute(routeName, routeParameters), config)
    }

    post(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.post(this.ziggyRoute(routeName, routeParameters), data, config);
    }

    put(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.put(this.ziggyRoute(routeName, routeParameters), data, config);
    }

    patch(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.patch(this.ziggyRoute(routeName, routeParameters), data, config);
    }

    postForm(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.postForm(this.ziggyRoute(routeName, routeParameters), data, config)
    }

    putForm(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.putForm(this.ziggyRoute(routeName, routeParameters), data, config)
    }

    patchForm(routeName, routeParameters = null, data = undefined, config = undefined) {
        return defaultAxios.patchForm(this.ziggyRoute(routeName, routeParameters), data, config)
    }
}

const axiosRoute = Object.freeze(new axios_routed());
export default axiosRoute;