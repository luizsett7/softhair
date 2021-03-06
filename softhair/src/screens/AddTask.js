import React, { Component } from "react"
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ImageBackground,
  ScrollView
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from "../commonStyles";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'
import { server, showError } from '../common'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'

const initialState = { desc: '', date: new Date(), time: new Date(), showDatePicker: false, showDateTimePicker: false, services: [], employees: [], users: [] }

export default class AddTask extends Component {

  state = {
    ...initialState
  }

  componentDidMount = async () => {
    this.loadEmployee()
    this.loadUsers()
    this.loadServices()
  }

  loadUsers = async () => {
    try {
      const res = await axios.get(`${server}/users`)
      this.setState({ users: res.data })
    } catch (e) {
      showError(e)
    }
  }

  loadServices = async () => {
    try {
      const res = await axios.get(`${server}/ativeservices`)
      this.setState({ services: res.data })
    } catch (e) {
      showError(e)
    }
  }

  loadEmployee = async () => {
    try {
      const res = await axios.get(`${server}/ativeemployees`)
      this.setState({ employees: res.data })
    } catch (e) {
      showError(e)
    }
  }

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
      time: this.state.time
    }

    this.props.onSave && this.props.onSave(newTask)
    this.setState({ ...initialState })
  }

  addTask = async () => {    
    try {
      await axios.post(`${server}/tasks`, {
        desc: 'desc',        
        //estimateAt: this.state.date,        
        //doneAt: this.state.time,
        estimateAt: moment(this.state.date).format("YYYY-MM-DD"),        
        doneAt: moment(this.state.time).format("HH:mm:ss"),
        userIdFK: this.state.user,
        clientIdFK: this.state.employee,
        serviceIdFK: this.state.service
      })            
      this.props.navigation.navigate('Home')
      //this.setState({ showAddTask: false}, this.loadTasks)
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
    let datePicker = <DateTimePicker
      value={this.state.date}
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
          {/*renderiza????o condicional se a primeira condi????o for true, ?? renderizado pela segunda*/}
          {this.state.showDatePicker && datePicker}
        </View>
      )
    }
    return datePicker
  }

  getDateTimePicker = () => {
    let dateTimePicker = <DateTimePicker
      value={this.state.time}
      is24Hour={true}
      display="default"
      onChange={(_, time) => this.setState({ time, showDateTimePicker: false })}
      mode='time' />
    const dateString = moment(this.state.time).format('HH:mm:ss')
    if (Platform.OS === 'android') {
      dateTimePicker = (
        <View>
          <TouchableOpacity onPress={() => this.setState({ showDateTimePicker: true })}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {/*renderiza????o condicional se a primeira condi????o for true, ?? renderizado pela segunda*/}
          {this.state.showDateTimePicker && dateTimePicker}
        </View>
      )
    }
    return dateTimePicker
  }

  setPrestador = prestador => {
    this.setState({ employee: prestador })
  }

  setUser = user => {
    this.setState({ user: user })
  }

  setService = service => {
    this.setState({ service: service })
  }

  render() {   
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
                        <Text>Servi??os</Text>
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
          <View>
            <TouchableWithoutFeedback
              onPress={this.props.onCancel}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
              <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Servi??o</Text>
              <View style={{ marginTop: 10, marginBottom: 10, width: '95%', height: 30, marginLeft: 10, backgroundColor: '#fbc4ab', borderRadius: 5 }}>
                <Picker style={{ width: '100%', height: 20, marginTop: 10 }}
                  selectedValue={this.state.service}
                  onValueChange={(service, itemIndex) => { this.setService(service) }
                  }>
                  {this.state.services.map((v) => {
                    return <Picker.Item key={v.serviceIdPK} label={v.descricao} value={v.serviceIdPK} />
                  })}
                </Picker>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Cliente</Text>
              <View style={{ marginTop: 10, marginBottom: 10, width: '95%', height: 30, marginLeft: 10, backgroundColor: '#fbc4ab', borderRadius: 5 }}>
                <Picker style={{ width: '100%', height: 20, marginTop: 10 }}
                  selectedValue={this.state.employee}
                  onValueChange={(prestador, itemIndex) => { this.setPrestador(prestador) }
                  }>
                  {this.state.employees.map((v) => {
                    return <Picker.Item key={v.clientIdPK} label={v.nome} value={v.clientIdPK} />
                  })}
                </Picker>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Colaborador</Text>
              <View style={{ marginTop: 10, marginBottom: 10, width: '95%', height: 30, marginLeft: 10, backgroundColor: '#fbc4ab', borderRadius: 5 }}>
                <Picker style={{ width: '100%', height: 20 }}
                  selectedValue={this.state.user}
                  onValueChange={(user, itemIndex) => { this.setUser(user) }
                  }>
                  {this.state.users.map((v) => {
                    return <Picker.Item key={v.userIdPK} label={v.name} value={v.userIdPK} />
                  })}
                </Picker>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Data</Text>
              <View style={styles.date}>{this.getDatePicker()}</View>
              <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Hora</Text>
              <View style={styles.time}>{this.getDateTimePicker()}</View>
              <TouchableOpacity onPress={this.addTask}>
                <Text style={styles.save}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today
  }
})
