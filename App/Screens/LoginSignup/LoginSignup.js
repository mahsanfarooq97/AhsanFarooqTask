import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Theme/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './Login';
import SignUp from './Signup';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const ScrollableTabView = createMaterialTopTabNavigator();
const LoginSignup = () => {
    return (
        <SafeAreaView style={styles.container} >
                <ScrollableTabView.Navigator
                    screenOptions={{
                        swipeEnabled: false,
                        tabBarStyle: {
                            ...styles.tabStyle,
                        },
                        tabBarLabelStyle: {
                            alignSelf: 'center',
                            fontSize: 12,
                        },
                        tabBarActiveTintColor: Colors.dark,
                        tabBarInactiveTintColor: Colors.overlayBlue,
                        tabBarIndicatorStyle: {
                            ...styles.tabIndicator,
                        },
                    }}>
                    <ScrollableTabView.Screen
                        name="Login"
                        options={{
                            tabBarLabel: 'Login'
                        }}
                        component={Login}
                    />
                    <ScrollableTabView.Screen
                        name="Signup"
                        options={{
                            tabBarLabel: 'Signup'
                        }}
                        component={SignUp}
                    />
                </ScrollableTabView.Navigator>
        </SafeAreaView>
    )
}

export default LoginSignup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    tabStyle: {
        backgroundColor: Colors.backgroundColor,
        elevation: 1,
        borderBottomColor: Colors.dark,
        borderBottomWidth: 1,
        height: 40,
    },
    tabIndicator: {
        backgroundColor: Colors.dark,
        height: 3,
        borderRadius: 8,
    },
})