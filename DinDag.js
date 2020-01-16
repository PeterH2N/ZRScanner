import React, {Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {MenuButton} from "./HeaderButtons"
import {Divider, ListItem, Icon} from 'react-native-elements';
import {BoxWrap} from './components/BoxWrap'
import { Platform, StatusBar, StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center"
    },
  });

  const DishList = [{
    name: 'Spaghetti Bolognese',
    pictureURL: 'https://embed.widencdn.net/img/mccormick/2i2sgetp7k/1365x1365px/spaghetti_with_bolognese_sauce_1189.jpg?crop=true&anchor=370;0&q=80&color=ffffffff&u=o2hyef',
    estprep: '60 min',
  },
  {
    name: 'Gullasch',
    pictureURL: 'https://voresmad.dk/~/media/voresmad/recipes/g/gullasch-med-aegte-ungarske-toner.jpg',
    estprep: '50 min',
  }
  ]
class DishItem extends Component {
    render(){
      return(
        <View style={{borderRadius: 6, backgroundColor: 'darkgrey', marginTop: 5}}>
          <View style={{margin:5,flexDirection: 'row'}}>
            <Image style={{height: 150, width:150, borderRadius: 5}} source={{uri: this.props.item.pictureURL}}/>
            <View style={{marginLeft: 5}}>
              <Text style={{}}>
                {this.props.item.name}
              </Text>
            </View>
            
            
          </View>
          
        </View>
      )
    }
    }
     class Dishes extends Component{
constructor (props){
    super(props)
    this.state = {isLoading: true}
}
componentDidMount(){
    return fetch('https://script.google.com/macros/s/AKfycbxA8idCSLOyBpkbRYTLEc8WuBcO0qJMUbFdh4x24zIGPscqkwc/exec')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoading: false, 
            dataSource: responseJson
        },function(){})
    })
    .catch((error)=>{
        console.error(error)
    })
}


        render(){
            if (this.state.isLoading){
                return(
                    <View style ={{flex: 1, padding: 20}}>
                        <ActivityIndicator/>
                    </View>
                )
            }
          return(
            <BoxWrap>
            <Text style={{fontSize: 18}}>
              Du har de fleste ingredienser til disse retter
            </Text>
            <Divider style={{backgroundColor:'grey'}}/>
            <FlatList style={{maxHeight: 250}}data={this.state.dataSource}
              renderItem={
                ({item}) => (
                  <DishItem
                  
                    item={item}
                  />
                )
              }/>
          </BoxWrap>
          )
        }
      }    



   export class HomeScreen extends Component {
    render(){
      return (
        <View style={styles.container}>
          
        <Dishes/>
  
        </View>
      );
    }
  }

  export const HomeStack = createStackNavigator(
    {
      CategoryList: {
        screen: HomeScreen,
        navigationOptions:{
          headerLeft: <MenuButton />,
          headerStyle: {
            backgroundColor: 'steelblue',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          },
          title: "Din dag",
        }
      },
    }
  )
  