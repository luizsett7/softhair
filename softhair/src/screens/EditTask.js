import React, { Component } from 'react'
import { View, Text, Alert, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Touchable, Button, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

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
import Task from '../components/Task'
import AddTask from "./AddTask"

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: [],
    //date: new Date(), 
    showDatePicker: false,
    showDateTimePicker: false 
}

export default class EditTask extends Component {    

    state = {
        ...initialState,
        date: this.props.navigation.getParam('estimateAt'),
        time: this.props.navigation.getParam('doneAt'),
        desc: this.props.navigation.getParam('desc')
    }    
    

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()        
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

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
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

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            this.loadTasks()
        } catch (e) {
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
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            this.setState({ showAddTask: false}, this.loadTasks)
        } catch(e) {
            showError(e)
        }
    }

    teste = () => {
        //this.props.navigation.navigate('EditTask', {id: 1, desc: 'aaa'})
        const message = this.props.navigation.getParam('desc');
        Alert.alert(`${message}`)
    }

    updateTask = async newTask => {         
     if(!newTask.nova_descricao || !newTask.nova_descricao.trim()) {
          Alert.alert('Dados inválidos', 'Descrição não informada!')
          return
      }

      try {
          await axios.put(`${server}/tasks/${newTask.id}/${newTask.nova_descricao}/${newTask.estimateAt}/${newTask.doneAt}/update`, {
              
          })       
          this.props.navigation.navigate('Home')
      } catch(e) {
          showError(e)
      }
  }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
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
    

    getDatePicker = () => {
        let data = new Date(
            Date.parse(
              moment(this.state.date, 'YYYY-MM-DD').format(
                'ddd MMM DD YYYY'
              )
            )
        )          
        let datePicker = <DateTimePicker
         value={data}  
         display="default"              
         onChange={(_,date) => this.setState({date, showDatePicker: false})}
         mode='date'/>
         const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
         if(Platform.OS === 'android'){
           datePicker = (
             <View>
               <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                   <Text style={styles.date}>
                     {dateString}
                   </Text>
               </TouchableOpacity>
               {/*renderização condicional se a primeira condição for true, é renderizado pela segunda*/}
               {this.state.showDatePicker && datePicker}
             </View>
           )
         }
         return datePicker
       }
       getDateTimePicker = () => {
        let time = new Date(
            Date.parse(
              moment(this.state.time).format()            
            )
        )          
        let dateTimePicker = <DateTimePicker
         value={time}  
         is24Hour={true}
         display="default"              
         onChange={(_,time) => this.setState({time, showDateTimePicker: false})}
         mode='time'/>
         const dateString = moment(this.state.time).format('h:mm:ss a')
         if(Platform.OS === 'android'){
            dateTimePicker = (
             <View>
               <TouchableOpacity onPress={() => this.setState({showDateTimePicker: true})}>
                   <Text style={styles.date}>
                     {dateString}
                   </Text>
               </TouchableOpacity>
               {/*renderização condicional se a primeira condição for true, é renderizado pela segunda*/}
               {this.state.showDateTimePicker && dateTimePicker}
             </View>
           )
         }
         return dateTimePicker
       }   
    
    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 'sem id')
        const descricao = navigation.getParam('desc', 'sem desc')               
        const nova_descricao = this.state.desc
        let estimateAt = this.state.date  
        estimateAt = moment(estimateAt).format()             
        let doneAt = this.state.time  
        doneAt = moment(doneAt).format()                  
        //const estimateAt = '2021-06-02 19:14:42.465-03'
        const task = {id, nova_descricao, estimateAt, doneAt}
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
              <TouchableOpacity style={{ padding: 10 }} 
                        navigation={this.props.navigation} onPress={() => this.updateTask(task)}>
                            <Text>Editar</Text>
                        </TouchableOpacity>                        
                <AddTask isVisible={this.state.showAddTask}
                 onCancel={() => this.setState({showAddTask: false})}
                onSave={this.addTask}/>
                <ImageBackground source={this.getImage()}
                    style={styles.background}>
                        <View style={ styles.iconBar }>
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='bars'
                                    size={20} color={commonStyles.colors.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                    size={20} color={commonStyles.colors.secondary} />
                            </TouchableOpacity>
                        </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>                
                <TextInput style={styles.input}
            placeholder="Informe a descrição..."
                     onChangeText={desc => this.setState({desc})}
            value={this.state.desc}/>            
            {this.getDatePicker()} 
            {this.getDateTimePicker()}           
                </View>
                <TouchableOpacity style={[styles.addButton, {backgroundColor: this.getColor()}]} activeOpacity={0.7}
                onPress={() => this.setState({showAddTask: true})}>
                <Icon name="plus" size={20} color={commonStyles.colors.primary} />
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
        flexGrow: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title :{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
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
