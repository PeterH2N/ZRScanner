import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import NavigationService from './NavigationService'
import {Icon} from 'react-native-elements';


export class MenuButton extends Component{
  render(){
    return(
      <View>
		<TouchableOpacity onPress={() => {NavigationService.OpenDrawer()} }>
			<Icon name= 'menu' color = 'white' size = {30} containerStyle={{padding: 5, marginLeft:10, fontSize: 30}}/>
		</TouchableOpacity>
	</View>  
    )
  
  }
	
};



export class ScannerButton extends Component{
  render(){
    return(
      <View>
		<TouchableOpacity onPress={() => {} }>
        <Icon name = 'center-focus-weak' color = 'white' size = {30} containerStyle ={{padding: 5, marginRight:10}}/>
		</TouchableOpacity>
	</View>  
    )
  
  }
	
};