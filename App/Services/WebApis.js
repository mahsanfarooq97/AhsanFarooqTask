
import { findEnviornment } from "../Utils/utils";
import { intercepter } from "./interceptor";
const API_KEY = process.env.API_KEY;
console.log('API KEY',API_KEY)
export default class WebApis {
    async login(params = null) {
        let envMode = findEnviornment();
        let url = envMode.authUrl + `auth/login`;
        return await intercepter(url, 'POST', false, params);
    }
    async register(params = null) {
        let envMode = findEnviornment();
        let url = envMode.authUrl + `auth/register`;
        return await intercepter(url, 'POST', false, params);
    }
    async getTopStories(category) {
        let envMode = findEnviornment();
        let url = envMode.topStoriesUrl+`${category}.json?api-key=${API_KEY}`;
        return await intercepter(url, 'GET', true);
    }
    async getArticleSearch(searchedkey,page) {
        let envMode = findEnviornment();
        let url = envMode.articleSearchUrl+`?q=${searchedkey}&page=${page}&api-key=${API_KEY}`;
        return await intercepter(url, 'GET', true);
    }
}