import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import MaIcon from "react-native-vector-icons/MaterialIcons";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FaIcon from "react-native-vector-icons/FontAwesome";

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/profil/ProfileScreen';
import DashboardScreen from '../screens/dash/DashboardScreen';
import ExercicesScreen from '../screens/ExercicesScreen';
import Map from '../components/Map';
import MissionDetailsScreen from "../screens/details/MissionDetailsScreen";


const DashboardStack = createStackNavigator({
    Dash: DashboardScreen,
    Details: MissionDetailsScreen,
    Map: Map
}, {
    headerMode: "none",
    navigationOptions: {
        header: null,
    },
});

DashboardStack.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({tintColor}) => (
        <McIcon
            color={tintColor}
            name={'clipboard-text-outline'}
            size={30}
        />
    ),
};

const ExercicesStack = createStackNavigator({
    Exercices: ExercicesScreen,
    Details: MissionDetailsScreen,
}, {
    headerMode: "none",
    navigationOptions: {
        header: null,
    },
});

ExercicesStack.navigationOptions = {
    tabBarLabel: 'Exercises',
    tabBarIcon: ({tintColor}) => (
        <McIcon
            color={tintColor}
            name={'clipboard-text-outline'}
            size={30}
        />
    ),
};

export default createMaterialTopTabNavigator({
    DashboardStack,
    ExercicesStack,
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    initialRouteName: 'DashboardStack',
    tabBarOptions: {
        style: {
            backgroundColor: 'white',
            borderTopColor: 'black',
        },
        showIcon: true,
        showLabel: false,
        activeTintColor: '#58A4B0',
        indicatorStyle: {
            backgroundColor: '#58A4B0',
        },
    },
}, {
    headerMode: "none",
    navigationOptions: {
        header: null,
    },
});
