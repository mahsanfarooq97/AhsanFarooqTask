import axios from 'axios';
import { findEnviornment, getDataFromAsync } from '../Utils/utils';
import Constants from '../Constants/Constants';
import WebApis from './WebApis';

export const refreshTokenMain = async () => {
    try {
        // let envMode =  findEnviornment();
        // let REFRESH_TOKEN = await AsyncStorage.getItem('REFRESHTOKEN');
        // let url =
        //     envMode?.BASE_URL_NEW + 'jwt-refresh-token?refreshToken=' + REFRESH_TOKEN;
        // let response = await axios.get(url, {
        //     headers: {
        //         Accept: 'application/json',
        //     },
        // });
        // if (response?.data?.success) {
        //     await DMFunctions.saveDataInDefaults(
        //         Constants.TOKEN,
        //         response?.data?.AccessToken,
        //     );
        //     await DMFunctions.saveDataInDefaults(
        //         Constants.REFRESH_TOKEN,
        //         response?.data?.refreshToken,
        //     );
        //     return true;
        // } else {
        //     return false;
        // }
        let res = new WebApis().refreshToken();
        if (res?.data?.success) {

        }
        return false
    } catch (e) {
        return false;
    }
};

export const intercepter = async (url, method, token, body = {}) => {
    let headers = { 'Content-Type': 'application/json' };
    if (token) {
        let API_TOKEN = await getDataFromAsync(Constants.ACCESS_TOKEN);
        headers.Authorization = 'Bearer ' + API_TOKEN;
    }
    let structure = {
        url: url,
        method: method,
        headers: headers,
    };

    if (method === 'GET') structure.params = body;
    else structure.data = body;
    console.log('structure', structure)
    return axios(structure)
        .then(resp => {
            return resp;
        })
        .catch(async error => {
            if (
                error.toString() == 'AxiosError: Request failed with status code 403'
            ) {
                let res = await refreshTokenMain();
                if (res) {
                    await intercepter(url, method, token, body);
                }
            } else if (
                error.toString() == 'AxiosError: Request failed with status code 401'
            ) {
                let res = await refreshTokenMain();
                if (res) {
                    await intercepter(url, method, token, body);
                }
            } else return error;
        });
};
