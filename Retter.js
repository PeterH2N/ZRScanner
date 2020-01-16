import React, {Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {MenuButton} from "./HeaderButtons"



export class RetterScreen extends Component {
    render(){
      return(
        <View style={styles.container}>
          <Text>Hi</Text>
        </View>
      );
    }
  }

  export const RetterStack = createStackNavigator(
    {
      CategoryList: {
        screen: RetterScreen,
        navigationOptions: {
          headerLeft: <MenuButton />,
          headerStyle: {
            backgroundColor: 'steelblue',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          },
          title: "Retter",
        }
      },
    }
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center"
    },
  });