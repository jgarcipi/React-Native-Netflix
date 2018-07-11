import React,{Component} from 'react';
import {
View,
StyleSheet,
Platform
}from 'react-native'
import {TabViewAnimated, TabViewPagerScroll, TabViewPagerPan,TabBar} from 'react-native-tab-view'
import Episodes from './Episodes'
import Trailers from './Trailers'

class TabsEpisodes extends Component{
    
    constructor(props){
        super(props)
        this.state={
            //controlar que pestaña se esta mostrando en cada momento
            index: 0,
            //array con objetos que seran las tab q usaremos
            routes:[
                {key:'1', title:'Episodes'},
                {key:'2', title:'trailers & More'}
            ]
        }
    }
    
    //recibe index para saber donde se encuentra
    _handleChangeTab(index){
        this.setState({index})
    }
    _renderHeader(props){
        return <TabBar {...props} />
    }
    //mediante props le pasamos al componente importado TAPBAR
    //me sirve para poder mostrarlos tanto en ios como en android por que los componentes nativos de react solo lo muestran en ios
    _renderPager = (props) => {
        return (Platform.OS === 'ios') ? <TabViewPagerScroll {...props} /> : <TabViewPagerPan {...props}/>
    }
    //controlamos cuando se activa una que ocurrida y que ejecutara
    _renderScene = ({route})=>{
        switch (route.key) {
            case '1':
                return <Episodes
                    seasons={this.props.seasons}
                    getSeason={this.props.getSeason}
                    navigation={this.props.navigation} 
                    currentSeason={this.props.currentSeason}
                    episodes={this.props.data} 
                    
                    />
            case '2':
                return (<Trailers />);
            default:
                return null
        }
    }
    render(){
        console.log(this.props)
        return(
            <TabViewAnimated style={styles.container}
                // Estado de navegacion
                navigationState={this.state}
                //ejecuta una funcion
                renderScene={this._renderScene.bind(this)}
                //ejecuta la funcion renderHeader
                renderHeader={this._renderHeader}
                //funcion para cambiar entre casa una de las pestañas
                onIndexChange={this._handleChangeTab.bind(this)}
                renderPager={this._renderPager}
                animationEnabled={false}
            />
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex: 1,
    },
});
export default TabsEpisodes