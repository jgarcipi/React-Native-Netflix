import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

import SideMenu from 'react-native-side-menu';
import List from './Components/List'
import Slider from './Components/Slider'
import Header  from './Components/Header';
import Menu  from './Components/Menu';
import Llenado from './Components/Llenado';
export default class App extends Component{
  //definimos un estado para saber si el menu esta abierto o cerrado
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      itemSelected:'Home'
    }
    this.getTwoRows = this.getTwoRows.bind(this)
    this.itemSelected = this.itemSelected.bind(this)
  }
  //para ocultar la barra de navegacion
  static navigationOptions={
    header:null,
  }
  //funcion para cuando esta abieto y clciquemos se cierrre o si esta cerrado se abrira
  toggle(){
      this.setState({
        isOpen: !this.state.isOpen
      })
  }
  itemSelected(item){
    this.setState({
        itemSelected: item,
        isOpen: false
    })
}
  // funcion que recibe si el boton esta abierto o cerrado y enviara el estado con el cual lo encontramos
  updateMenu(isOpen){
    this.setState({isOpen})
  }

  getTwoRows(){
    const {shows} = this.props
    const array = shows.slice(0)
    const val = Math.floor(array.length / 2)
    const newArray = array.splice(0, val)
    return [
        array,
        newArray
    ]
}
  render() {
    return (
      <View style={{flex:1}}>
        <SideMenu
          menu={<Menu 
            navigation={this.props.navigation}
            itemSelected={this.itemSelected}  
            itemSelectedValue={this.state.itemSelected}
            />}          
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenu(isOpen)}
          style={{flex:1}}
        >
            <Header navigation={this.props.navigation} toggle={this.toggle.bind(this)} />
              {this.state.itemSelected == 'Home' ?
              <ScrollView  style={styles.container}> 
                  <Slider/>
                  <List 
                    navigation={this.props.navigation}
                  />
                </ScrollView >:
                  <Llenado 
                  navigation={this.props.navigation}
                  item={this.state.itemSelected}
                  />
              }  
        </SideMenu>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});