import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import DropDownComponent from '../../Components/DropDown/DropDown'

import Constants from '../../Constants/Constants'
import { ToggleLoader, saveSearchedItem } from '../../Utils/utils'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../Theme/Colors'
import { getSearchedArticles } from '../../Redux/Action/GenericAction'

const ArticleSearch = ({ navigation }) => {
    const dispatch = useDispatch();
    const [searched, setSearched] = useState(null)
    const list = useSelector(state => state?.GenericReducer?.articleSearch?.list)
    const loader = useSelector(state => state?.GenericReducer?.loader)
    const loadingmore = useSelector(state => state?.GenericReducer?.articleSearch?.loadingmore)
    const lastpost = useSelector(state => state?.GenericReducer?.articleSearch?.lastpost)
    const page = useSelector(state => state?.GenericReducer?.articleSearch?.page)
    const onSearch = async (item) => {
        await saveSearchedItem(item)
        setSearched(item)
    }
    const onEndReachFunc = () => {
        if (!lastpost && !loadingmore && !loader) {
            dispatch(getSearchedArticles(searched, page));
        }
    };
    useEffect(() => {
        if (searched) {
            dispatch(getSearchedArticles(searched));
        }
    }, [searched])
    return (
        <SafeAreaView style={styles.container} >
            <DropDownComponent
                autoFocus={false}
                placeholder={'Search'}
                onPress={(item) => onSearch(item)}
            />
            {
                list?.length === 0 ?
                    <View style={styles.notFoundView} >
                        <Text style={styles.notFound} >{'Not Found'}</Text>
                    </View>
                    :
                    <FlatList
                        onEndReachedThreshold={0.5}
                        scrollEventThrottle={150}
                        onEndReached={onEndReachFunc}
                        ListFooterComponent={() => {
                            return (
                                <View
                                    style={{
                                        marginTop: responsiveHeight(1),
                                        height: responsiveHeight(10),
                                    }}>
                                    {!lastpost && loadingmore && !loader && (
                                        <ActivityIndicator size={'small'} color={Colors.dark} />
                                    )}
                                </View>
                            );
                        }}
                        style={{ marginTop: responsiveHeight(6) }}
                        data={list}
                        keyExtractor={item => item?._id}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => {
                                console.log('item here', item)
                                navigation?.navigate('ArticleDetails', {
                                    item
                                })
                            }} style={styles.Touchable} key={item?._id} >
                                <Text style={styles.section} >{item?.abstract}</Text>
                            </TouchableOpacity>
                        }
                    />

            }


        </SafeAreaView>

    )
}

export default ArticleSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        fontSize: 12,
        color: Colors.dark,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 12,
        color: Colors.dark
    },
    Touchable: {
        minHeight: responsiveHeight(8),
        marginTop: responsiveHeight(2),
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        elevation: 5,
        shadowOffset: { width: -2, height: 2 },
        shadowColor: Colors.overlayBlue,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius: 8,
        backgroundColor: Colors.light

    },
    notFoundView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.dark
    }
})