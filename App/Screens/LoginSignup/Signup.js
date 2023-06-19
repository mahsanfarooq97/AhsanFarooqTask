import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputComponent from '../../Components/TextInput/TextInput'
import Button from '../../Components/Button/Button'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { RegisterUser } from '../../Redux/Action/GenericAction'
import { useDispatch } from 'react-redux'
const SignUp = () => {
    const dispatch = useDispatch()
    const [username, setUserName] = useState(null)
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
                email: username?.replace(/\s/g, ''),
                password:password?.replace(/\s/g, '')
            }
            dispatch(RegisterUser(body))
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
                title='SignUp'
                onPress={validation}
            />
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    button:{
        marginTop:responsiveHeight(10)
    },
})