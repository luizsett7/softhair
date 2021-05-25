import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import MaterialCard6 from "../components/MaterialCard6";
import MaterialHeader1 from "../components/MaterialHeader1";
import MaterialIconButtonsFooter from "../components/MaterialIconButtonsFooter";

export default class ViewTreatment extends Component {
    render() {
        return (
            <View style={styles.container}>
            <MaterialHeader1 style={styles.materialHeader1} navigation={this.props.navigation} link="Home"></MaterialHeader1>  
            <ScrollView>                                                      
                <MaterialCard6 style={styles.materialCard6} title="Ozonioterapia" subtitle="09:00 - 09:30" 
                desc="Ozonoterapia é uma forma de medicina alternativa que alega aumentar a quantidade de oxigênio no corpo introduzindo ozônio. É baseada em pseudociência e é considerada perigosa para a saúde, sem benefícios verificáveis. A ozonoterapia é vendida como tratamento alternativo para várias doenças.">
                    </MaterialCard6>                        
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
