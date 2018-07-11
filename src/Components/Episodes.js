import React,{Component} from 'react';
import{
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableWithoutFeedback
}from 'react-native'
import {replaceHttps, removeHtmlTags} from '../lib' 
import Icon from 'react-native-vector-icons/FontAwesome'
class Episodes extends Component{
    getThumbnail(item){

        const localImagePath = require('../Images/1.jpg')
        return item.image ? {uri: replaceHttps(item.image.original)} : localImagePath
    }
    renderEpisodes(){
        const {currentSeason} = this.props
            return this.props.episodes.filter(function(element){
            return element.season == currentSeason
        }).map((item, i) => {
            const img = this.getThumbnail(item)
            return(
                <View style={styles.video} key={i}>
                    <View style={styles.videoEpisode}>
                        <ImageBackground style={styles.image} source={img}>
                            <View style={styles.buttonPlay}>
                                <TouchableWithoutFeedback style={styles.buttonPlay} style={{backgroundColor: 'transparent'}}>
                                    <View style={{backgroundColor: 'transparent'}}>
                                        <Icon 
                                            style={styles.iconPlay}
                                            name="play-circle"
                                            size={30}
                                            color="white"
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </ImageBackground>
                        <View style={styles.episodeName}>
                            <Text style={styles.text}>{item.number}. {item.name}</Text>
                            <Text style={styles.text}>{item.runtime}</Text>
                        </View>
                    </View>
                    <Text style={styles.sumary}>{removeHtmlTags(item.summary)}</Text>
                </View>
            )
        })
    }
    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={styles.container}>
                <View style={styles.renderEpisodes}>
                    {this.renderEpisodes()}
                </View>
            </View>

        )
    }
}
const styles= StyleSheet.create({
    container:{
        marginHorizontal: 10,
    },
    image: {
        width: 150,
        height: 80,
        marginRight: 10,
    },
    buttonPlay: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    videoEpisode: {
        flexDirection: 'row'
    },
    renderEpisodes:{
        marginTop: 10,
    },
    text: {
        color: 'white'
    },
    sumary: {
        color: 'grey',
        marginVertical: 10
    },
    episodeName:{
        justifyContent:'center'
    }
})
export default Episodes