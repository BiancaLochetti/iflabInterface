import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Image } from 'react-native'

import { Home } from './home/index'
import { Calendar } from './calendar/index'
import { User } from './user/index'

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
            />
            <Tab.Screen
                name="calendar"
                component={Calendar}
            />
            <Tab.Screen
                name="user"
                component={User}
            />
        </Tab.Navigator>
    )
}