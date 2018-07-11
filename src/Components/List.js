import React, {Component} from 'react'
import {
    Image,
    FlatList,
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native'
//orientation para asegurarnos que la partalla este vertiacal o horizontal
import Orientation from 'react-native-orientation'
import {getTwoItems} from '../api/api'

class List extends Component{
    componentWillMount() {
        Orientation.lockToPortrait()
    }

    _renderitem(item){
        const {navigate} = this.props.navigation
        return(
            <TouchableWithoutFeedback onPress={() => navigate('Details',{item:item})}>
                <Image style={{width: 120, height: 180}} source={{uri: item.image}}/>
            </TouchableWithoutFeedback>
        )
    }
    _keyExtractor = (item, index) => item.key;
    render(){
        return(
            <View style={{flex: 1}}>
                <View>
                    <Text style= {styles.Text}> My List First</Text>
                        <FlatList
                            // para aliniarlos horizontalmente ya que por defecto ko hace vertical
                            horizontal
                            // aca le pasamos un props que nos ofrece FlatList con ItemSeparatorComponent con un tamaño de 5 para separar las imagenes
                            // con esto ni al principio o final de las imagenes hay espacio
                            ItemSeparatorComponent={() => <View style={{width:5 }} />}
                            // creamos un metodo renderItten con una funcion a la cual pasaremos el parametro item para tener todo mas ordenado
                            // este metodo jala los elementos de un array defino con anterioridad para el ejemplo
                            renderItem={({item})=> this._renderitem(item)}      
                            // usamos data para psarle un array de objetos const show_first =[...]
                            // data={getTwoRows()[0]} 
                            data={getTwoItems[0]}
                            keyExtractor = {item => String(item.key)}  
                        />
                </View>
                <View>
                    <Text style= {styles.Text}> Top picks for you</Text>
                        <FlatList
                            //aca hacemos lo mismo pero con la lista numero 2
                            horizontal
                            ItemSeparatorComponent={() => <View style={{width:5 }} />}
                            renderItem={({item})=> this._renderitem(item)}
                            // data={getTwoRows()[1]}
                            data={getTwoItems[1]}
                            keyExtractor = {item => String(item.key)} 
                        />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Text:{
        color:'white'
    }
})
export default List