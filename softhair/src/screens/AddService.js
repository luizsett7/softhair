import React, {Component } from "react"
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from "../commonStyles";

const initialState = { nome: '', cargo: ''}

export default class AddService extends Component {

  state = {
    ...initialState
  }

  save = () => {
    const newTask = {
      descricao: this.state.nome,
      valor: this.state.cargo
    }

    this.props.onSave && this.props.onSave(newTask)
    this.setState({...initialState})
  }

  getDatePicker = () => {
   let datePicker = <DateTimePicker
    value={this.state.date}
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
    let dateTimePicker = <DateTimePicker
     value={this.state.time}  
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
    return (
      <Modal transparent={true} visible={this.props.isVisible}
        onRequestClose={this.props.onCancel} animationType='slide'>
        <TouchableWithoutFeedback
            onPress={this.props.onCancel}>
            <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Novo Serviço</Text>
          <View>
          <TextInput style={styles.input}
            placeholder="Informe a descrição..."
                     onChangeText={nome => this.setState({nome})}
            value={this.state.nome}/>
            </View>
            <View>
            <TextInput style={styles.input}
            placeholder="Informe o valor..."
                     onChangeText={cargo => this.setState({cargo})}
            value={this.state.cargo}/>
            </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={this.props.onCancel}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FFF'
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    marginRight: 20,
    color: commonStyles.colors.today
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15
  }
})
