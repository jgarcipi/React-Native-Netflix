import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const {width} = Dimensions.get('window')
    // componente de function que recibe props y tendra una View/ vista que guarda un imagen dentro
    const Slider = props => ( <View style={styles.container}>
        <Image style={styles.image} source={props.uri}/>
    </View>
)
const styles = {
    container: {
        flex: 0,
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width
    }
}
    //agrefamos un componente de clase
    export default class extends Component{
        // creamos un constructor en donde guardamos las images en un estado
         constructor(props){
            super(props)
            this.state={
                imagesSlider:[
                    require('../Images/1.jpg'),
                    require('../Images/2.jpg'),
                    require('../Images/3.jpg')
                ]
            }
         }
         render(){
             return(
                 <View style={{flex:1}}>
                    <Swiper style={{backgroundColor:'red'}}
                        // autoplay para cuando corra la app comience a moverse y su altura
                        autoplay={!__DEV__?true:false}
                        height={240}
                    >
                        {
                            this.state.imagesSlider.map((item, i) => <Slider 
                            // aqui le pasamos las imagenes    
                            uri={item}
                            // no olvidar la key para que no nos de warning
                            key={i}
                            />)
                        }
                    </Swiper>
                 </View>
             )
         }
    }
