
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight ,
    Share,
    StyleSheet,
    Animated,
} from 'react-native'
//importamos Icon desde la libreria instalada
import Icon from 'react-native-vector-icons/FontAwesome'
import {replaceHttps, getYear, removeHtmlTags} from '../lib' 
import IonIcons from 'react-native-vector-icons/Ionicons'
//componente usado para titulo
import TextGradient from 'react-native-linear-gradient'
import TabsEpisodes from './TabsEpisodes';
import Orientation from 'react-native-orientation'
const {width, height} = Dimensions.get('window')
class Details extends Component {
    constructor(props){
        super(props)
        this.state = {
            measuresTitle: 0,
            measuresSeason: 0,
            scrollY: new Animated.Value(0),
            currentSeason: 1
        }
    }

    // ocualtando la flecha de back de navigatopr
    static navigationOptions={
        header:null,
    }
    //para obligar a los distpositivos que cuando esta en los detalles estea en forma vettial
    componentWillMount() {
        Orientation.lockToPortrait()
    }
     
    onShare(){
        //Esto es lo que se envia cuando le damos click en ele button
        Share.share({
            title: 'Designate Survivor',
            url: 'www.youtube.com',
            message: 'Awesome tv Show' 
        }),{
            //el titulo que mostramos cuando se habra el pop-pup en Android
            dialogTitle: 'share this awesome content',
            //el titulo que mostramos cuando se habra el pop-pup en ios//
            //nos permite excluir que los usuarios compartan esto con twitter lo que en android no s epuede
            excludeActivityTypes:[
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        }
    }
    getSeason(season){
        this.setState({
            currentSeason: season
        })
    }
    renderThumbnail(){
    const {params} = this.props.navigation.state
    const {episodes} = this.props.navigation.state.params.item.details
    const localImagePath = require('../Images/default-image.png');
    return episodes[0].image ? {uri : replaceHttps(episodes[0].image.original) } : localImagePath
    }
  render(){
    console.log(this.props.navigation)
    const headerNameToggle = this.state.scrollY.interpolate({
        inputRange : [this.state.measuresTitle, this.state.measuresTitle + 1],
        outputRange: [0, 1]
    })
    const headerSeasonHide = this.state.scrollY.interpolate({
        inputRange: [
            this.state.measuresSeason - 1, 
            this.state.measuresSeason,
            this.state.measuresSeason + 1
        ],
        outputRange: [-width, 0, 0]
    })
    const headerSeasonToggle = this.state.scrollY.interpolate({
        inputRange: [this.state.measuresSeason, this.state.measuresSeason +1],
        outputRange: [0, 1]
    })
    //   console para poder saber lo que pasa el props
    // console.log(this.props.navigation)
    const {goBack} = this.props.navigation
    const {params} = this.props.navigation.state
    const {episodes} = params.item.details
    const {navigate} = this.props.navigation
    const {name} = params.item
    //Esto lo sacamos el json que tenemos
    const {thumbnail,cast, description, year, creator, numOfEpisodes, season} = params.item.details
      return(
        <View style={{flex: 1}}>
            <TouchableHighlight
                style={styles.closeButton}
                onPress={()=> goBack()}
            >
                <Icon 
                    name="close"
                    color="white"
                    size={18}
                />
            </TouchableHighlight > 
            {/* etiqueta view especial para animar */}
            {/* queda arriva del scroll por que cuando bajaemos el scrll esto siemproe se queda arriba */}
            <Animated.View style={[styles.header, {opacity: headerNameToggle}]}>
                <Text style={styles.headerText}>{name}</Text>
            </Animated.View>
            <Animated.ScrollView 
            scrollEventThrottle={1}
                onScroll={
                    Animated.event(
                        [{nativeEvent: {contentOffset: {y:this.state.scrollY}}}],
                        {useNativeDriver: true}
                    )
                }
                style={styles.container}>
                <ImageBackground 
                    style={styles.thumbnail}
                    source={this.renderThumbnail()}
                >
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback 
                            onPress={() => navigate('Video', {name: name})}
                        >
                            {/* ojo que para pasar cualquier campo dentro de un touchablewithfeedback tenemos que colocar una view */}
                            <View>
                                <Icon
                                    style={styles.iconPlay}
                                    name="play-circle"
                                    size={90}
                                    color="white"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.nameContainer}
                        onLayout={({nativeEvent}) =>{
                            this.setState({
                                measuresTitle: nativeEvent.layout.y
                            })
                        }}
                    >
                        <TextGradient colors={['transparent','#181818','#181818']}>
                            <Text style={[styles.text, styles.subTitleShow]}>
                            {name}
                            </Text>
                        </TextGradient>
                    </View>
                </ImageBackground>
                <View style={styles.descriptionContainer}>
                    <View style={styles.subTitle}>
                        <Text style={[styles.text, styles.subTitleText]}>{year}</Text>
                        <Text style={[styles.text, styles.subTitleText]}>{numOfEpisodes}</Text>
                        <Text style={[styles.text, styles.subTitleText]}>{season} Season</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{description}</Text>
                    </View>
                    <Text style={styles.text}>{cast} -> CAST</Text>
                    <Text style={styles.text}>{creator} -> CREATOR</Text>
                    <View style={styles.shareListIcons}>
                        <View style={styles.myListIcon}>
                            <IonIcons 
                                style={styles.lisIcon}
                                name="md-checkmark"
                                color="grey"
                                size={25}
                            />
                            <Text style={styles.text}>My List</Text>
                        </View>
                        {/* button y dentro de el el icono de share */}
                        <TouchableWithoutFeedback onPress={this.onShare}>
                            <View style={styles.myShareIcon} >
                                <IonIcons 
                                    style={styles.shareIcon}
                                    name="md-share"
                                    color="grey"
                                    size={25}
                                    />
                                <Text style={styles.text}>Share</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View onLayout={({nativeEvent})=>{
                    this.setState({
                        measuresSeason: nativeEvent.layout.y +10
                    })
                }}>
                    <TabsEpisodes
                        seasons={season}
                        getSeason={this.getSeason.bind(this)}
                        navigation={this.props.navigation} 
                        data={episodes} 
                        currentSeason={this.state.currentSeason}
                    />
                </View>
            </Animated.ScrollView >
        </View>
      )
  }
}
const styles=StyleSheet.create({
    nameContainer:{
      backgroundColor:'transparent'  
    },
    subTitleShow:{
        fontSize:35,
        paddingLeft: 10,
    },
    container:{
        flex:1,
        backgroundColor: '#181818'
    },
    closeButton:{
        position:'absolute',
        top: 15,
        right: 10,
        zIndex: 2
    },
    thumbnail:{
        width: width,
        height: 300,
    },
    buttonPlay:{
        flex:1,
        //justificontent lo coloco a la mitad del contenedor en donde se encuentra
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#181818',
        paddingVertical: 10,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    headerText: {
        color: 'white',
        fontSize: 20
    },
    iconPlay:{
        //para hacerlo transparente
        opacity:0.7,
        backgroundColor: 'transparent' 
    },
    descriptionContainer:{
        paddingHorizontal: 20,

    },
    subTitle:{
        flexDirection: 'row',
    },
    subTitleText:{
        marginRight: 5,
    },
    text:{
        color:'#b3b3b3',
        fontSize: 16,
    },
    description:{
        marginVertical:10
    },
    shareListIcons:{
        flexDirection:'row',
        marginVertical: 30
    },
    myListIcon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        marginRight: 40,
    },
    myShareIcon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    lisIcon:{
        height: 25
    },
    shareIcon:{
        height: 25        
    },
    light: {
        fontWeight: '200'
    }
})
export default Details

