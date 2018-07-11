import React,{Component} from 'react'
import{
Text,
View,
StyleSheet
}from 'react-native'
// para poder visualizar el video
import VideoPlayer from 'react-native-video-controls'
//para permitirnos que veamos el video en toda la pantalla bien vertical o orizontal
import Orientation from 'react-native-orientation'

class VideoPlayerView extends Component{

    static navigationOptions={
        header:null,
    }
    componentWillMount(){
        //para verlo en orizontal
        Orientation.lockToLandscapeRight();
    }
    _back(){
        const {goBack} = this.props.navigation
        Orientation.lockToPortrait()
        goBack()
    }
    render(){
        return(
            <View style={styles.container}>
                <VideoPlayer 
                    source={require('../video/video.mp4')}
                    title={this.props.title}
                    onBack={() => this._back()}
                />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1
    }
})
export default VideoPlayerView