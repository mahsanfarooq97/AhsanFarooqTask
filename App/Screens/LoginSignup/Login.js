import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputComponent from '../../Components/TextInput/TextInput'
import Button from '../../Components/Button/Button'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { useDispatch } from 'react-redux'
import { SignIn } from '../../Redux/Action/GenericAction'
const Login = () => {
    const dispatch = useDispatch()
    const [username, setUserName] = React.useState(null)
    const [password, setPassword] = useState(null)
    const validation = () => {
        let check = true
        if (!username) {
            check = false
            Alert.alert('Username is required')
        }
        if (!password) {
            check = false
            Alert.alert('Password is required')
        }
        if (check) {
            let body = {
                email: username,
                password
            }
            dispatch(SignIn(body))
        }
    }
    return (
        <View>
            <TextInputComponent
                placeholder={'Email'}
                title={'Username'}
                onChangeText={setUserName}
                value={username}
                onBlur={()=>setUserName(prev=>prev?.toLowerCase())}
            />
            <TextInputComponent
                placeholder={'******'}
                title={'Password'}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <Button
                style={styles.button}
                title='Login'
                onPress={validation}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    button: {
        marginTop: responsiveHeight(10)
    },
})