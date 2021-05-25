import { createAppContainer, createSwitchNavigator } from 'react-navigation'

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

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: TaskList
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
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
})
export default createAppContainer(mainNavigator)