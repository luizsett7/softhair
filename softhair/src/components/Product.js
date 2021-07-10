import React from 'react'
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

export default props => {
    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.productIdPK)}>
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
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.productIdPK)}>
            <View style={styles.container}>
                <View style={{flex: 7}}>
                    <TouchableWithoutFeedback
                        onPress={() => props.onUpdateTask(props)}>
                        <Text style={styles.desc}>{props.descricao}</Text>
                    </TouchableWithoutFeedback>
                    <Text style={styles.date}>R$ {props.valor}</Text>
                </View>
                <View style={{flex: 3}}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: props.urlImage,
                        }}
                    />
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
    },
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
        fontSize: 15
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
