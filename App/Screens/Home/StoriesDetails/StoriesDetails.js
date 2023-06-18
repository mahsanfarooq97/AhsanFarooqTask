import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import moment from 'moment'
import FastImage from 'react-native-fast-image';
const StoriesDetails = ({ route }) => {
    const [data] = useState(route?.params?.item)
    return (
        <SafeAreaView style={styles.conatiner} >
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data?.multimedia}
                    keyExtractor={item => item?.url}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.ImageView} >
                                <FastImage
                                    style={styles.Image}
                                    source={{
                                        uri: item?.url,
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        )
                    }}
                />
            </View>
            <View style={styles.titleView} >
                <Text style={styles.title} >{data?.title}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'abstract : '}</Text>{data?.abstract}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'byline : '}</Text>{data?.byline}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'Sub Section : '}</Text>{data?.subsection}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'section : '}</Text>{data?.section}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'updated_date : '}</Text>{moment(data?.updated_date).format('DD MMMM YYYY')}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'published_date : '}</Text>{moment(data?.published_date).format('DD MMMM YYYY')}</Text>
                <Text style={styles.subSection} > <Text style={{ fontWeight: 'bold' }} >{'created_date : '}</Text>{moment(data?.created_date).format('DD MMMM YYYY')}</Text>
            </View>
        </SafeAreaView>
    )
}

export default StoriesDetails

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    },
    titleView: {
        marginTop: responsiveHeight(2),
        width: '90%',
        alignSelf: 'center'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    subSection: {
        marginTop: responsiveHeight(2),
        fontSize: 13
    },
    ImageView: {
        marginRight: responsiveHeight(1),
        width: responsiveWidth(100),
        height: responsiveHeight(20),
    },
    Image: {
        width: '100%',
        height: '100%'
    }
})