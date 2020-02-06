import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { MenuButton, ScannerButton } from "./HeaderButtons"
import { Divider, ListItem, Icon } from 'react-native-elements';
import { BoxWrap } from './components/BoxWrap'
import { Dimensions, Platform, StatusBar, StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
});


class DishItem extends Component {
  render() {
    return (
      <View style={{ borderRadius: 6, backgroundColor: 'darkgrey', marginTop: 5 }}>
        <View style={{ margin: 5, flexDirection: 'row' }}>
          <Image style={{ height: 150, width: 150, borderRadius: 5 }} source={{ uri: this.props.item.pictureURL }} />
          <View style={{ marginLeft: 5 }}>
            <Text style={{}}>
              {this.props.item.name}
            </Text>
          </View>


        </View>

      </View>
    )
  }
}

class Dishes extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }
  componentDidMount() {
    return fetch('https://script.google.com/macros/s/AKfycbxA8idCSLOyBpkbRYTLEc8WuBcO0qJMUbFdh4x24zIGPscqkwc/exec')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () { })
      })
      .catch((error) => {
        console.error(error)
      })
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <BoxWrap>
        <Text style={{ fontSize: 18 }}>
          Du har de fleste ingredienser til disse retter
            </Text>
        <Divider style={{ backgroundColor: 'grey' }} />
        <FlatList style={{ maxHeight: 250 }} data={this.state.dataSource}
          renderItem={
            ({ item }) => (
              <DishItem

                item={item}
              />
            )
          } />
      </BoxWrap>
    )
  }
}



export class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({ toggleModal: this.toggleModal })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <TouchableOpacity onPress={navigation.getParam('toggleModal')}>
        <Icon name='center-focus-weak' color='white' size={30} containerStyle={{ paddingRight: 10 }} />
      </TouchableOpacity>,
      headerLeft: <MenuButton />,
      headerStyle: {
        backgroundColor: 'steelblue',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 30,
      },
      title: "Din Dag",
    }
  }


  toggleModal = () => {

    this.setState({ modalVisible: !this.state.modalVisible }, () => {
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.modalVisible} useNativeDriver>
          <Scanner/>
          <Button
            title={'Annuler'}
            onPress={this.toggleModal}
          />
        </Modal>

        <Dishes />

      </View>
    );
  }
}

export const HomeStack = createStackNavigator(
  {
    CategoryList: HomeScreen
  }
)


class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />


      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({ scanned: false });
  };

}
