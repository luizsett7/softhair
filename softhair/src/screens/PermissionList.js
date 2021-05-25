import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import MaterialCardWithImageAndTitle1 from "../components/MaterialCardWithImageAndTitle1";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonWithShadow from "../components/MaterialButtonWithShadow";
import Svg, { Ellipse } from "react-native-svg";

import avatar from '../../assets/imgs/teacher-295387_1280.png'
import arrow from '../../assets/imgs/arrow.jpg'

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
                    ><Text>Permissões</Text></MaterialCommunityIconsIcon>
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
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('AddService')}>
                            <Text>Permissão</Text>
                        </TouchableOpacity>
                        <View style={styles.ellipseStackRow}>
                            <View style={styles.ellipseStack}>                            
                                <Image
                                    source={avatar}
                                    resizeMode="contain"
                                    style={styles.image1}
                                ></Image>
                                </View>
                                <View style={styles.kellyZuchiColumn}>
                                <Text style={styles.kellyZuchi}>Kelly Zuchi</Text>
                                <Text style={styles.administadora}>Administadora</Text>
                                </View>
                                <TouchableOpacity
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('AddPermission')}>
                                <Image
                                source={arrow}
                                resizeMode="contain"
                                style={styles.image2}
                                ></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ellipseStackRow}>
                            <View style={styles.ellipseStack}>                            
                                <Image
                                    source={avatar}
                                    resizeMode="contain"
                                    style={styles.image1}
                                ></Image>
                                </View>
                                <View style={styles.kellyZuchiColumn}>
                                <Text style={styles.kellyZuchi}>Maria</Text>
                                <Text style={styles.administadora}>Manicure</Text>
                                </View>
                                <Image
                                source={arrow}
                                resizeMode="contain"
                                style={styles.image2}
                                ></Image>
                            </View>
                            <View style={styles.ellipseStackRow}>
                            <View style={styles.ellipseStack}>                            
                                <Image
                                    source={avatar}
                                    resizeMode="contain"
                                    style={styles.image1}
                                ></Image>
                                </View>
                                <View style={styles.kellyZuchiColumn}>
                                <Text style={styles.kellyZuchi}>Kelly Zuchi</Text>
                                <Text style={styles.administadora}>Administadora</Text>
                                </View>
                                <Image
                                source={arrow}
                                resizeMode="contain"
                                style={styles.image2}
                                ></Image>
                            </View>
                            <View style={styles.ellipseStackRow}>
                            <View style={styles.ellipseStack}>                            
                                <Image
                                    source={avatar}
                                    resizeMode="contain"
                                    style={styles.image1}
                                ></Image>
                                </View>
                                <View style={styles.kellyZuchiColumn}>
                                <Text style={styles.kellyZuchi}>Joaquina</Text>
                                <Text style={styles.administadora}>Auxiliar</Text>
                                </View>
                                <Image
                                source={arrow}
                                resizeMode="contain"
                                style={styles.image2}
                                ></Image>
                            </View>
                            <View style={styles.ellipseStackRow}>
                            <View style={styles.ellipseStack}>                            
                                <Image
                                    source={avatar}
                                    resizeMode="contain"
                                    style={styles.image1}
                                ></Image>
                                </View>
                                <View style={styles.kellyZuchiColumn}>
                                <Text style={styles.kellyZuchi}>Kelly Zuchi</Text>
                                <Text style={styles.administadora}>Administadora</Text>
                                </View>
                                <Image
                                source={arrow}
                                resizeMode="contain"
                                style={styles.image2}
                                ></Image>
                            </View>
                            <View style={styles.ellipseStackRow}>
                            <View style={styles.ellipseStack}>                            
                                <Image
                                    source={avatar}
                                    resizeMode="contain"
                                    style={styles.image1}
                                ></Image>
                                </View>
                                <View style={styles.kellyZuchiColumn}>
                                <Text style={styles.kellyZuchi}>Kelly Zuchi</Text>
                                <Text style={styles.administadora}>Administadora</Text>
                                </View>
                                <Image
                                source={arrow}
                                resizeMode="contain"
                                style={styles.image2}
                                ></Image>
                            </View>
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
  image1: {
    top: 9,
    left: 12,
    width: 60,
    height: 60,
    position: "absolute"
  },
  ellipseStack: {
    width: 85,
    height: 79
  },
  kellyZuchi: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  administadora: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 7
  },
  kellyZuchiColumn: {
    width: 92,
    marginLeft: 26,
    marginTop: 19,
    marginBottom: 21
  },
  image2: {
    width: 47,
    height: 30,
    transform: [
      {
        rotate: "-90.00deg"
      }
    ],
    marginLeft: 20,
    marginTop: 21
  },
  ellipseStackRow: {
    height: 79,
    flexDirection: "row",
    marginLeft: 57,
    marginRight: 48
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

