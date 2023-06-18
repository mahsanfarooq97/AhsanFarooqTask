import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroupedButtons from '../../Components/GroupedButtons/GroupedButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getTopStories } from '../../Redux/Action/GenericAction';
import Colors from '../../Theme/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import moment from 'moment';
import TextInputComponent from '../../Components/TextInput/TextInput';


const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const top_stories = useSelector(state => state?.GenericReducer?.top_stories)
    const [categoryButtons, setCategoryButtons] = useState([{ name: 'World', checked: false }, { name: 'Science', checked: false }])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const onButtonPress = (item) => {
        setSelectedCategory(item?.name)
        let dup = [...categoryButtons];
        dup.forEach(element => {
            if (element?.name === item?.name) {
                element.checked = true
            }
            else {
                element.checked = false
            }
        });
        setCategoryButtons(dup)
    }
    useEffect(() => {
        if (selectedCategory) {
            let lowered = selectedCategory?.toLowerCase()
            dispatch(getTopStories(lowered))
        }
    }, [selectedCategory])
    return (
        <SafeAreaView style={styles.container} >
            <TextInputComponent
                placeholder={'Search Articles'}
                touchable
                onPress={() => {
                    navigation.navigate('ArticleSearch')
                }}
            />
            <GroupedButtons
                list={categoryButtons}
                onPress={onButtonPress}
            />
            <View>
                <FlatList
                    style={{ marginTop: responsiveHeight(2) }}
                    data={top_stories}
                    keyExtractor={item => item?.title}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => {
                            console.log('item',item)
                            navigation.navigate('StoriesDetails', {
                                item
                            })
                        }} style={styles.Touchable} key={item?.title} >
                            <Text style={styles.section} >{item?.section}</Text>
                            <Text style={styles.title} >{item?.title}</Text>
                            <Text style={styles.title} >{moment(item?.created_date).format('DD MMMM YYYY')}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>

        </SafeAreaView>
    )
}

export default Home

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

    }
})