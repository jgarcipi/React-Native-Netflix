import React,{Component} from 'react';
import {
Text,
Image,
Dimensions,
FlatList,
StyleSheet,
ScrollView,
TextInput,
TouchableWithoutFeedback,
View
}from 'react-native'
import {getAll} from '../api/api'

const {width,height}= Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome'
class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            data:''
        }
    }
    filter(text){
        const data= getAll()
        //variable new data usando filter para recorrer el array
        const newData=data.filter(function(item){
        //por cada item que hayga lo convertimos a mayuscula
        const itemData = item.name.toUpperCase()
        //y convertimos el texto que venga del imput a mayuscula
        const textData = text.toUpperCase()
        //si encuentra dentro de itemdata que es cada uno de los elemtos el  texto q ingresamos
        //lo guardamos en el estado
        return itemData.indexOf(textData)> -1
        })
        this.setState({
            data:newData,
            text: text,
        })
    }

    DeleteData(){
       this.setState({text:'',data:''}) 
    }

    _renderitem(item){
        const{navigate} = this.props.navigation
        return(
            <TouchableWithoutFeedback onPress={() => navigate('Details',{item:item})}>
                <Image style={styles.image}source={{uri:item.image}}/>
            </TouchableWithoutFeedback>
        )
    }
    static navigationOptions={
        header:null,
        }
    render(){
        const {goBack} = this.props.navigation
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon 
                        name="search"
                        color="grey"
                        size={18}
                        style={styles.searchIcon}                        
                    />
                    {/* capturasmos el texto con el evento onChangeText y lo pasamos a fiter */}
                    <TextInput 
                        value={this.state.text}
                        onChangeText={(text)=>this.filter(text)}
                        style={styles.input}
                        placeholder="Seacrh"
                        placeholderTextColor="grey"
                        keyboardAppearance="dark"
                        autoFocus={true}
                    />
                    {/* si hay texto pasamos el boton para tener la posibilidad de eliminarlo si no 
                    no le passmos nada */}
                    {this.state.text?
                    <TouchableWithoutFeedback onPress={() => this.DeleteData()}>
                        <Icon
                            name="times-circle"
                            color="grey"
                            size={18}
                            style={styles.iconInputClose}
                        />
                    </TouchableWithoutFeedback>
                    : null}
                    <TouchableWithoutFeedback style={styles.cancelButton} onPress={()=> goBack()}>
                        <View>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <ScrollView>
                        <FlatList 
                            //para que los margenes horizontales no queden pegados
                            style={{marginHorizontal: 5}}
                            //le pasamos data para hacer la busqueda
                            data={this.state.data}
                            //agrupar en columnas de tres
                            numColumns={3}
                            //separar las images
                            columnWrapperStyle={{marginTop: 5, marginLeft: 5}}
                            //aca recorremos los item mendiante la funcion renderitems
                            //que nos traeran images
                            renderItem={({item})=> this._renderitem(item)}
                        />
                   </ScrollView>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#181818'
    },
    header:{
        alignItems: 'center',
        borderColor: '#3a3a3a',
        height:40,
        borderBottomWidth: 1,
        position: 'relative',
        backgroundColor:'#181818',
        flexDirection: 'row',
        marginTop: 20,
        paddingBottom: 5,
    },
    input:{
        width: width - (width / 4),
        height: 30,
        backgroundColor: '#323232',
        marginHorizontal: 10,
        paddingLeft: 30,
        borderRadius: 3,
        color: 'grey'
    },
    iconInputClose:{
        position:'absolute',
        top:5,
        right:90,
        backgroundColor:'transparent',
        zIndex: 1

    },
    cancelButtonText:{
        color:'white'
    },
    searchIcon: {
        position: 'absolute',
        top: 5,
        left: 15,
        zIndex: 1,
        backgroundColor:'transparent'
    },
    image: {
        marginRight: 5,
        width: 115,
        height: 170
    }

})
export default Search