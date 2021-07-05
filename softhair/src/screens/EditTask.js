import React, { Component } from 'react'
import { View, LogBox, Text, Alert, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Touchable, Button, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
//import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
LogBox.ignoreAllLogs();

import { server, showError } from '../common'
import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import Task from '../components/Task'
import AddTask from "./AddTask"
import { ScrollView } from 'react-native-gesture-handler';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: [],
    employees: [],
    users: [],
    services: [],
    //date: new Date(), 
    showDatePicker: false,
    showDateTimePicker: false
}

export default class EditTask extends Component {

    state = {
        ...initialState,
        id: this.props.navigation.getParam('id'),
        date: this.props.navigation.getParam('estimateAt'),
        time: this.props.navigation.getParam('doneAt'),
        fullTime: this.props.navigation.getParam('doneAt'),
        desc: this.props.navigation.getParam('desc'),
        employee: 1,
        user: 1,
        service: 1
    }


    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
        this.loadUsers()
        this.loadUserId()
        this.loadEmployee()
        this.loadEmployeeId()
        this.loadServices()
        this.loadServiceId()

        this.setState({ fullTime: moment("2021-07-03T" + this.state.time).format() })
    }

    loadEmployee = async () => {
        try {
            const res = await axios.get(`${server}/employees`)
            this.setState({ employees: res.data })
        } catch (e) {
            showError(e)
        }
    }

    loadServices = async () => {
        try {
            const res = await axios.get(`${server}/services`)
            this.setState({ services: res.data })
        } catch (e) {
            showError(e)
        }
    }

    loadServiceId = async () => {
        try {
            const { navigation } = this.props
            let identificador = navigation.getParam('id', 'sem id')
            console.log(identificador)
            const res = await axios.get(`${server}/tasks/${identificador}`)
            res.data.map((v) => {
                this.setState({ service: v.serviceIdFK })
            })
        } catch (e) {
            showError(e)
        }
    }

    loadUsers = async () => {
        try {
            const res = await axios.get(`${server}/users`)
            this.setState({ users: res.data })
        } catch (e) {
            showError(e)
        }
    }

    loadUserId = async () => {
        try {
            const { navigation } = this.props
            let identificador = navigation.getParam('id', 'sem id')
            console.log(identificador)
            const res = await axios.get(`${server}/tasks/${identificador}`)
            res.data.map((v) => {
                this.setState({ user: v.userIdFK })
            })
        } catch (e) {
            showError(e)
        }
    }

    loadEmployeeId = async () => {
        try {
            const { navigation } = this.props
            let identificador = navigation.getParam('id', 'sem id')
            const res = await axios.get(`${server}/tasks/${identificador}`)
            res.data.map((v) => {
                this.setState({ employee: v.clientIdFK })
            })
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

    updateTask = async newTask => {
        let id = this.state.id
        let desc = 'desc'
        let estimateAt = this.state.date
        let doneAt = this.state.fullTime
        let employee = this.state.employee
        let user = this.state.user
        let service = this.state.service
        try {
            await axios.put(`${server}/tasks/${id}/${desc}/${estimateAt}/${doneAt}/${employee}/${user}/${service}/update`)
            this.props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskIdPK}`)
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
        let fullTime = new Date(
            Date.parse(
                moment(this.state.fullTime).format()
            )
        )
        let time = moment(this.state.fullTime).format('HH:mm:ss')
        let dateTimePicker = <DateTimePicker
            value={fullTime}
            is24Hour={true}
            display="default"
            onChange={(_, fullTime) =>
                this.setState({ fullTime, showDateTimePicker: false })
            }
            mode='time' />
        const dateString = time
        //const dateString = moment(this.state.time).format('h:mm:ss')
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

    setService = service => {
        this.setState({ service: service })
    }

    setEmployee = employee => {
        this.setState({ employee: employee })
    }

    setUser = user => {
        this.setState({ user: user })
    }

    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id', 'sem id')
        const descricao = navigation.getParam('desc', 'sem desc')
        const nova_descricao = this.state.desc
        let estimateAt = moment(this.state.date).format("YYYY-MM-DD")
        //let doneAt = this.state.time
        let doneAt = moment(this.state.fullTime).format("HH:mm:ss")
        let employee = this.state.employee
        let user = this.state.user
        let service = this.state.service
        const task = { id, nova_descricao, estimateAt, doneAt, employee, user, service }
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name='bars'
                            size={20} color={commonStyles.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingTop: 20 }}
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text>Agendamentos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingTop: 20 }}
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('ServiceList')}>
                        <Text>Serviços</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingTop: 20 }}
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('EmployeeList')}>
                        <Text>Clientes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingTop: 20, paddingRight: 15 }}
                        navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('ProductList')}>
                        <Text>Produtos</Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={this.getImage()}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.edit}>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Data</Text>
                    <View style={styles.date}>{this.getDatePicker()}</View>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Hora</Text>
                    <View style={styles.time}>{this.getDateTimePicker()}</View>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Serviço</Text>
                    <View style={{ marginTop: 10, marginBottom: 10, width: '95%', height: 30, marginLeft: 10, backgroundColor: '#fbc4ab', borderRadius: 5 }}>
                        <Picker style={{ width: '100%', height: 20 }}
                            selectedValue={this.state.service}
                            onValueChange={(service, itemIndex) => { this.setService(service) }}>
                            {this.state.services.map((v) => {
                                return <Picker.Item key={v.serviceIdPK} label={v.descricao} value={v.serviceIdPK} />
                            })}
                        </Picker>
                    </View>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Cliente</Text>
                    <View style={{ marginTop: 10, marginBottom: 10, width: '95%', height: 30, marginLeft: 10, backgroundColor: '#fbc4ab', borderRadius: 5 }}>
                        <Picker style={{ width: '100%', height: 20 }}
                            selectedValue={this.state.employee}
                            onValueChange={(employee, itemIndex) => { this.setEmployee(employee) }}>
                            {this.state.employees.map((v) => {
                                return <Picker.Item key={v.clientIdPK} label={v.nome} value={v.clientIdPK} />
                            })}
                        </Picker>
                    </View>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Colaborador</Text>
                    <View style={{ marginTop: 10, marginBottom: 10, width: '95%', height: 30, marginLeft: 10, backgroundColor: '#fbc4ab', borderRadius: 5 }}>
                        <Picker style={{ width: '100%', height: 20 }}
                            selectedValue={this.state.user}
                            onValueChange={(user, itemIndex) => { this.setUser(user) }}>
                            {this.state.users.map((v) => {
                                return <Picker.Item key={v.userIdPK} label={v.name} value={v.userIdPK} />
                            })}
                        </Picker>
                    </View>
                    <TouchableOpacity
                        navigation={this.props.navigation} onPress={this.updateTask}>
                        <Text style={styles.save}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
