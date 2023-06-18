import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native'
import React from 'react'
import Colors from '../../Theme/Colors'
import { useSelector } from 'react-redux'

const Loader = () => {
    const loader = useSelector(state => state?.GenericReducer?.loader)
    return (
        loader ?
            <Modal
                statusBarTranslucent={true}
                onTouchCancel={true}
                hasBackdrop={false}
                supportedOrientations={['portrait', 'landscape']}
                animationInTiming={500}
                animationOutTiming={500}
                backdropOpacity={0.1}
                transparent={true}
                animationType="fade"
                visible={true}
            >
                <View
                    style={styles.loader}>
                    <ActivityIndicator size='large' color={Colors.black} />
                </View>
            </Modal>
            : ''
    )
}

export default Loader

const styles = StyleSheet.create({
    loader: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.overlayBlue,
    }
})