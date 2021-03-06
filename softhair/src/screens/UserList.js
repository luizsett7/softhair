import React, { Component } from 'react'
import { View, Text, Alert, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Touchable, Button } from 'react-native'

import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError } from '../common' 
import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import User from '../components/User'
import AddTask from "./AddTask"
import { ScrollView } from 'react-native-gesture-handler';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class UserList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        // this.setState({
        //     showDoneTasks: savedState.showDoneTasks
        // }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {            
            const res = await axios.get(`${server}/users`)            
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch(e) {
            showError(e)
        }
    }

    // toggleFilter = () => {
    //     this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    // }

    // isPending = task => {
    //     return task.doneAt === null
    // }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        } else {
            // const pending = function(task){
            //     return task.doneAt === null
            // }
            visibleTasks = this.state.tasks.filter(this.isPending)
        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))        
    }

    // toggleTask = async taskId => {
    //     try {
    //         await axios.put(`${server}/tasks/${taskId}/toggle`)
    //         this.loadTasks()
    //     } catch (e) {
    //         showError(e)
    //     }
    // }

    addTask = async newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inv??lidos', 'Descri????o n??o informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date,
                doneAt: newTask.time,
            })

            this.setState({ showAddTask: false}, this.loadTasks)
        } catch(e) {
            showError(e)
        }
    }

    // loadEmployee = async employeeId => {
    //     console.log(employeeId)
    //     try {
    //     const res = await axios.get(`${server}/employees/${employeeId}`)        
    //     console.log(res.data.nome)
    //     return res.data.nome
    // } catch (e) {
    //     showError(e)
    // }
    // }

    teste = newTask => {                   
        this.props.navigation.navigate('EditUser', {id: newTask.userIdPK, nome: newTask.name, email: newTask.email, role: newTask.role})
    }

    updateTask = async newTask => {     
     
     if(!newTask.desc || !newTask.desc.trim()) {
          Alert.alert('Dados inv??lidos', 'Descri????o n??o informada!')
          return
      }

      try {
          await axios.put(`${server}/tasks/${newTask.id}/${newTask.desc}/update`, {
              descricao: 'teste123',
            //   estimateAt: newTask.date
          })
          this.loadTasks()

          this.setState({ showAddTask: false}, this.loadTasks)
      } catch(e) {
          showError(e)
      }
  }

    deleteTask = async userIdPK => {
        try {
            await axios.put(`${server}/users/${userIdPK}/remove`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    getImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{ padding: 20 }} onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon name='bars'
                                    size={20} color={commonStyles.colors.primary} />
                            </TouchableOpacity> 
                            <TouchableOpacity style={{ paddingTop: 20 }} 
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('Home')  }>
                            <Text>Agendamentos</Text>
                        </TouchableOpacity>                      
                        <TouchableOpacity style={{ paddingTop: 20 }} 
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('ServiceList')  }>
                            <Text>Servi??os</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity style={{ paddingTop: 20 }} 
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('EmployeeList')  }>
                            <Text>Clientes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingTop: 20, paddingRight: 15 }} 
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('ProductList')  }>
                            <Text>Produtos</Text>
                        </TouchableOpacity>                                                                    
                </View>                                
                <ImageBackground source={this.getImage()}
                    style={styles.background}>                        
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Colaboradores</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>                
                        <FlatList data={this.state.visibleTasks}
                            keyExtractor={item => `${item.userIdPK}`}
                            renderItem={({item}) => <User {...item} onUpdateTask={this.teste} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>                        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    background: {
        flexGrow: 3
    },
    taskList: {
        flex: 1,
        flexGrow: 7,
        marginLeft: 10,
        marginRight: 10
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title :{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 40,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
