import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import AddTreatment from './screens/AddTreatment'
import ViewTreatment from './screens/ViewTreatment'
import ClientList from './screens/ClientList'
import ViewClient from './screens/ViewClient'
import AddClient from './screens/AddClient'
import ServiceList from './screens/ServiceList'
import AddService from './screens/AddService'
import PermissionList from './screens/PermissionList'
import AddPermission from './screens/AddPermission'
import EditTask from './screens/EditTask'
import AddTask from './screens/AddTask'
import EditEmployee from './screens/EditEmployee'
import EmployeeList from './screens/EmployeeList'

import AuthOrApp from './screens/AuthOrApp'
import Menu from './screens/Menu'
import commonStyles from './commonStyles'

const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            color: '#080',
            fontWeight: 'bold'
        }
    }
}

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <TaskList title='Hoje' daysAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <TaskList title='Amanhã' daysAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <TaskList title='Semana' daysAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <TaskList title='Mês' daysAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês'
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
    AuthOrApp: {
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    },
    AddTreatment: {
        name: 'AddTreatment',
        screen: AddTreatment
    },
    ViewTreatment: {
        name: 'ViewTreatment',
        screen: ViewTreatment
    },
    ClientList: {
        name: 'ClientList',
        screen: ClientList
    },
    ViewClient: {
        name: 'ViewClient',
        screen: ViewClient
    },
    AddClient: {
        name: 'AddClient',
        screen: AddClient
    },
    AddTask: {
        name: 'AddTask',
        screen: AddTask
    },
    ServiceList: {
        name: 'ServiceList',
        screen: ServiceList
    },
    AddService: {
        name: 'AddService',
        screen: AddService
    },
    PermissionList: {
        name: 'PermissionList',
        screen: PermissionList
    },
    AddPermission: {
        name: 'AddPermission',
        screen: AddPermission
    },
    EditTask: {
        name: 'EditTask',
        screen: EditTask
    },
    EmployeeList: {
        name: 'EmployeeList',
        screen: EmployeeList
    },
    EditEmployee: {
        name: 'EditEmployee',
        screen: EditEmployee
    },
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
})
export default createAppContainer(mainNavigator)