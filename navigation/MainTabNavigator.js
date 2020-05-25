import React from 'react';
import {AsyncStorage, Platform, SafeAreaView, StatusBar} from 'react-native';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import MaIcon from "react-native-vector-icons/MaterialIcons";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FaIcon from "react-native-vector-icons/FontAwesome";

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/profil/ProfileScreen';
import MissionCurrent from '../screens/dash/MissionCurrent';
import ExercicesScreen from '../screens/ExercicesScreen';
import Map from '../components/Map';
import MissionDetailsScreen from "../screens/details/MissionDetailsScreen";
import MissionClosed from "../screens/dash/MissionClosed";
import {Layout, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {ArrowIosBackIcon, HeartIcon} from "../screens/dash/extra/icons";
import {useSafeArea} from "react-native-safe-area-context";
import {Icon} from "react-native-elements";
import Help from "../screens/Help";


const DashboardStack = createStackNavigator({
    Dash: MissionCurrent,
    Details: MissionDetailsScreen,
}, {
    headerMode: "none",
    navigationOptions: {
        header: null,
    },
});

DashboardStack.navigationOptions = {
    tabBarLabel: 'Mission En Cour',
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
    tabBarLabel: 'Notification',
    tabBarIcon: ({tintColor}) => (
        <Icon
            color={tintColor}
            type='material'
            name={'notifications-active'}
            size={30}
        />
    ),
};

const ClosedMissionStack = createStackNavigator({
    Closed: MissionClosed,
    Details: MissionDetailsScreen,
}, {
    headerMode: "none",
    navigationOptions: {
        header: null,
    },
});

ClosedMissionStack.navigationOptions = {
    tabBarLabel: 'Mission Terminée',
    tabBarIcon: ({tintColor}) => (
        <Icon
            color={tintColor}
            type='material'
            name={'done-all'}
            size={30}
        />
    ),
};


const primaryTab = createMaterialTopTabNavigator({
    DashboardStack,
    ClosedMissionStack,
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
        showLabel: true,
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

const renderBackAction = (navigation) => (
    <TopNavigationAction
        icon={ArrowIosBackIcon}
        onPress={() => {
            navigation.navigate('Profil')
        }}
    />
);

const renderMapAction = (navigation) => (
    <TopNavigationAction
        icon={HeartIcon}
        onPress={() => {
            AsyncStorage.removeItem("token").then(()=>{navigation.popToTop();
                navigation.goBack(null);})
        }}
    />
);

export default createStackNavigator ({
    NestedHeader: {
        screen: primaryTab,
        navigationOptions: ({navigation}) => ({
            header:
            <SafeAreaView style={{paddingTop:30}}>
                <TopNavigation
                alignment='center'
                title='Willally'
                leftControl={renderBackAction(navigation)}
                rightControls={renderMapAction(navigation)}
            />
            </SafeAreaView>
        }),
    },
});
