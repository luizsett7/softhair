import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class MaterialButtonWithShadow extends Component {
  render(){
  return (
    <TouchableOpacity style={[styles.container, this.props.style]} onPress={() => this.props.navigation.navigate(this.props.link)}>
      <Text style={styles.caption}>{this.props.caption || "BUTTON"}</Text>
    </TouchableOpacity>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  caption: {
    color: "#3F51B5",
    fontSize: 14
  }
});

