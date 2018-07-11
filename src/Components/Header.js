import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
    const Header = props => {
    const {navigate} = props.navigation
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.toggle()}>
                    <Icon
                        name="bars"
                        color="white"
                        size={25}
                    />
                </TouchableWithoutFeedback>
                <Image style={styles.logo} source={require('../Images/Netflix-logo.png')} />
                <TouchableWithoutFeedback onPress={() => navigate('Search')}>
                    <Icon
                        name="search"
                        color="white"
                        size={25}
                    />
                </TouchableWithoutFeedback> 
            </View>
        ) 
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'black',
        height:60,
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        
    },
    logo:{
        width:120,
        height: 40
    }
})
export default Header