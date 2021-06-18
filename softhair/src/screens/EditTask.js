import React, { Component } from 'react'
import { View, Text, Alert, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Touchable, Button, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
//import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';

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
    employees: [],
    //date: new Date(), 
    showDatePicker: false,
    showDateTimePicker: false,   
    employee: 1
}

export default class EditTask extends Component { 
    
    state = {
        ...initialState,
        date: this.props.navigation.getParam('estimateAt'),
        time: this.props.navigation.getParam('doneAt'),
        desc: this.props.navigation.getParam('desc'),
    }


    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
        this.loadEmployee()
        this.loadEmployeeId()
    }

    loadEmployee = async() => {
        try {
        const res = await axios.get(`${server}/employees`)        
        this.setState({ employees: res.data })                 
    } catch (e) {
        showError(e)
    }
    }

    loadEmployeeId = async() => {
        try {
        const { navigation } = this.props
        let identificador = navigation.getParam('id', 'sem id')
        console.log("identificador"+identificador) 
        const res = await axios.get(`${server}/tasks/${identificador}`)                  
        res.data.map((v)=>{                                                   
            this.setState({ employee: v.employeeId }) 
            console.log(v)                
           })              
           console.log(res.data)
    } catch (e) {
        showError(e)
    }
    }


    loadTasks = async () => {
        try {
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            // const pending = function(task){
            //     return task.doneAt === null
            // }
            visibleTasks = this.state.tasks.filter(this.isPending)
        }

        this.setState({ visibleTasks })
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
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (e) {
            showError(e)
        }
    }

    teste = () => {
        //this.props.navigation.navigate('EditTask', {id: 1, desc: 'aaa'})
        const message = this.props.navigation.getParam('desc');
        Alert.alert(`${message}`)
    }

    updateTask = async newTask => {
        if (!newTask.nova_descricao || !newTask.nova_descricao.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada!')
            return
        }

        try {
            await axios.put(`${server}/tasks/${newTask.id}/${newTask.nova_descricao}/${newTask.estimateAt}/${newTask.doneAt}/${newTask.employee}/update`, {

            })
            this.props.navigation.navigate('Home')
        } catch (e) {
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
        switch (this.props.daysAhead) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch (this.props.daysAhead) {
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
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />
        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
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
            onChange={(_, time) => this.setState({ time, showDateTimePicker: false })}
            mode='time' />
        const dateString = moment(this.state.time).format('h:mm:ss a')
        if (Platform.OS === 'android') {
            dateTimePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDateTimePicker: true })}>
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
        employee = this.state.employee
        if(employee == null){
            employee = 1
        }        
        const task = { id, nova_descricao, estimateAt, doneAt, employee }
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ padding: 15 }} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                </View>                
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask} />
                <ImageBackground source={this.getImage()}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.edit}>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Descrição</Text>
                    <TextInput style={styles.input}
                        placeholder="Informe a descrição..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Data</Text>
                    <View style={styles.date}>{this.getDatePicker()}</View>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Hora</Text>
                    <View style={styles.time}>{this.getDateTimePicker()}</View>  
                    <View style={{marginTop: 10, marginBottom: 10}}>                        
                    <Picker style={{width: '100%', height: 20}}
                        selectedValue={this.state.employee}
                        onValueChange={(prestador, itemIndex) => (itemIndex)}>{                                                                                                                                                                                                                             
                            this.state.employees.map( (v)=>{                                                                               
                             return <Picker.Item key={v.id} label={v.nome} value={v.id} />
                            })
                           }                                                 
                        </Picker>                                                              
                    </View>                  
                    <TouchableOpacity
                        navigation={this.props.navigation} onPress={() => this.updateTask(task)}>
                        <Text style={styles.save}>Salvar</Text>
                    </TouchableOpacity>
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
    edit: {
        flex: 1,
        flexGrow: 7,
    },
    input: {
        width: '95%',
        fontSize: 15,
        marginTop: 15,
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#fbc4ab',
        borderRadius: 5
    },
    save: {
        width: '95%',
        height: 40,
        fontSize: 20,
        marginTop: 25,
        marginLeft: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#f08080',
        borderRadius: 5
    },
    date: {
        width: '95%',
        fontSize: 15,
        marginLeft: 10,
        marginTop: 10,
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#fbc4ab',
        borderRadius: 5
    },
    time: {
        width: '95%',
        fontSize: 15,
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
        marginTop: 10,
        backgroundColor: '#fbc4ab',
        borderRadius: 5
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
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
