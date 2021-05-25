import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import MaterialCardWithImageAndTitle1 from "../components/MaterialCardWithImageAndTitle1";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonWithShadow from "../components/MaterialButtonWithShadow";
import AddTask from "./AddTask";

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: []
}

export default class TaskList extends Component {
    state = {
      ...initialState
    }
    loadTasks = async () => {
      try {
          const maxDate = moment()
              .add({days: this.props.daysAhead})
              .format('YYYY-MM-DD 23:59:59')
          const res = await axios.get(`${server}/tasks?date=${maxDate}`)
          this.setState({ tasks: res.data }, this.filterTasks)
      } catch(e) {
          showError(e)
      }
  }
    addTask = async newTask => {
      if(!newTask.desc || !newTask.desc.trim()) {
          Alert.alert('Dados inválidos', 'Descrição não informada!')
          return
      }

      try {
          await axios.post(`${server}/tasks`, {
              desc: "teste",
              estimateAt: "2021-12-12 23:23:23"
          })

          this.setState({ showAddTask: false}, this.loadTasks)
      } catch(e) {
          showError(e)
      }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container_header]}>
                <View style={styles.leftIconButtonRow}>
                    <TouchableOpacity style={styles.leftIconButton} onPress={() => this.props.navigation.navigate('Home')}>
                    <MaterialCommunityIconsIcon
                        name="menu"
                        style={styles.leftIcon}
                    ><Text>Agendamentos</Text></MaterialCommunityIconsIcon>
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
                        navigation={this.props.navigation} onPress={() => this.setState({showAddTask: true})}>
                            <Text>Novo Agendamento</Text>
                        </TouchableOpacity>
                        <AddTask isVisible={this.state.showAddTask}
                        onCancel={() => this.setState({showAddTask: false})}
                        onSave={this.addTask}/>
                <MaterialCardWithImageAndTitle1 navigation={this.props.navigation} title="Ozonioterapia" subtitle="09:00 - 09:30" client="Cliente: Maria" employee="Colaborador: Kelly" link="ViewTreatment"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>                          
                <MaterialCardWithImageAndTitle1 title="Alta Frequência" subtitle="10:00 - 10:30" client="Cliente: Joana" employee="Colaborador: Tereza"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>
                <MaterialCardWithImageAndTitle1 title="Cronograma Capilar" subtitle="11:00 - 11:30" client="Cliente: Beatriz" employee="Colaborador: Kelly"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>
                <MaterialCardWithImageAndTitle1 title="Ozonioterapia" subtitle="12:00 - 12:30" client="Cliente: Maria" employee="Colaborador: Kelly"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>
                <MaterialCardWithImageAndTitle1 title="Ozonioterapia" subtitle="13:00 - 13:30" client="Cliente: Maria" employee="Colaborador: Kelly"
                    style={styles.materialCardWithImageAndTitle1}
                ></MaterialCardWithImageAndTitle1>
                <MaterialCardWithImageAndTitle1 title="Ozonioterapia" subtitle="14:00 - 14:30" client="Cliente: Maria" employee="Colaborador: Kelly"
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

