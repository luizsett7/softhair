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
import Service from '../components/Service'
import AddService from "./AddService"
import { ScrollView } from 'react-native-gesture-handler';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class ServiceList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState    
        this.loadTasks()
    }

    loadTasks = async () => {
        try {            
            const res = await axios.get(`${server}/services`)            
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch(e) {
            showError(e)
        }
    }

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

    addTask = async newTask => {
        if(!newTask.descricao || !newTask.descricao.trim()) {
            Alert.alert('Dados inválidos', 'Nome não informado!')
            return
        }

        try {
            await axios.post(`${server}/services`, {
                descricao: newTask.descricao,
                valor: newTask.valor                
            })

            this.setState({ showAddTask: false}, this.loadTasks)
        } catch(e) {
            showError(e)
        }
    }

    teste = newTask => {                         
        this.props.navigation.navigate('EditService', {id: newTask.serviceIdPK, descricao: newTask.descricao, valor: newTask.valor})
    }

    updateTask = async newTask => {     
     
     if(!newTask.desc || !newTask.desc.trim()) {
          Alert.alert('Dados inválidos', 'Descrição não informada!')
          return
      }

      try {
          await axios.put(`${server}/employees/${newTask.id}/${newTask.desc}/${newTask.cargo}/update`, {
              descricao: 'teste123',
            //   estimateAt: newTask.date
          })
          this.loadTasks()

          this.setState({ showAddTask: false}, this.loadTasks)
      } catch(e) {
          showError(e)
      }
  }

    deleteTask = async serviceIdPK => {
        console.log(serviceIdPK)
        try {
            await axios.put(`${server}/services/${serviceIdPK}`)
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
                            <Text>Serviços</Text>
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
                <AddService isVisible={this.state.showAddTask}
                 onCancel={() => this.setState({showAddTask: false})}
                onSave={this.addTask}/>
                <ImageBackground source={this.getImage()}
                    style={styles.background}>                        
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Serviços</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>                
                        <FlatList data={this.state.visibleTasks}
                            keyExtractor={item => `${item.serviceIdPK}`}
                            renderItem={({item}) => <Service {...item} onUpdateTask={this.teste} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={[styles.addButton, {backgroundColor: '#B13B44'}]} activeOpacity={0.7}
                onPress={() => this.setState({showAddTask: true})}>
                <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
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
