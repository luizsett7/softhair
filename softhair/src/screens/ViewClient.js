import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import MaterialCard6 from "../components/MaterialCard6";
import MaterialHeader1 from "../components/MaterialHeader1";
import MaterialIconButtonsFooter from "../components/MaterialIconButtonsFooter";

export default class ViewClient extends Component {
    render() {
        return (
            <View style={styles.container}>
            <MaterialHeader1 style={styles.materialHeader1} navigation={this.props.navigation} link="Home"></MaterialHeader1>  
            <ScrollView>                                                      
                <MaterialCard6 style={styles.materialCard6} title="Maria" subtitle="(45) 98765-4321" desc="Cliente costuma utilizar coloração Keune 7.12 com OX de 40"></MaterialCard6>                        
            </ScrollView>
            <MaterialIconButtonsFooter
                          style={styles.materialIconButtonsFooter}
            ></MaterialIconButtonsFooter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    materialHeader1: {
      height: 56,
      width: 375,
      marginTop: 29
    },
    materialIconButtonsFooter: {
      height: 56,
      width: '100%'
    },
    materialCard6: {
      height: 600,
      width: '100%',
    }
  });
