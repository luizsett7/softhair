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

const initialState = {
    descricao: '',
    valor: '',
    urlImage: ''
}

export default class AddProduct extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            descricao: this.state.descricao,
            valor: this.state.valor,
            urlImage: this.state.urlImage
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState })
    }

    addTask = async () => {
        try {
            await axios.post(`${server}/products`, {
                descricao: this.state.descricao,
                valor: this.state.valor,
                urlImage: this.state.urlImage,
            })
            this.props.navigation.navigate('ProductList')
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
                    {/*renderização condicional se a primeira condição for true, é renderizado pela segunda*/}
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
        let id_employee = 1
        function carrega(param) {
            id_employee = param
            console.log(id_employee)
        }
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
                <View style={styles.container}>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Descrição</Text>
                    <TextInput style={styles.input}
                        placeholder="Informe a descrição..."
                        onChangeText={descricao => this.setState({ descricao })}
                        value={this.state.descricao} />
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Valor</Text>
                    <TextInput style={styles.input}
                        placeholder="Informe o valor..."
                        onChangeText={valor => this.setState({ valor })}
                        value={this.state.valor} />
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Endereço da Imagem</Text>
                    <TextInput style={styles.input}
                        placeholder="Informe o endereço da imagem..."
                        onChangeText={urlImage => this.setState({ urlImage })}
                        value={this.state.urlImage} />
                    <TouchableOpacity onPress={this.addTask}>
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
