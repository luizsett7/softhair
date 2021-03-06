import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import backgroundImage from '../../assets/imgs/salon.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'

const initialState = {
    name: '',
    email: 'kelly@gmail.com',
    password: '123456',
    confirmPassword: '',
    stageNew: false,
    roles: [],
    role: 1
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        this.loadEmployee()    
    }

    loadEmployee = async() => {
        try {
        const res = await axios.get(`${server}/roles`)        
        this.setState({ roles: res.data })                 
    } catch (e) {
        showError(e)
    }
    }

    signinOrSignup = () => {
        if(this.state.stageNew){
            this.signup()
        }else{
            this.signin()
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                role: this.state.role
            })    
            showSuccess('Usuário Cadastrado!')
            this.setState({ ...initialState })
        } catch(e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`            
            this.props.navigation.navigate('Home')
        } catch(e){
            showError(e)
        }   
    }

    teste = role => {
        this.setState({ role: role })            
      }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword)
            validations.push(this.state.confirmPassword === this.state.password)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>SoftHair</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&                         
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name} style={styles.input}
                    onChangeText={name => this.setState({ name: name })} />
                    }
                    {this.state.stageNew &&                  
                    <View style={{width: '100%', height: 40, backgroundColor: '#FFF', borderRadius: 20, marginTop: 10}}>  
                    <Picker style={{width: '100%', height: 40}}
                        selectedValue={this.state.role}
                        onValueChange={(role, itemIndex) =>                              
                            {this.teste(role)}                                                                                                                                                                                                                                                                                                          
                           }>                 
                            {this.state.roles.map( (v)=>{                                                                               
                                return <Picker.Item key={v.roleIdPK} label={v.descricao} value={v.roleIdPK} />                                
                            })}
                        </Picker>                                                              
                        </View>
                    }
                    <AuthInput icon='at' placeholder='E-mail' value={this.state.email} style={styles.input}
                    onChangeText={email => this.setState({ email: email })} />
                    <AuthInput icon='lock' placeholder='Senha' value={this.state.password} style={styles.input}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password: password })} />
                    {this.state.stageNew && 
                        <AuthInput icon='asterisk' placeholder='Confrimação de Senha' value={this.state.confirmPassword} style={styles.input}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({ confirmPassword: confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>                
                <TouchableOpacity style={{ padding: 10 }} 
                    onPress={() => this.setState({ stageNew: !this.state.stageNew})}>
                       <Text style={styles.buttonText}>
                           {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                       </Text>     
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input:{
        marginTop: 10,
        backgroundColor: '#FFF',

    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})