import { Alert } from "react-native";
import { store } from "../Store/Store";

const Constants = require("../../Constants/Constants");
const { default: WebApis } = require("../../Services/WebApis");
const { ToggleLoader, saveDataInAsync, removeDataFromAsync } = require("../../Utils/utils");
const { LOGIN_USER, GET_TOP_STORIES, LOAD_MORE_ARTICLES, GET_ARTICLE_SEARCH } = require("../Types/Types");

const SignIn = (body) => async dispatch => {
    try {
        ToggleLoader(true)
        let Res = await new WebApis().login(body)
        if (Res?.data?.access_token !== undefined && Res?.data?.access_token !== null && Res?.data?.access_token !== '') {
            success(Res?.data?.access_token)
        } else {
            failed()
        }
    } catch (e) {
        failed()
    }
    async function success(token) {
        ToggleLoader(false)
        await saveDataInAsync(Constants.ACCESS_TOKEN, token)
        dispatch({
            type: LOGIN_USER, payload: true
        })
    }
    async function failed() {
        Alert.alert('Invalid credentials')
        ToggleLoader(false)
        await removeDataFromAsync(Constants.ACCESS_TOKEN)
        dispatch({
            type: LOGIN_USER, payload: null
        })
    }
};
const RegisterUser = (body) => async dispatch => {
    try {
        ToggleLoader(true)
        let Res = await new WebApis().register(body)
        if (Res?.data?.access_token !== undefined && Res?.data?.access_token !== null && Res?.data?.access_token !== '') {
            Alert.alert('User Registered.')
            success(Res?.data?.access_token)
        } else if (Res?.data?.status === 401 && Res?.data?.message === 'Email and Password already exist') {
            failed(Res?.data?.message)
        }
    } catch (e) {
        failed()
    }
    async function success(token) {
        ToggleLoader(false)
        await saveDataInAsync(Constants.ACCESS_TOKEN, token)
        dispatch({
            type: LOGIN_USER, payload: true
        })
    }
    async function failed(message = null) {
        if (message) {
            Alert.alert(message)
        }
        ToggleLoader(false)
        dispatch({
            type: LOGIN_USER, payload: null
        })
    }
};
const getTopStories = (category) => async dispatch => {
    try {
        ToggleLoader(true)
        let Res = await new WebApis().getTopStories(category)
        if (Res?.data?.status === 'OK') {
            success(Res?.data?.results)
        } else {
            failed()
        }
    } catch (e) {
        failed()
    }
    async function success(payload) {
        ToggleLoader(false)
        dispatch({
            type: GET_TOP_STORIES, payload
        })
    }
    async function failed() {
        Alert.alert('Failed')
        ToggleLoader(false)
        dispatch({
            type: GET_TOP_STORIES, payload: []
        })
    }
};
const getSearchedArticles = (key, pageNo = 0) => async dispatch => {
    let lowerCaseKey = key?.toLowerCase()
    try {
        if (pageNo === 0) {
            ToggleLoader(true)
        }
        else {
            dispatch({ type: LOAD_MORE_ARTICLES, payload: true });
        }
        let Res = await new WebApis().getArticleSearch(lowerCaseKey, pageNo);
        let old = [...store.getState().GenericReducer.articleSearch.list];
        let obj_New = {};
        if (Res?.data?.status === 'OK') {
            if (pageNo === 0) {
                old = [];
            }
            let newData = Res?.data?.response?.docs;
            let Merged = [...old, ...newData];
            obj_New = {
                list: Merged,
                page: pageNo + 1,
            };
            if (newData?.length < 10) {
                obj_New['lastpost'] = true;
            } else {
                obj_New['lastpost'] = false;
            }
        } else {
            obj_New = {
                list: old,
                lastpost: true,
                pageno: 0,
            };
        }
        dispatch({ type: GET_ARTICLE_SEARCH, payload: obj_New });
        ToggleLoader(false)
        dispatch({ type: LOAD_MORE_ARTICLES, payload: false });
    } catch (e) {
        Alert.alert('Failed to Load Articles')
        ToggleLoader(false)
        dispatch({ type: GENERIC_LOADING, payload: false });
    }
};
export { SignIn, RegisterUser, getTopStories, getSearchedArticles }