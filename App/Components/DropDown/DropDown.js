import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../Theme/Colors';
import PropTypes from 'prop-types';
import { loadSearchedItems } from '../../Utils/utils';
const TEXT_INPUT_WIDTH = Dimensions.get('window').width - responsiveWidth(10)
const DROPDOWN_WIDTH = TEXT_INPUT_WIDTH - responsiveWidth(5)
const DropDownComponent = ({ autoFocus,onPress, style, onBlur, title, keyboardType, error, secureTextEntry, placeholder }) => {
    const [searchedItems, SetSearchedItems] = useState([])
    const [open, setOpen] = useState(null)
    const [value, onChangeText] = useState(null)
    const onFocus = () => {
        setOpen(true);
    }
    useEffect(() => {
        loadSearchedList()
    }, [])
    const loadSearchedList = async () => {
        let data = await loadSearchedItems()
        SetSearchedItems(data)
    }
    const onSelect = (item) => {
        setOpen(null)
        onChangeText(item)
        onPress(item)
    }
    return (
        <View style={styles.mainView} >
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.textInputView} >
                <TextInput
                autoFocus={autoFocus}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    style={[styles.textInput, style]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    returnKeyType={'search'}
                />
                <TouchableOpacity disabled={!value} onPress={() => onPress(value)} style={styles.SearchButton} >
                    <Text style={styles.goText} >{'Search'}</Text>
                </TouchableOpacity>
            </View>
            {
                open && searchedItems?.length > 0 &&
                <View style={styles.searchBoxContainer}>
                    {
                        searchedItems.map((item) => {
                            return <TouchableOpacity key={item} onPress={() => onSelect(item)} style={styles.DropDownTextView} >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        })
                    }
                </View>
            }
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}
DropDownComponent.propTypes = {
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
    dropdown: PropTypes.bool
}
export default DropDownComponent

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
    },
    mainView: {
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginVertical: responsiveHeight(1),
        backgroundColor:'rgba(0,0,0,0)',
        zIndex:100,
        position:'absolute'
    },
    title: {
        fontSize: 12,
        color: Colors.textColor,
        marginVertical  :responsiveHeight(1),
    },
    textInputView: {
        paddingHorizontal: responsiveWidth(1),
        flexDirection: 'row',
        width: TEXT_INPUT_WIDTH,
        height: responsiveHeight(5),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.textColor,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:Colors.backgroundColor
    },
    textInput: {
        width: '80%',
        padding: 0,
        margin: 0,
        paddingLeft: responsiveWidth(2),
    },
    error: {
        backgroundColor: Colors.errorColor
    },
    searchBoxContainer: {
        minHeight: 20,
        width: DROPDOWN_WIDTH,
        paddingVertical: 5,
        backgroundColor: Colors.backgroundColor,
        marginHorizontal: 7,
        // marginTop: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 5,
        shadowOffset: { width: -2, height: 2 },
        shadowColor: Colors.overlayBlue,
        shadowOpacity: 0.3,
        shadowRadius: 5,


        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        // borderColor: Colors.overlayBlue,
        borderColor: Colors.lightgrey,
        elevation: 5,
        maxHeight: 250,
        overflow: 'scroll',
        alignSelf: 'center',
        zIndex:10
    },
    DropDownTextView: {
        width: '90%',
        height: responsiveHeight(5),
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightgrey,
        justifyContent: 'center'
    },
    SearchButton: {
        width: '15%',
        height: responsiveHeight(4),
        borderRadius: 8,
        backgroundColor: Colors.dark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goText: {
        color: Colors.light,
        fontSize: 12
    }
})