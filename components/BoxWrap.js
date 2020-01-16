import React, {Component} from 'react'
import {Text, View} from 'react-native'
export class BoxWrap extends Component{
    render(){
        return(
            <View style={{backgroundColor: 'lightgrey', width: "95%", margin: 15}}>
                <View style={{backgroundColor: 'steelblue', height: 20}}>
                    
                </View>
                    <View style={{borderColor: 'grey', borderWidth: 1, borderTopWidth: 0}}>
                        <View style={{margin:5}}>
                            {this.props.children}
                        </View>
                    </View>
            </View>
        )
    }
}