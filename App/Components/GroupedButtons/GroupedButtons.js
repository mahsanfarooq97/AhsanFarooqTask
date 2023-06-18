import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Colors from '../../Theme/Colors'
import PropTypes from 'prop-types';
const GroupedButtons = ({ list, onPress }) => {
    return (
        <View >
            <FlatList
                data={list}
                horizontal
                contentContainerStyle={styles.contentContainer}
                keyExtractor={item => item?.name}
                renderItem={({ item, index }) =>
                    <TouchableOpacity key={item?._id} onPress={() => onPress(item)} style={[styles.Button, { opacity: item?.checked ? 1 : 0.8 }]} >
                        <Text style={styles.text} >{item?.name}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

GroupedButtons.propTypes = {
    list: PropTypes.array,
    onPress: PropTypes.func,
}
export default GroupedButtons

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1, justifyContent: 'space-evenly', marginTop: responsiveHeight(1),
    },
    Button: {
        width: responsiveWidth(45),
        height: responsiveHeight(5),
        borderRadius: 8,
        backgroundColor: Colors.dark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: Colors.light,
        fontWeight: 'bold',
    }
})