import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import backgroundImage from '../../assets/imgs/salon.jpg'

export default class MaterialCardWithImageAndTitle1 extends Component {
  render(){
  return (
    <View style={[styles.container, this.props.style]}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>{this.props.title}</Text>
          <Text style={styles.subtitleStyle}>{this.props.subtitle}</Text>
          <Text style={styles.clientStyle}>{this.props.client}</Text>
          <Text style={styles.employeeStyle}>{this.props.employee}</Text>
        </View>
        <Image
          source={backgroundImage}
          style={styles.cardItemImagePlace}
        ></Image>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity style={styles.actionButton1} onPress={() => this.props.navigation.navigate(this.props.link)}>
          <Text style={styles.actionText1}>Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton1}>
          <Text style={styles.actionText1}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton2}>
          <Text style={styles.actionText2}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 4,
    flex: 1
  },
  titleStyle: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12
  },
  subtitleStyle: {
    fontSize: 14,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5
  },
  clientStyle: {
    fontSize: 14,
    color: "#000",
  },
  employeeStyle: {
    fontSize: 14,
    color: "#000",
    opacity: 0.5
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 80,
    width: 80,
    margin: 16
  },
  actionBody: {
    padding: 8,
    flexDirection: "row"
  },
  actionButton1: {
    padding: 8,
    height: 36
  },
  actionText1: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  },
  actionButton2: {
    padding: 8,
    height: 36
  },
  actionText2: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  }
});
