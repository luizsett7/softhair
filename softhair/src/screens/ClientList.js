import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import MaterialCardWithImageAndTitle1 from "../components/MaterialCardWithImageAndTitle1";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonWithShadow from "../components/MaterialButtonWithShadow";


export default class ClientList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container_header]}>
                <View style={styles.leftIconButtonRow}>
                    <TouchableOpacity style={styles.leftIconButton} onPress={() => this.props.navigation.navigate('Home')}>
                    <MaterialCommunityIconsIcon
                        name="menu"
                        style={styles.leftIcon}
                    ><Text>Clientes</Text></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={styles.title}>            
                    </Text>
                    </View>
                </View>
                <View style={styles.leftIconButtonRowFiller}></View>
                <TouchableOpacity style={styles.rightIconButton} onPress={() => this.props.navigation.navigate('Auth')}>
                    <MaterialCommunityIconsIcon
                    name="dots-vertical"
                    style={styles.rightIcon}
                    ></MaterialCommunityIconsIcon>
                </TouchableOpacity>
                </View>
                <ScrollView
                horizontal={false}>
                    <TouchableOpacity style={{ padding: 10 }} 
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('AddClient')}>
                            <Text>Novo Cliente</Text>
                        </TouchableOpacity>
                <MaterialCardWithImageAndTitle1 navigation={this.props.navigation} title="Maria" subtitle="(45) 98765-4321" link="ViewClient"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>                          
                <MaterialCardWithImageAndTitle1 title="Josefa" subtitle="(47) 95142-3574"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>
               <MaterialCardWithImageAndTitle1 navigation={this.props.navigation} title="Beatriz" subtitle="(45) 98765-4321" link="ViewClient"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>                          
                <MaterialCardWithImageAndTitle1 title="Juca" subtitle="(47) 95142-3574"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>
                <MaterialCardWithImageAndTitle1 navigation={this.props.navigation} title="Maria" subtitle="(45) 98765-4321" link="ViewClient"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>                                         
                </ScrollView>
                <View style={[styles.container_footer]}>
                <TouchableOpacity style={styles.buttonWrapper1} onPress={() => this.props.navigation.navigate('Home')}>
                        <MaterialCommunityIconsIcon
                        name="calendar-text"
                        style={styles.icon1}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper2} onPress={() => this.props.navigation.navigate('ClientList')}>
                        <MaterialCommunityIconsIcon
                        name="alpha-c-box"
                        style={styles.activeIcon}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper3} onPress={() => this.props.navigation.navigate('ServiceList')}>
                        <MaterialCommunityIconsIcon
                        name="alpha-s-box"
                        style={styles.icon3}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper4} onPress={() => this.props.navigation.navigate('PermissionList')}>
                        <MaterialCommunityIconsIcon
                        name="alpha-p-box"
                        style={styles.icon4}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialButtonWithShadow: {
    height: 36,
    width: '90%',
    marginLeft: '5%'
  },
  materialHeader1: {
    height: 56,
    width: '100%',
  },
  scrollArea: {
    width: '100%',
    height: 654,
    backgroundColor: "#E6E6E6"
  },
  scrollArea_contentContainerStyle: {
    height: 654,
    width: '100%'
  },
  materialCardWithImageAndTitle1: {
    height: 166,
    width: '100%',
    marginTop: 20
  },
  container_footer: {
      backgroundColor: "#3f51b5",
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#111",
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.2,
      elevation: 3,
      height: 50
    },
    buttonWrapper1: {
      flex: 1,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    icon1: {
      backgroundColor: "transparent",
      color: "#FFFFFF",
      fontSize: 24,
      opacity: 0.8
    },
    buttonWrapper2: {
      flex: 1,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    activeIcon: {
      backgroundColor: "transparent",
      color: "#FFFFFF",
      fontSize: 24
    },
    buttonWrapper3: {
      flex: 1,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    icon3: {
      backgroundColor: "transparent",
      color: "#FFFFFF",
      fontSize: 24,
      opacity: 0.8
    },
    buttonWrapper4: {
      flex: 1,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    icon4: {
      backgroundColor: "transparent",
      color: "#FFFFFF",
      fontSize: 24,
      opacity: 0.8
    },
    container_header: {
        backgroundColor: "#3F51B5",
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 3
      },
      leftIconButton: {
        padding: 11
      },
      leftIcon: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24
      },
      textWrapper: {
        alignSelf: "flex-end",
        marginLeft: 21,
        marginBottom: 16
      },
      title: {
        fontSize: 18,
        color: "#FFFFFF",
        backgroundColor: "transparent",
        lineHeight: 18
      },
      leftIconButtonRow: {
        flexDirection: "row",
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 3
      },
      leftIconButtonRowFiller: {
        flex: 1,
        flexDirection: "row"
      },
      rightIconButton: {
        padding: 11,
        alignItems: "center",
        marginRight: 5,
        marginTop: 5
      },
      rightIcon: {
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontSize: 24
      }
  });

