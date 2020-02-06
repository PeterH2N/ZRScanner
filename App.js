import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Divider} from 'react-native-elements';
import NavigationService from "./NavigationService"
import {HomeStack} from "./DinDag"
import {KøleskabStack} from "./Køleskabsindhold"
import {IndkøbslisteStack} from "./Indkøbsliste"
import {RetterStack } from './Retter'

const DrawerContent = (props) => (
  <View style={{
    flex:1,
  }}>
    <View style={{
      alignItems: 'center'
    }}>
    <Text style={{color: 'white', fontSize:30, paddingTop: 35, paddingLeft:5, }}>
      Menu
    </Text>
    </View>
    <Divider style={{backgroundColor: 'white',marginTop:11}}/>
    <DrawerItems {...props} />
  </View>
)
const RootStack = createDrawerNavigator(
  {
    'Din dag': {screen:HomeStack},
    Køleskabsindhold: {screen:KøleskabStack},
    Indkøbsliste: {screen: IndkøbslisteStack},
    Retter: {screen: RetterStack}
  },
  {
    initialRouteName: 'Din dag',
    contentComponent: DrawerContent,
    drawerBackgroundColor: 'steelblue',
    contentOptions: {
      labelStyle: {
          color: 'white',
      },
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render(){
    return <AppContainer ref={navigatorRef=> {
      console.disableYellowBox = true;
NavigationService.setTopLevelNavigator(navigatorRef);
    }}  />;
  }
}
