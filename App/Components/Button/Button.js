import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import Colors from '../../Theme/Colors'
import PropTypes from 'prop-types';
const Button = ({ onPress, disabled=false, title,style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.buttonView,style]} >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}
Button.propTypes = {
    onPress: PropTypes.func,
    disabled:PropTypes.bool,
    title:PropTypes.string.isRequired
  }
export default Button

const styles = StyleSheet.create({
    buttonView: {
        width: '90%',
        height: responsiveHeight(5),
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: Colors.dark,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:5,
        shadowOffset: {width: -2,height:4},  
        shadowColor: Colors.overlayBlue,  
        shadowOpacity: 0.8,  
        shadowRadius: 5,  
    },
    title: {
        fontSize: 15,
        color: Colors.light,
    },
})