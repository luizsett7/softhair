import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {

    //const date = props.doneAt ? props.doneAt : props.estimateAt
    const date = props.estimateAt
    const time = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')
    const formattedTime = moment(time).locale('pt-br')
        .format('h:mm a')

    const getRightContent = () => {
        return (
          <TouchableOpacity style={styles.right}
          onPress={() => props.onDelete && props.onDelete(props.userIdPK)}>
              <Icon name="trash" size={30} color='#FFF' />
          </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
          <View style={styles.left}>
              <Icon name="trash" size={20} color='#FFF' style={styles.excludeIcon} />
              <Text style={styles.excludeText}>Excluir</Text>
          </View>
        )
    }

    return (
      <Swipeable renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.userIdPK)}>
          <View style={styles.container}>              
              <View>
                  <TouchableOpacity>
                  <TouchableWithoutFeedback                                   
                onPress={() => props.onUpdateTask(props)}>
                        <Text style={styles.desc}>{props.name} - {props.ativo === 1 ? "Ativo" : "Inativo"}</Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.date}>E-mail: {props.email}</Text>                                     
                    <Text style={styles.date}>Função: {props.descricao}</Text>                                     
                  </TouchableOpacity>
              </View>
          </View>
      </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
        fontWeight: 'bold'
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    excludeIcon: {
         marginLeft: 10
    }
})
