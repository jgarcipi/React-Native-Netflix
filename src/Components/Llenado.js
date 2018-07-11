import React,{Component} from 'react';
import{
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const MAX_POINTS = 100;
const {width, height} = Dimensions.get('window')
class  Llenado  extends Component {
    state = {
        isMoving: false,
        pointsDelta: 0,
        points: 50
      };
    render(){
        const fill = this.state.points / MAX_POINTS * 100;
        return(
          <ScrollView style={styles.container}>
          <View style={{alignItems: 'center',}}> 
              <AnimatedCircularProgress style={styles.circle}
                  size={200}
                  width={20}
                  fill={fill}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875"
              >
                  {
                      (fill) => (
                      <Text style={styles.points}>
                          { Math.round(MAX_POINTS * fill / 100) }%              
                      </Text>
                      )
                  }
              </AnimatedCircularProgress>
              <View style={styles.detalles}>
                  <Text style={styles.text}> cantidad en litros  -> </Text>
              </View>
              <View style={styles.detalles}>
                  <Text style={styles.text}> consumo durante el mes -> </Text>
              </View>
              <View style={styles.detalles}>
                  <Text style={styles.text}> costo en soles -> </Text>
              </View>
              <View style={styles.detalles}>
                  <Text style={styles.text}> ahorro con sistema reziahorra </Text>
              </View>
            </View>
          </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        backgroundColor:'black',
    },
    points:{
        fontSize: 30,
        color: 'white',
    },
    circle:{
        marginTop:'10%',
    },
    text:{
        color:'white',
        fontSize: 15, 
    },
    detalles:{
       flexDirection: 'row',
       justifyContent: 'space-between',
       paddingVertical: 20,
       borderColor: 'white',
       borderBottomWidth: 1,
       width:'80%',

   },
});
export default Llenado