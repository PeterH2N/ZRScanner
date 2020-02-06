import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { MenuButton, AddButton } from "./HeaderButtons"
import Modal from 'react-native-modal'
import { Icon, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import Stepper from 'react-native-ios-stepper'




class IndkøbslisteScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      vareNavn: "",
      amount: 1,
      varer: []
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({ toggleModal: this.toggleModal })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <TouchableOpacity onPress={navigation.getParam('toggleModal')}>
        <Icon name='add' color='white' size={30} containerStyle={{ paddingRight: 10 }} />
      </TouchableOpacity>,
      headerLeft: <MenuButton />,
      headerStyle: {
        backgroundColor: 'steelblue',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 30,
      },
      title: "Indkøbsliste",
    }
  }


  toggleModal = () => {
    if (this.state.modalVisible)
      Keyboard.dismiss();
    else { }
    this.setState({ modalVisible: !this.state.modalVisible }, () => {
      //alert("yeet")
    });
  }

  render() {
    return (

      <View style={styles.container}>
        <Modal isVisible={this.state.modalVisible} useNativeDriver>

          <View style={{ backgroundColor: 'white', height: 230, borderRadius: 10, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>

              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tilføj Indkøb</Text>

                <TextInput style={{ color: "black", borderRadius: 10, borderWidth: 1, borderColor: "black", height: 40, fontSize: 20, padding: 5, marginBottom: 20, marginTop: 20 }}
                  editable
                  maxLength={40}
                  placeholder={"Varenavn"}
                  placeholderTextColor={"grey"}
                  onChange={(text) => this.setState({ vareNavn: text.nativeEvent.text })}
                  autoFocus={true}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>Antal: {this.state.amount}</Text>
                  <Stepper minValue={1} maxValue={10000000} onPress={(index) => {
                    this.setState({ amount: index })
                  }} />
                </View>
              </View>

              
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Button title="Annuller" onPress={this.toggleModal} />
                <Button title="Tilføj" onPress={() => {
                  this.setState({
                    varer: [
                      ...this.state.varer, {
                        id: uuidv4(),
                        title: this.state.vareNavn,
                        amount: this.state.amount
                      }
                    ],
                    amount: 1
                  }

                  );
                  this.toggleModal();
                }} />
              </View>

            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.varer}
          renderItem={({ item }) => <Indkøbslisteitem item={item} />}
        />
      </View>
    );
  }
}



export const IndkøbslisteStack = createStackNavigator(
  {
    CategoryList: IndkøbslisteScreen,

  }
)

var swipeoutBtns = [
  {
    text: 'Button'
  }
]

class Indkøbslisteitem extends Component {

  render() {
    return (
      <ListItem
        title={this.props.item.title}
        leftIcon={{ name: "brightness-1", color: "grey", size: 10 }}
        subtitle={"Antal: " + this.props.item.amount}
        bottomDivider
      />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

});