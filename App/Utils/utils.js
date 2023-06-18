import Constants from "../Constants/Constants";
import { store } from "../Redux/Store/Store";
import { LOGIN_USER, TOGGLE_AUTH_LOADER, TOGGLE_LOADER } from "../Redux/Types/Types";
import DEV_URLS from "../URLS/DEV_URLS";
import AsyncStorage from '@react-native-async-storage/async-storage'; //latest
export const findEnviornment = () => {
    let live = ''
    let staging = '';
    let dev = DEV_URLS
    let environment = dev
    return environment
};
export const getDataFromAsync = async (key) => {
    let userId = '';
    try {
        userId = await AsyncStorage.getItem(key);
        return userId;
    } catch (error) {
       
    }
};
export const saveDataInAsync = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};
export const removeDataFromAsync = async (key) => {
    await AsyncStorage.removeItem(key);
};
export const Login = () => {
    store.dispatch({ type: TOGGLE_AUTH_LOADER, payload: false })
    store.dispatch({
        type: LOGIN_USER, payload: true
    })
}
export const Logout = async () => {
    store.dispatch({ type: TOGGLE_AUTH_LOADER, payload: false })
    store.dispatch({
        type: LOGIN_USER, payload: null
    })
    await removeDataFromAsync(Constants.ACCESS_TOKEN)
}
export const ToggleLoader = (payload) => {
    store.dispatch({ type: TOGGLE_LOADER, payload })
}
export const loadSearchedItems = async () => {
    try {
        const searchedItemsJson = await getDataFromAsync(Constants.LAST_5_SEARCHED)
        if (searchedItemsJson !== null) {
            const searchedItems = JSON.parse(searchedItemsJson);
            return searchedItems;
        }
    } catch (error) {
        console.log('Error loading searched items:', error);
    }
    return [];
};


export const saveSearchedItem = async (item) => {
    try {
        let searchedItems = await loadSearchedItems();
        searchedItems.unshift(item); // Add new item to the beginning of the list
        let uniqueChars = [];
        searchedItems.forEach((c) => {
            if (!uniqueChars.includes(c)) {
                uniqueChars.push(c);
            }
        });
        if (uniqueChars.length > 5) {
            uniqueChars = uniqueChars.slice(0, 5); // Limit the list to the latest 5 items
        }
        const searchedItemsJson = JSON.stringify(uniqueChars);
        await saveDataInAsync(Constants.LAST_5_SEARCHED, searchedItemsJson)

    } catch (error) {
        console.log('Error saving searched item:', error);
    }
};