import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from './Login';

import MainTabNavigator from './MainTabNavigator';
import SceanceScreen from "../screens/SceanceScreen";
import MessageScreen from "../screens/MessageScreen";
import ExercicesScreen from "../screens/ExercicesScreen";
import ForgotPassword from "../screens/ForgotPassword";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from 'react-native-vector-icons/Feather';
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createStackNavigator({
    Main: {
        screen: MainTabNavigator,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => (
                <Icon name={'user'} size={40} onPress={() => {
                    navigation.navigate('Profil')
                }}/>
            ),
            headerLeftContainerStyle: {
                paddingLeft: 10,
            },
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0
            },
        })
    },
    Profil: ProfileScreen
}, {
    navigationOptions: {
        header: null
    },
});

const App = createStackNavigator({
    Login: Login,
    MDP: ForgotPassword,
    Register: RegisterScreen,
    Dash: Stack,
}, {
    navigationOptions: {
        header: null,
    },
})

export default createAppContainer(App);