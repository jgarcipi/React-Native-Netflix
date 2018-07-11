import React,{Component} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
// import IonIcons from 'react-native-vector-icons/Ionicons'
const {width, height} = Dimensions.get('window')

class Menu extends Component{
    _renderItemsMenu(){
        const opciones=["Home","Llenado","Manual"]
        const {itemSelectedValue} = this.props
        const {navigate} = this.props.navigation
        return opciones.map((element,key) => (
            <TouchableHighlight key={key} onPress={() => this.props.itemSelected(element)}>
                        <View style={element == itemSelectedValue ? [styles.items, styles.itemSelected]: styles.noSelectedItems}>
                                <Text style={styles.text}>{element}</Text>
                                <Icon 
                                        style={styles.rightIcon}
                                        name="battery-full"
                                        color="white"
                                        size={25}
                                    />              
                        </View>
                    </TouchableHighlight>
        ))
    }
    render(){
        const {navigate} = this.props.navigation
        console.log(this.props)
        return(
            <View style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarImage}>
                        <Image
                            style= {styles.avatar}
                            source={require('../Images/user.png')}
                        />
                        <Text style={styles.text}> mario </Text>
                    </View>
                    <Icon 
                        name="exchange"
                        color="white"
                        size={25}
                    />
                </View> 
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.textWithIcon}> 
                        <View style={styles.withIcon}>
                            <Icon 
                                style={styles.iconWithText}
                                name="download" 
                                color="white"
                                size={28}
                            />
                            <Text style={styles.text}>
                                my Downloads
                            </Text>
                        </View>
                        <Icon 
                                style={styles.rightIcon}
                                name="angle-right"
                                color="white"
                                size={25}
                            /> 
                    </View>
                    <View style={styles.textWithIcon}> 
                        <View style={styles.withIcon}>
                            <Icon 
                                style={styles.iconWithText}
                                name="check" 
                                color="white"
                                size={28}
                            />
                            <Text style={styles.text}>
                               My List
                            </Text>
                        </View>
                        <Icon 
                                style={styles.rightIcon}
                                name="angle-right"
                                color="white"
                                size={25}
                            /> 
                    </View>
                    {this._renderItemsMenu()}
                    {/* {this.renderItemsMenu()} */}
                </ScrollView>   
            </View>
        )
    }
}
const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor:"#191919"
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 2 + 59,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    avatarImage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#b3b3b3',
        fontSize: 15
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderColor: '#000',
        borderBottomWidth: 3
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scrollContainer: {
        width: width / 2 + 59
    },
    rightIcon: {
        paddingRight: 20
    },    
    iconWithText: {
        marginRight: 10,
        paddingLeft: 20
    },
    items: {
        paddingVertical: 15,
        paddingLeft: 20,
        marginTop: 5
    },
    itemSelected:{
        borderLeftWidth: 5,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noSelectedItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingLeft: 25,
        marginTop: 5
    }
})
export default Menu