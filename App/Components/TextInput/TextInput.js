import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../Theme/Colors';
import PropTypes from 'prop-types';
const TEXT_INPUT_WIDTH = Dimensions.get('window').width - responsiveWidth(10)
const TextInputComponent = ({ onPress, touchable, style, onBlur, title, onChangeText, value, keyboardType, error, secureTextEntry, placeholder }) => {
    return (
        <View style={styles.mainView} >
            {title && <Text style={styles.title}>{title}</Text>}
            <TextInput
                contextMenuHidden={touchable} // to remove paste option
                caretHidden={touchable} // to remove blinker
                showSoftInputOnFocus={touchable ? false : true} // hides keyboard
                onTouchEnd={() => {
                    // to Touch
                    if (touchable) {
                        onPress()
                    }
                }}
                onBlur={onBlur}
                placeholder={placeholder}
                style={[styles.textInput, style]}
                onChangeText={e => onChangeText(e)}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />           
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}
TextInputComponent.propTypes = {
    title: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    keyboardType: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    style: PropTypes.object,
    touchable: PropTypes.bool,
    onPress: PropTypes.func,
    dropdown:PropTypes.bool
}
export default TextInputComponent

const styles = StyleSheet.create({
    mainView: {
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginVertical: responsiveHeight(1),
    },
    title: {
        fontSize: 12,
        color: Colors.textColor,
    },
    textInput: {
        width: TEXT_INPUT_WIDTH,
        height: responsiveHeight(5),
        borderRadius: 8,
        padding: 0,
        margin: 0,
        marginTop: responsiveHeight(1),
        borderWidth: 1,
        borderColor: Colors.textColor,
        paddingLeft: responsiveWidth(2)
    },
    error: {
        backgroundColor: Colors.errorColor
    }
})