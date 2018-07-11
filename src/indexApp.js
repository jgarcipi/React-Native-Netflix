
import React,{Component} from 'react';
//importamos stacknavigator desde redux para navegar entre paginas
//lo que hace es hacer que cuando mostramos una vista la coloca ensima de la anterior
//y cuando regreasamos la quita y deja la que estubo atraz
import {StackNavigator,} from 'react-navigation';
import App from './App';
import Search from './Components/Search';
import Details from './Components/Details';
import Video from './Components/VideoPlayerView';

const IndexApp= StackNavigator({
    Home: { screen: App},
    Search: { screen: Search},
    Details:{screen: Details},
    Video: {screen: Video}
},{
    //nos permite hacer que la barra de navegacion aparesca o desaparesca
    headerMode:'screen'
});
//creamos un objeto que nos permita eliminar la parte superior donde aparece la navegacion
//y las ocultamos
export default IndexApp


