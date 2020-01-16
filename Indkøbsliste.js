import React, {Component } from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {MenuButton, AddButton} from "./HeaderButtons"
import Modal from 'react-native-modal'
import {Icon} from 'react-native-elements'
import { TouchableHighlight } from 'react-native-gesture-handler';




class IndkøbslisteScreen extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            modalVisible: false,
          };
    }
    componentDidMount(){
        this.props.navigation.setParams({toggleModal: this.toggleModal})
    }

    static navigationOptions= ({navigation}) => {
        return {
        headerRight: <TouchableOpacity onPress={navigation.getParam('toggleModal')}>
            <Icon name = 'add' color = 'white' size = {30} containerStyle={{paddingRight: 10}}/>
        </TouchableOpacity>,
        headerLeft: <MenuButton />,
        headerStyle: {
          backgroundColor: 'steelblue',
          textAlign: 'center',
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 30,
        },
        title: "Indkøbsliste",
    }
}

      
      toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible }, ()=>{
            //alert("yeet")
        });
      }
    
    render(){




      return(
          
        <View style={styles.container}>

<Modal isVisible={this.state.modalVisible} useNativeDriver>
    <View style={{backgroundColor: 'white', height: 200,borderRadius: 10, justifyContent: 'center'}}>
        <Button  title="Hide modal" onPress={this.toggleModal}/>
    </View>
</Modal>
          <Indkøbslist/>
        </View>
      );
    }
  }



  export const IndkøbslisteStack = createStackNavigator(
    {
      CategoryList: IndkøbslisteScreen,

    }
  )
  const Varer = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Mælk',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Havregryn',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Pastaskruer',
    },
  ]

  class Indkøbslisteitem extends Component{

    render(){
        return(
        <Text>{this.props.item.title}</Text>
        )
    }
  }

  class Indkøbslist extends Component{
      render(){
          return(
              <FlatList
              data = {Varer}
              renderItem = {({item})=> <Indkøbslisteitem item={item}/>}
              />
          )
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center"
    },

  });