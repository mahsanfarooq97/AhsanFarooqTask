import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignup from '../Screens/LoginSignup/LoginSignup';
import { Provider, useSelector } from 'react-redux';
import { store } from '../Redux/Store/Store';
import Loader from '../Components/Loader/Loader';
import { Login, Logout, getDataFromAsync, retrieveFromSecureVallet } from '../Utils/utils';
import Constants from '../Constants/Constants';
import Home from '../Screens/Home/Home';
import Splash from '../Screens/Splash/Splash';
import Colors from '../Theme/Colors';
import ArticleSearch from '../Screens/ArticleSearch/ArticleSearch';
import StoriesDetails from '../Screens/Home/StoriesDetails/StoriesDetails';
import ArticleDetails from '../Screens/ArticleSearch/ArticleDetails/ArticleDetails';
const Stack = createNativeStackNavigator();

const MainRouter = () => {
    const authenticated_user = useSelector(state => state?.GenericReducer?.authenticated_user)
    const authLoader = useSelector(state => state?.GenericReducer?.authLoader)
    if (authLoader) {
        return <Splash />;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    authenticated_user ?
                        (
                            <>
                                <Stack.Screen options={{
                                    headerTitle: () => <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }} >{'Top Stories'}</Text>,
                                    headerRight: () => (
                                        <Button
                                            onPress={() => Logout()}
                                            title="Logout"
                                            color={Colors.dark}
                                        />
                                    ),
                                }} name='Home' component={Home} />
                                <Stack.Screen name='StoriesDetails' component={StoriesDetails} />
                                <Stack.Screen name='ArticleSearch' component={ArticleSearch} />
                                <Stack.Screen name='ArticleDetails' component={ArticleDetails} />
                            </>
                        )
                        :
                        <Stack.Screen name='LoginSignup' component={LoginSignup} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const Router = () => {
    const checkIfUserLoggedin = async () => {
        let isUserLoggedIn = await retrieveFromSecureVallet(Constants.ACCESS_TOKEN);
        
        if (
            isUserLoggedIn !== null &&
            isUserLoggedIn !== undefined &&
            isUserLoggedIn !== ''
        ) {
            Login()
        } else {
            Logout()
        }
    };
    useEffect(() => {
        checkIfUserLoggedin()
    }, [])
    return (
        <Provider store={store} >
            <Loader />
            <MainRouter />
        </Provider>
    )
}

export default Router

const styles = StyleSheet.create({})